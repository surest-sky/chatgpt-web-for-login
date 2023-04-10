import {getRedis} from "./AppService";
import {sendLoginVerifyCode} from "./emails/emailProvider";
import {JwtUser, LoginBody, LoginServiceBody, RegisterBody, ServiceBody} from "../interfaces/auth";
import {knex} from './AppService'
import UsersModel from "../models/usersModel";
import dayjs from 'dayjs'
import * as console from "console";
import {gptUser} from "../models/tableModel";
import {generateRandomIntString} from "../utils";
import md5 from 'md5'
import process from "process";

const salt = process.env.SALT;
const jwtSecret = process.env.JWT_SECRET;
const getEmailKey = (scene, email) => {
    return `email:${scene}:${email}`;
}

export const sendEmailVerifyCode = async (scene, email) => {
    const redis = await getRedis();
    // 随机生成一个4位数的验证码
    const code = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    // 将验证码存入redis，设置过期时间为5分钟
    const key = getEmailKey(scene, email);
    await redis.set(key, code, {
        EX: 60 * 5 // 5分钟
    });

    // 发送邮件
    await sendLoginVerifyCode(email, parseInt(code));
}


export const verifyEmailCode = async (scene, email, code): Promise<boolean> => {
    const redis = await getRedis();
    const key = getEmailKey(scene, email);
    const codeInRedis = await redis.get(key);
    if (parseInt(codeInRedis) === parseInt(code)) {
        return true;
    }
    return false;
}

export const authRegister = async (data: RegisterBody): Promise<ServiceBody> => {
    const {account, email} = data;
    const serviceBody: ServiceBody = {
        message: '注册成功',
        isSuccessful: true
    }

    const isUser = await knex(gptUser).where('email', email).count('id as count').catch((error) => {
        throw Error(error)
    });
    if (isUser[0].count > 0) {
        serviceBody.isSuccessful = false
        serviceBody.message = "该邮箱已被注册";
        return serviceBody;
    }

    const userQuery = knex(gptUser);
    userQuery.where('email', email);
    const user: UsersModel = {
        account: data.account,
        email: data.email,
        password: createPassword(data.password),
        ip: data.ip,
        user_id: generateRandomIntString(8),
        login_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        balance: 10000,
    }

    try {
        const result: any = await knex(gptUser).insert(user);
        console.log(result)
    } catch (e) {
        serviceBody.isSuccessful = false
        serviceBody.message = e.message;
        return serviceBody;
    }

    return serviceBody;
}


export const auLogin = async (data: LoginBody): Promise<LoginServiceBody> => {
    const {account, password} = data;
    const serviceBody: LoginServiceBody = {
        message: '登录成功',
        isSuccessful: true
    }

    // 检查是否是邮箱
    let query = knex(gptUser);
    const isEmail = account.indexOf('@') > -1;
    if (isEmail) {
        console.log('email', account);
        query = query.where('email', account);
    } else {
        query = query.where('account', account);
    }


    const user = await query.first().catch((error) => {
        throw Error(error)
    }) as UsersModel;

    if (!user) {
        serviceBody.isSuccessful = false
        serviceBody.message = "用户不存在或者账号密码错误2";
        return serviceBody;
    }

    if (!validatePassword(user.password, password)) {
        serviceBody.isSuccessful = false
        serviceBody.message = "用户不存在或者账号密码错误";
        return serviceBody;
    }
    serviceBody.user = {
        token: createJwtToken({
            account: user.account,
            email: user.email,
            userId: user.user_id,
            balance: user.balance,
        } as JwtUser),
        account: user.account,
        email: user.email,
        userId: user.user_id,
        balance: user.balance,
    }
    return serviceBody;
}

const validatePassword = (nPassword, cPassword): boolean => {
    return nPassword === md5(cPassword + salt)
}

const createPassword = (password): string => {
    return md5(password + salt)
}

const createJwtToken = (user: JwtUser): string => {
    var jwt = require('jsonwebtoken');
    var token: string = jwt.sign({
        data: JSON.stringify(user)
    }, jwtSecret, {
        expiresIn: 60 * 60 * 24 * 7,// 7天过期
        algorithm: 'HS256',
    }) as string;

    return token;
}

export const verifyJwtToken = (token: string): JwtUser => {
    var jwt = require('jsonwebtoken');
    var decoded:any = jwt.verify(token, jwtSecret);
    if(!decoded) {
        return null;
    }
    return JSON.parse(decoded['data']) as JwtUser;
}