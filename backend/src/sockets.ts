import { Server } from 'socket.io'
import { verify } from 'jsonwebtoken'
import http from 'http'

export const io = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST']
    }
  })

  io.on('connection', socket => {
    socket.on('action', (message: { token?: string; action?: string }) => {
      if (!message?.token) return
      try {
        const payload = verify(message.token, process.env.SECRET ?? '') as { role: 'user' | 'admin' }
        if (payload['role'] !== 'admin') return
        io.emit('message', message.action)
      } catch {}
    })
  })
}
