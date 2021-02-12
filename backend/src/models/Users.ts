import { Schema, model } from 'mongoose'

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

export default model('User', schema)
