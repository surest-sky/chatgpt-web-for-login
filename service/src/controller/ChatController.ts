import {RequestProps} from '../types'
import {ChatMessage, chatReplyProcess} from '../chatgpt'
import {ChatProcessPipe} from '../services/ChatService'
import {JwtUser} from "../interfaces/auth";
import * as console from "console";
import {knex} from "../services/AppService";
import {gptUser} from "../models/tableModel";
import UsersModel from "../models/usersModel";
import Response from "../utils/response";

const chatProcess = async (req, res) => {
    res.setHeader('Content-type', 'application/octet-stream')
    try {
        const {prompt, options = {}, systemMessage} = req.body as RequestProps
        let firstChunk = true
        await chatReplyProcess({
            message: prompt,
            lastContext: options,
            process: (chat: ChatMessage) => {
                res.write(firstChunk ? JSON.stringify(chat) : `\n${JSON.stringify(chat)}`)
                ChatProcessPipe(prompt, chat, req['user'] as JwtUser, options.parentMessageId)
                firstChunk = false
            },
            systemMessage,
        })
    } catch (error) {
        res.write(JSON.stringify(error))
    } finally {
        res.end()
    }
}

export default {chatProcess}