import Users from '../models/Users'

export default async (id: string) => {
  try {
    const user = await Users.findById(id)
    return user
  } catch (e) {
    return { status: 500, error: e.message }
  }
}
