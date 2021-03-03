import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { deleteOnePayment } from 'api'
import { actions } from '../store/actions'

export const useDeletePaymentHandler = () => {
  const { state, setState } = useContext(AppContext)
  return async (id: string) => {
    await deleteOnePayment(id, state.user.token)
    setState(actions.setPayments(state.payments.filter(p => p._id !== id)))
  }
}
