import { User, UserDoc } from '../models/User'
import { Schema } from 'mongoose'
import { hash } from 'bcrypt'

const create = async (user: UserDoc) => {
  const candidate = await User.findOne({ username: user.username })
  if (candidate) throw { status: 400, message: 'Username already exists' }
  const newUser = await new User({ ...user, password: await hash(user.password, 10) }).save()
  return User.findById(newUser._id, { password: 0 })
}

const deleteOne = async (_id: string) => {
  const deleteCandidate = await User.findById({ _id })
  if (!deleteCandidate) throw { status: 404, message: 'User not found' }
  return deleteCandidate.deleteOne()
}

const getAll = async () => {
  return User.find({}, { password: 0 })
}

const getSelf = async (_id: string) => {
  return User.findById(_id, { password: 0 })
}

const update = async (
  update: { username?: string; role?: 'user' | 'admin'; password: string; settings: string },
  _id: Schema.Types.ObjectId
) => {
  const candidate = await User.findById(_id)
  if (!candidate) throw { status: 404, message: 'User not found' }
  const anotherUser = await User.findOne({ username: update.username })
  if (anotherUser && JSON.stringify(anotherUser._id) !== JSON.stringify(_id)) throw { status: 400, message: 'Username already exists' }
  candidate.username = update.username ?? candidate.username
  candidate.role = update.role ?? candidate.role
  candidate.password = update.password ? await hash(update.password, 10) : candidate.password
  candidate.settings = update.settings ?? candidate.settings
  await candidate.save()
  return User.findById(_id, { password: 0 })
}

export const usersService = {
  create,
  deleteOne,
  getAll,
  getSelf,
  update
}
