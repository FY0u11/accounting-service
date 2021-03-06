import { NextFunction, Request, Response } from 'express'
import { usersService } from '../services/users.service'
import { Schema } from 'mongoose'

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user.role !== 'admin') return next({ status: 403, message: 'Forbidden' })
    res.json({ data: await usersService.getAll() })
  } catch (e) {
    await next(e)
  }
}

const getSelf = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ data: await usersService.getSelf(req.user.id) })
  } catch (e) {
    await next(e)
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== 'admin' && JSON.stringify(req.params.id) !== JSON.stringify(req.user.id)) return next({ status: 403, message: 'Forbidden' })
  const { username, password, role, settings } = req.body
  const id = (req.params.id as any) as Schema.Types.ObjectId
  try {
    await usersService.update({ username, password, role, settings }, id)
    res.json({ message: 'User updated' })
  } catch (e) {
    await next(e)
  }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== 'admin') return next({ status: 403, message: 'Forbidden' })
  const id = req.params.id
  try {
    await usersService.deleteOne(id)
    res.status(200).json({ message: 'User deleted' })
  } catch (e) {
    await next(e)
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== 'admin') return next({ status: 403, message: 'Forbidden' })
  const user = req.body
  try {
    res.json({ data: await usersService.create(user), message: 'User created' })
  } catch (e) {
    await next(e)
  }
}

export const usersController = {
  getAll,
  update,
  deleteOne,
  create,
  getSelf
}
