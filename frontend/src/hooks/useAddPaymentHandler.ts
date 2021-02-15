import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Types } from '../types'
import { addPayment } from 'api'

export const useAddPaymentHandler = () => {
  const { payments, setPayments, token } = useContext(AppContext)
  return async (payment: Types.PaymentForCreate) => {
    const newPayment = await addPayment(payment, token)
    setPayments([...payments, newPayment])
  }
}
