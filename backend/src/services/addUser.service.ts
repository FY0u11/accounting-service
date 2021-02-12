import Users from '../models/Users'

export default async (user: Types.User) => {
  try {
    const result = await new Users(user).save()
    return result
  } catch (e) {
    return { error: e.message }
  }
}
