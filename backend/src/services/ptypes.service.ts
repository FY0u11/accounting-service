import { Ptype, PtypeDoc } from '../models/Ptype'
import { Schema } from 'mongoose'

const create = (ptype: PtypeDoc) => {
  return new Ptype(ptype).save()
}

const deleteOne = async (_id: string) => {
  const deleteCandidate = await Ptype.findById(_id)
  if (!deleteCandidate) throw { status: 404, message: 'Ptype not found' }
  await deleteCandidate.deleteOne()
}

const getAll = async (query: { all?: string }) => {
  const ptypes = await Ptype.find('all' in query ? {} : { isActive: true })
  return ptypes.sort((p1, p2) => p1.sort - p2.sort)
}

const update = async (
  update: { name?: string; isActive?: boolean; sort: number; icon: string },
  _id: Schema.Types.ObjectId
) => {
  const candidate = await Ptype.findById(_id)
  if (!candidate) throw { status: 404, message: 'Ptype not found' }
  candidate.name = update.name ?? candidate.name
  candidate.isActive = update.isActive ?? candidate.isActive
  candidate.sort = update.sort ?? candidate.sort
  candidate.icon = update.icon ?? candidate.icon
  await candidate.save()
  return candidate
}

export const ptypesService = {
  create,
  deleteOne,
  getAll,
  update
}
