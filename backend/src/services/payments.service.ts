import { Payment, PaymentDoc } from '../models/Payment'
import { Schema } from 'mongoose'

const create = async (payment: PaymentDoc) => {
  const newPayment = await new Payment(payment).save()
  return Payment.findById(newPayment._id, { user: 0 }).populate({
    path: 'ptype',
    match: { isActive: true },
    select: 'name icon'
  })
}

const deleteOne = async (_id: string) => {
  const deleteCandidate = await Payment.findById({ _id })
  if (!deleteCandidate) throw { status: 404, message: 'Payment not found' }
  await deleteCandidate.deleteOne()
}

const getAll = async (query: { all?: string }, user: Schema.Types.ObjectId) => {
  if ('all' in query) {
    const payments = await Payment.find({}, { __v: 0 })
      .populate({ path: 'ptype', match: { isActive: true }, select: 'name icon' })
      .populate('user', '-_id username')
    return payments.filter(payment => payment.ptype)
  }

  const payments = await Payment.find({ user }, { __v: 0, user: 0 }).populate({
    path: 'ptype',
    match: { isActive: true },
    select: 'name icon'
  })
  return payments.filter(payment => payment.ptype)
}

const update = async (update: { value?: number; ptype?: Schema.Types.ObjectId }, _id: Schema.Types.ObjectId) => {
  const candidate = await Payment.findById(_id)
  if (!candidate) throw { status: 404, message: 'Payment not found' }
  candidate.value = update.value ?? candidate.value
  candidate.ptype = update.ptype ?? candidate.ptype
  await candidate.save()
  return Payment.findById(candidate._id, { user: 0 }).populate({
    path: 'ptype',
    match: { isActive: true },
    select: 'name icon'
  })
}

export const paymentsService = {
  create,
  deleteOne,
  getAll,
  update
}
