import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Types } from '../types'
import { editPayment } from 'api'

export const useEditPaymentHandler = () => {
  const { payments, setPayments, token } = useContext(AppContext)
  return async (id: string, payment: Types.PaymentForCreate) => {
    await editPayment(id, payment, token)
    const editedPayment = payments.find(p => p._id === id)
    setPayments([...payments.filter(p => p._id !== id), { ...editedPayment, ...payment }])
  }
}
