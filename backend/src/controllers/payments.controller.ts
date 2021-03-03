import { NextFunction, Request, Response } from 'express'
import { paymentsService } from '../services/payments.service'
import { Schema } from 'mongoose'

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if ('all' in req.query && req.user.role !== 'admin') return next({ status: 403, message: 'Forbidden' })
    res.json(await paymentsService.getAll(req.query, req.user.id))
  } catch (e) {
    await next(e)
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  const { value, ptype } = req.body
  const id = (req.params.id as any) as Schema.Types.ObjectId
  try {
    res.json(await paymentsService.update({ value, ptype }, id))
  } catch (e) {
    await next(e)
  }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  try {
    await paymentsService.deleteOne(id)
    res.status(204).json()
  } catch (e) {
    await next(e)
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  const payment = req.body
  try {
    res.json(await paymentsService.create({ ...payment, user: req.user.id }))
  } catch (e) {
    await next(e)
  }
}

export const paymentsController = {
  getAll,
  update,
  deleteOne,
  create
}
