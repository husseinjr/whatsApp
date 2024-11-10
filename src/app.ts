import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import { Client, LocalAuth } from 'whatsapp-web.js'

const port = process.env.PORT || 3001
const mongoURI =
  process.env.MONGOO_DB_URL || 'mongodb://localhost:27017/whatsApp/'

const app = express()

app.use(express.json())


const client = new Client({
  puppeteer: {
    headless: false,
  },
  authStrategy: new LocalAuth({
    clientId: "whats_app_user_1",
    dataPath: './Sessions'
  })
})

client.on('qr', (qr) => {
  console.log('QR RECEIVED', qr)
})

client.on('ready', () => {
  console.log('Client is ready!')
})

client.initialize()

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB')

    app.listen(port, () => {
      console.log(`http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err)
  })
