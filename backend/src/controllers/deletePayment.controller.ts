import { Request, Response } from 'express'
import deletePaymentService from '../services/deletePayment.service'

export default async (req: Request, res: Response) => {
  const time = req.params.time
  const result = await deletePaymentService(time)
  res.status(200).json({})
}
