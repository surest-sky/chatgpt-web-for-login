import {EmailVerifyCodeBody, JwtUser, LoginBody, LoginServiceBody, RegisterBody, ServiceBody} from "../interfaces/auth";
import Validator from "validatorjs";
import {auLogin, authRegister, sendEmailVerifyCode, verifyEmailCode} from "../services/AuthService";
import Response from "../utils/response";
import {firstFail, validateOptions} from "../utils/validate";
import {data} from "autoprefixer";
import * as console from "console";
import {knex} from "../services/AppService";
import {gptConversation, gptUser} from "../models/tableModel";
import {ConversationModel} from "../models/ConversationModel";
import {UserInfo} from "../../../src/store/modules/user/helper";

const register = async (req, res) => {
    const params = req.body as RegisterBody
    const validation = new Validator(params, {
        account: 'required|min:3',
        email: 'required|email',
        code: 'required',
    });

    if (!await verifyEmailCode("register", params.email, params.code)) {
        res.send(Response({}, "验证码错误", 403));
        return
    }

    const isFailed = validation.fails();
    if (isFailed) {
        res.send(Response({}, firstFail(validation.errors.all()), 403));
        return
    }


    try {
        const data: ServiceBody = await authRegister(Object.assign({}, params, {ip: req.ip}))
        if (data.isSuccessful) {
            res.send(Response({}, "注册成功"));
            return
        }
        res.send(Response({}, data.message, 403));
    } catch (e) {
        res.send(Response({}, e.message, 403));
        return
    }
}

const login = async (req, res) => {
    const params = req.body as LoginBody
    const validation = new Validator(params, {
        account: 'required|min:3',
        password: 'required',
    });

    const isFailed = validation.fails();
    if (isFailed) {
        res.send(Response({}, firstFail(validation.errors.all()), 403));
        return
    }

    try {
        const data: LoginServiceBody = await auLogin(params)
        if (data.isSuccessful) {
            res.send(Response(data.user, "登录成功"));
            return
        }
        res.send(Response({}, data.message, 403));
    } catch (e) {
        res.send(Response({}, e.message, 403));
        return
    }
}


const sendCode = async (req, res) => {
    const params = req.body as EmailVerifyCodeBody
    const validation = new Validator(params, {
        email: 'required|email',
        scene: 'required',
    });

    const isFailed = validation.fails();
    if (isFailed) {
        const message = firstFail(validation.errors.all() as validateOptions)
        res.send(Response({}, message, 403));
        return
    }

    try {
        await sendEmailVerifyCode(params.scene, params.email)
    } catch (e) {
        res.send(Response({}, e.message, 403));
        return
    }

    res.send(Response({}, "发送成功"));
    return;
}

const start = async (req, res) => {
    const query = knex(gptConversation)
        .select(['reply', 'message'])
        .where('app_conversation_id', 10865288372542298000)
    const conversations = await query as ConversationModel[]
    let len: number = 0
    conversations.forEach((conversation) => {
        const {reply, message} = conversation
        len += reply.length
        len += message.length
    })
    const user_id = "44144340"
    const _user = (await knex(gptUser).where('user_id', user_id).first()) as JwtUser
    let surplus = _user.balance - len
    if (surplus <= 0) {
        surplus = 0
    }
    await knex(gptUser).where('user_id', user_id).update({balance: surplus})

    res.send(Response({}, "发送成功"));
}

export default {register, sendCode, login, start}