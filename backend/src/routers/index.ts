import { Router } from 'express'
import addPaymentController from '../controllers/addPayment.controller'
import getPaymentsController from '../controllers/getPayments.controller'
import deletePaymentController from '../controllers/deletePayment.controller'

const router = Router()

router.get('/', getPaymentsController)
router.post('/', addPaymentController)
router.delete('/:time', deletePaymentController)

export default router
