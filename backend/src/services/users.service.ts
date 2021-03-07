import { User, UserDoc } from '../models/User'
import { Schema } from 'mongoose'
import { hash } from 'bcrypt'

const create = async (user: UserDoc) => {
  const newUser = await new User({ ...user, password: await hash(user.password, 10) }).save()
  return User.findById(newUser._id)
}

const deleteOne = async (_id: string) => {
  const deleteCandidate = await User.findById({ _id })
  if (!deleteCandidate) throw { status: 404, message: 'User not found' }
  await deleteCandidate.deleteOne()
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
  candidate.username = update.username ?? candidate.username
  candidate.role = update.role ?? candidate.role
  candidate.password = (await hash(update.password, 10)) ?? candidate.password
  candidate.settings = update.settings ?? candidate.settings
  await candidate.save()
  return candidate
}

export const usersService = {
  create,
  deleteOne,
  getAll,
  getSelf,
  update
}
