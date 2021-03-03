import { Schema, model } from 'mongoose'
import mongoose from 'mongoose'
import { Ptype } from './Ptype'

export interface PaymentDoc extends mongoose.Document {
  _id: Schema.Types.ObjectId
  ptype: Schema.Types.ObjectId
  value: number
  time: Date
  user: Schema.Types.ObjectId
}

const schema = new Schema<PaymentDoc>({
  ptype: {
    type: Schema.Types.ObjectId,
    ref: 'ptype',
    required: true,
    validate: async (ptypeId: string) => {
      const pt = await Ptype.findById(ptypeId)
      if (!pt) throw { message: 'ptype is not found' }
    }
  },
  value: { type: Number, required: true, min: -100000000, max: 100000000 },
  time: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true }
})

schema.pre('save', { document: true }, async function () {
  const ptype = await Ptype.findById(this.ptype)
  if (!ptype) return
  ptype.payments.push(this._id)
  ptype.save()
})

schema.pre('deleteOne', { document: true }, async function () {
  const ptype = await Ptype.findById(this.ptype)
  if (!ptype) return
  ptype.payments = ptype.payments.filter(paymentId => JSON.stringify(paymentId) !== JSON.stringify(this._id))
  ptype.save()
})

export const Payment = model('payment', schema)
