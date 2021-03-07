import { User, UserDoc } from '../models/User'
import { sign } from 'jsonwebtoken'
import { config } from 'dotenv'
import { compare } from 'bcrypt'
config()

export const authService = async (user: UserDoc) => {
  const candidate = await User.findOne({ username: user.username })

  if (!candidate || !(await compare(user.password, candidate.password)))
    throw {
      status: 400,
      success: false,
      message: 'Invalid login or password'
    }
  const tokenSecret = process.env.SECRET || ''
  return {
    data: sign({ id: candidate._id, username: candidate.username, role: candidate.role }, tokenSecret, {
      expiresIn: '8h'
    }),
    success: true
  }
}
