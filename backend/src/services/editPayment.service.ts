import Payments from '../models/Payments'

export default async (id: string, payment: Types.Payment) => {
  try {
    const editedPayment = await Payments.findById(id)
    await editedPayment.updateOne({ ...payment })
    return editedPayment
  } catch (e) {
    return { error: e.message }
  }
}
