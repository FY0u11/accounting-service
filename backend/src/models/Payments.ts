import { Schema, model } from 'mongoose'

const schema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['cash', 'bank', 'card', 'kaspi']
  },
  value: { type: 'number', required: true },
  time: { type: Date, default: Date.now },
  userId: { type: String, required: true }
})

export default model('Payments', schema)
