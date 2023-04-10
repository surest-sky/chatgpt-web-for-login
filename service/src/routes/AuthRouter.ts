import express from "express";
import {auth} from "../middleware/auth";
import {JwtUser} from "../interfaces/auth";
import {chatConfig, currentModel} from "../chatgpt";
import {limiter} from "../middleware/limiter";
import ChatController from '../controller/ChatController'
import AuthController from "../controller/AuthController";
import {knex} from "../services/AppService";
import {gptUser} from "../models/tableModel";
import UsersModel from "../models/usersModel";

const router = express.Router()
router.post('/session', auth, async (req, res) => {
    let user = req['user']
    const userModel = (await knex(gptUser).where('user_id', user.userId).first()) as UsersModel
    if (user) {
        res.send({
            status: 'Success', message: '', data: {
                auth: true, model: currentModel(), user: {
                    userId: userModel.user_id,
                    balance: userModel.balance,
                    email: userModel.email,
                    account: userModel.account,
                }
            }
        })
        return
    }
    res.send({status: 'Success', message: '', data: {auth: false, model: currentModel()}})
})
router.post('/config', auth, async (req, res) => {
    try {
        const response = await chatConfig()
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

router.post('/chat-process', [auth, limiter], ChatController.chatProcess)
router.get('/start', AuthController.start);


export default router