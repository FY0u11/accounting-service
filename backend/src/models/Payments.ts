import { Schema, model } from 'mongoose'

const schema = new Schema({
  type: {
    type: 'string',
    required: true,
    enum: ['cash', 'bank', 'card', 'kaspi']
  },
  value: { type: 'number', required: true },
  time: { type: Date, default: Date.now }
})

export default model('Payments', schema)
