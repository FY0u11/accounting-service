import { Schema, model } from 'mongoose'
import mongoose from 'mongoose'

export interface UserDoc extends mongoose.Document {
  _id: Schema.Types.ObjectId
  username: string
  password: string
  role: 'user' | 'admin'
  settings: string
}

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
  settings: { type: String, default: '{}' }
})

export const User = model<UserDoc>('user', schema)
