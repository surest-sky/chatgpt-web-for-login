import express from "express";
import AuthController from "../controller/AuthController";

const router = express.Router()
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/send-code', AuthController.sendCode);

export default router