import { NextFunction, Request, Response } from 'express'
import { ptypesService } from '../services/ptypes.service'
import { Schema } from 'mongoose'

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await ptypesService.getAll(req.query))
  } catch (e) {
    await next(e)
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  const paymentType = req.body
  try {
    res.status(201).json(await ptypesService.create(paymentType))
  } catch (e) {
    await next(e)
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  const { name, isActive, sort, icon } = req.body
  const id = (req.params.id as any) as Schema.Types.ObjectId
  try {
    res.json(await ptypesService.update({ name, isActive, sort, icon }, id))
  } catch (e) {
    await next(e)
  }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    await ptypesService.deleteOne(id)
    res.status(204).json()
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
