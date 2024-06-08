import express from 'express'
import dotenv from 'dotenv'
const app = express()

import authRoutes from './routes/auth.routes.js'
import connectDB from './db/connectDB.js'

dotenv.config()
const port = process.env.PORT || 4000

app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    connectDB()
    console.log(`Server on running on port ${port}`)
})