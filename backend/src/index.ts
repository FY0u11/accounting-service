import https from 'https'
import fs from 'fs'
import Express from 'express'
import MongoDB from 'mongoose'
import { get } from 'config'
import router from './routers'
import { json } from 'body-parser'
import cors from 'cors'
import auth from './auth'
import { config } from 'dotenv'
config()
const app = Express()

const PORT = get('port')

app.use(cors())
app.use(json())
app.use(auth)
app.use(router)

const start = async () => {
  try {
    await MongoDB.connect(process.env.CONNECT, get('dbOptions'))
    console.log('Database has been successfully connected!')

    if (process.env.PROTOCOL === 'HTTPS') {
      const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH, 'utf8')
      const certificate = fs.readFileSync(process.env.SSL_CRT_PATH, 'utf8')
      const credentials = { key: privateKey, cert: certificate }
      const httpsServer = https.createServer(credentials, app)
      await httpsServer.listen(PORT)
    } else await app.listen(PORT)
    console.log(`Server is running on port ${PORT}...`)
  } catch (e) {
    console.log(e)
  }
}

start()
