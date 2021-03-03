import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Types } from '../types'
import { updatePayment } from 'api'
import { actions } from '../store/actions'

export const useEditPaymentHandler = () => {
  const { state, setState } = useContext(AppContext)
  return async (id: string, payment: Types.PaymentForCreate) => {
    const newPayment = await updatePayment(id, payment, state.user.token)
    setState(actions.setPayments([...state.payments.filter(p => p._id !== id), newPayment]))
  }
}
