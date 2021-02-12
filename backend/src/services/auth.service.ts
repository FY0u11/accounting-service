import Users from '../models/Users'
import { sign } from 'jsonwebtoken'
import { get } from 'config'

export default async (user: Types.User) => {
  try {
    const candidate = ((await Users.findOne({
      username: user.username
    })) as any) as Types.User

    if (!candidate) return null

    if (candidate.password !== user.password) return null

    const token = sign(
      { id: candidate._id, username: candidate.username },
      get('tokenSecret'),
      {
        expiresIn: '1h'
      }
    )

    return token
  } catch (e) {
    return { error: e.message }
  }
}
