import { NextFunction, Request, Response } from 'express'

export default async (err: { message: string; status?: number }, req: Request, res: Response, next: NextFunction) => {
  if (!err) next()
  if (err.status || /(validation|cast)/i.test(err.message)) {
    res.status(err.status ?? 400).json({ message: err.message })
  } else {
    res.status(500).json({ serverError: err.message })
  }
}
