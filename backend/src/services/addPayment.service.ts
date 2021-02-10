import Payments from '../models/Payments'

export default async (payment: types.Payment) => {
  try {
    const result = await new Payments(payment).save()
    return result
  } catch (e) {
    return { error: e.message }
  }
}
