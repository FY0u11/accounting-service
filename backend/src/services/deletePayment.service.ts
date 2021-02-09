import Payments from '../models/Payments'

export default async (time: string) => {
  try {
    const candidate = await Payments.deleteOne({ time })
    return {}
  } catch (e) {
    return { error: e.message }
  }
}
