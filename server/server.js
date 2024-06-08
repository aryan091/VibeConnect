import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
const app = express()

import authRoutes from './routes/auth.routes.js'
import connectDB from './db/connectDB.js'

dotenv.config()
const port = process.env.PORT || 4000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/api/auth', authRoutes)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
    connectDB()
    console.log(`Server on running on port ${port}`)
})