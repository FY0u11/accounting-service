import { Router } from 'express'
import { paymentsController } from '../controllers/payments.controller'
import { ptypesController } from '../controllers/ptypes.controller'
import { authController } from '../controllers/auth.controller'

const router = Router()

router.route('/payments').get(paymentsController.getAll).post(paymentsController.create)
router.route('/payments/:id').put(paymentsController.update).delete(paymentsController.deleteOne)
router.route('/ptypes').get(ptypesController.getAll).post(ptypesController.create)
router.route('/ptypes/:id').put(ptypesController.update).delete(ptypesController.deleteOne)
router.route('/auth').post(authController)

export default router
