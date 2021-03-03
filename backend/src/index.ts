import Express from 'express'
import MongoDB from 'mongoose'
import { get } from 'config'
import { json } from 'body-parser'
import cors from 'cors'
import { config } from 'dotenv'
import router from './routers'
import auth from './middlewares/auth'
import errors from './middlewares/errors'
import { io } from './sockets'
import { getServer } from './server'

config()
const app = Express()
app.use(cors(), json(), auth, errors).use('/api/v1', router, errors)
const server = getServer(app)
const PORT = get('port')

const start = async () => {
  try {
    await MongoDB.connect(process.env.CONNECT ?? '', get('dbOptions'))
    console.log('Database has been successfully connected!')
    io(server)
    await server.listen(PORT)
    console.log(`Server is running on port ${PORT}...`)
  } catch (e) {
    console.log(e)
  }
}

start()
