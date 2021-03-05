import { Router } from 'express'
import { paymentsController } from '../controllers/payments.controller'
import { ptypesController } from '../controllers/ptypes.controller'
import { authController } from '../controllers/auth.controller'
import { usersController } from '../controllers/users.controller'

const router = Router()

router.route('/payments').get(paymentsController.getAll).post(paymentsController.create)
router.route('/payments/:id').put(paymentsController.update).delete(paymentsController.deleteOne)
router.route('/ptypes').get(ptypesController.getAll).post(ptypesController.create)
router.route('/ptypes/:id').put(ptypesController.update).delete(ptypesController.deleteOne)
router.route('/users').get(usersController.getAll).post(usersController.create)
router.route('/users/:id').put(usersController.update).delete(usersController.deleteOne)
router.route('/auth').post(authController)

export default router
