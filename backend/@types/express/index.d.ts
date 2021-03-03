namespace Express {
  interface Request {
    user: {
      id: Schema.Types.ObjectId
      username: string
      role: 'user' | 'admin'
    }
  }
}
