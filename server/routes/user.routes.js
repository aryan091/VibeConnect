import express from 'express'
import {getUserForSidebar} from '../controller/user.controller.js'
import {verifyToken , decodeJwtToken} from "../middlewares/verifyJwtToken.js";

const router = express.Router()

router.get('/' ,verifyToken ,  getUserForSidebar)

export default router