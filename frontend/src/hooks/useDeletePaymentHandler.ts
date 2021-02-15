import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { deletePayment } from 'api'

export const useDeletePaymentHandler = () => {
  const { payments, setPayments, token } = useContext(AppContext)
  return async (id: string) => {
    await deletePayment(id, token)
    setPayments(payments.filter(p => p._id !== id))
  }
}
