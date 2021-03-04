import { model, Schema } from 'mongoose'
import mongoose from 'mongoose'
import { Payment } from './Payment'

export interface PtypeDoc extends mongoose.Document {
  _id: Schema.Types.ObjectId
  name: string
  isActive: boolean
  payments: Array<Schema.Types.ObjectId>
  sort: number
  icon: string
}

const schema = new Schema<PtypeDoc>({
  name: { type: String, required: true, trim: true },
  isActive: { type: Boolean, default: true },
  payments: [{ type: Schema.Types.ObjectId, ref: 'payment' }],
  sort: { type: Number },
  icon: { type: String, default: 'MonetizationOnRounded' }
})

schema.pre('deleteOne', { document: true }, async function () {
  await Payment.deleteMany({ ptype: this._id })
})

schema.pre('save', { document: true }, async function (next) {
  const ptypes = await Ptype.find()
  this.sort ??= ptypes.length
  next()
})

export const Ptype = model('ptype', schema)
