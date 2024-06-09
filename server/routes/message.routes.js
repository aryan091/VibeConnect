import express from 'express'
import {sendMessage , getMessages} from '../controller/message.controller.js'
import {verifyToken , decodeJwtToken} from "../middlewares/verifyJwtToken.js";


const router = express.Router()

router.post('/send/:id', verifyToken ,sendMessage)
router.get('/:id', verifyToken ,getMessages)

export default router