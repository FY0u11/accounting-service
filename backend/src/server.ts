import http from 'http'
import https from 'https'
import fs from 'fs'
import { Express } from 'express'

export const getServer = (app: Express) => {
  let server: http.Server | https.Server
  if (process.env.PROTOCOL === 'HTTPS') {
    const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH ?? '', 'utf8')
    const certificate = fs.readFileSync(process.env.SSL_CRT_PATH ?? '', 'utf8')
    const credentials = { key: privateKey, cert: certificate }
    server = https.createServer(credentials, app)
  } else {
    server = http.createServer(app)
  }
  return server
}
