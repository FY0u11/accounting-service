import Payments from '../models/Payments'

export default async (id: string) => {
  try {
    const candidate = await Payments.deleteOne({ _id: id })
    return {}
  } catch (e) {
    return { error: e.message }
  }
}
