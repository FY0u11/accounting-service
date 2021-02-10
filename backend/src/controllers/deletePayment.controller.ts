import { Request, Response } from 'express'
import deletePaymentService from '../services/deletePayment.service'

export default async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await deletePaymentService(id)
  res.status(200).json({})
}
