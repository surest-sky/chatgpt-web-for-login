import crypto from 'crypto'
import {gptApiKeysTable} from "../models/tableModel";
import {knex} from "../services/AppService";
import Apikey from "../models/apikeyModel";
import {Response} from "../types";

const getApiKey = async (req, res) => {
    // 根据时间戳生成随机秘钥，控制长度为16个字符串
    const timestamp = Date.now()
    let randomNum = Math.random().toString().slice(2, 18)
    let str = timestamp.toString() + randomNum
    const key = crypto.createHash('sha256').update(str).digest('hex').slice(0, 16).toUpperCase();

    await knex(gptApiKeysTable).insert({
        api_key: key,
        use_count: 999,
        ip: req.ip,
        user_id: 1
    } as Apikey).catch((err) => {
        throw err;
    })

    res.send({
        code: 200,
        message: 'success',
        data: {key}
    } as Response)
}

export default {getApiKey}
