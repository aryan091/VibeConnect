import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import {app , server} from './socket/socket.js'

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import connectDB from './db/connectDB.js'

dotenv.config()
const port = process.env.PORT || 4000

app.use(cors(
    {
        origin : ["http://localhost:5173", "http://localhost:4000" , "*" ],
        credentials : true
    }
))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/users' , userRoutes)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
    connectDB()
    console.log(`Server on running on port ${port}`)
})