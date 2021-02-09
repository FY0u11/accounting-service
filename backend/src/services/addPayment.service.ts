import Payments from '../models/Payments'

export default async (payment: types.Payment) => {
  try {
    await new Payments(payment).save()
    return {}
  } catch (e) {
    return { error: e.message }
  }
}
