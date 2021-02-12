import { Router } from 'express'
import addPaymentController from '../controllers/addPayment.controller'
import getPaymentsController from '../controllers/getPayments.controller'
import deletePaymentController from '../controllers/deletePayment.controller'
import getUserController from '../controllers/getUser.controller'
import addUserController from '../controllers/addUser.controller'
import authController from '../controllers/auth.controller'

const router = Router()

router.get('/', getPaymentsController)
router.post('/', addPaymentController)
router.delete('/:id', deletePaymentController)
router.get('/user/:id', getUserController)
router.post('/users', addUserController)
router.post('/auth', authController)

export default router
