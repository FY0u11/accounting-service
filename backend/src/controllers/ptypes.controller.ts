import { NextFunction, Request, Response } from 'express'
import { ptypesService } from '../services/ptypes.service'
import { Schema } from 'mongoose'

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ data: await ptypesService.getAll(req.query) })
  } catch (e) {
    await next(e)
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  const paymentType = req.body
  try {
    res.status(201).json({ data: await ptypesService.create(paymentType), message: 'Ptype created' })
  } catch (e) {
    await next(e)
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  const { name, isActive, sort, icon } = req.body
  const id = (req.params.id as any) as Schema.Types.ObjectId
  try {
    res.json({ data: await ptypesService.update({ name, isActive, sort, icon }, id), message: 'Ptype updated' })
  } catch (e) {
    await next(e)
  }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    await ptypesService.deleteOne(id)
    res.status(200).json({ message: 'Ptype deleted' })
  } catch (e) {
    await next(e)
  }
}

export const ptypesController = {
  getAll,
  create,
  deleteOne,
  update
}
