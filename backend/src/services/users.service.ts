import { User, UserDoc } from '../models/User'
import { Schema } from 'mongoose'

const create = async (user: UserDoc) => {
  const newUser = await new User(user).save()
  return User.findById(newUser._id)
}

const deleteOne = async (_id: string) => {
  const deleteCandidate = await User.findById({ _id })
  if (!deleteCandidate) throw { status: 404, message: 'User not found' }
  await deleteCandidate.deleteOne()
}

const getAll = async () => {
  return User.find()
}

const getSelf = async (_id: string) => {
  return User.findById(_id)
}

const update = async (
  update: { username?: string; role?: 'user' | 'admin'; password: string; settings: string },
  _id: Schema.Types.ObjectId
) => {
  const candidate = await User.findById(_id)
  if (!candidate) throw { status: 404, message: 'User not found' }
  candidate.username = update.username ?? candidate.username
  candidate.role = update.role ?? candidate.role
  candidate.password = update.password ?? candidate.password
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
