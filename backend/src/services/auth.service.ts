import Users from '../models/Users'
import { sign } from 'jsonwebtoken'
import { get } from 'config'
import { config } from 'dotenv'
config()

export default async (user: Types.User) => {
  try {
    const candidate = ((await Users.findOne({
      username: user.username
    })) as any) as Types.User

    if (!candidate) return null

    if (candidate.password !== user.password) return null

    const token = sign({ id: candidate._id, username: candidate.username }, process.env.SECRET, {
      expiresIn: '8h'
    })

    return token
  } catch (e) {
    return { error: e.message }
  }
}
