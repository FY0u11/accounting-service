import Payments from '../models/Payments'

export default async (filter: string, userId: string) => {
  try {
    let payments
    if (!filter) {
      payments = await Payments.find({ userId })
    } else {
      const [month, day, year] = filter.split('.').map(v => +v)
      payments = await Payments.find({
        time: {
          $gte: new Date(year, month - 1, day),
          $lte: new Date(year, month - 1, day + 1)
        },
        userId
      })
    }
    return payments
  } catch (e) {
    return { status: 500, error: e.message }
  }
}
