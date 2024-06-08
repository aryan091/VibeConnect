import express from 'express'
import {registerUser , loginUser , getUserProfile , logoutUser } from '../controller/auth.controller.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

router.get('/profile', getUserProfile)

export default router