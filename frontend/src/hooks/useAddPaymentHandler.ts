import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Types } from '../types'
import { createPayment } from 'api'
import { actions } from '../store/actions'

export const useAddPaymentHandler = () => {
  const { state, setState } = useContext(AppContext)
  return async (payment: Types.PaymentForCreate) => {
    const newPayment = await createPayment(payment, state.user.token)
    setState(actions.setPayments([...state.payments, newPayment]))
  }
}
