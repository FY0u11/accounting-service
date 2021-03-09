import { useContext }            from 'react'

import { deleteOnePaymentApi }   from 'api'
import { nF }                    from 'utils'
import { useApi }                from './index'
import { AppContext }            from '../context/AppContext'
import { actions }               from '../store/actions'

export const useDeleteOnePayment = (loadingHandler: (isLoading: boolean) => void = nF) => {
  const { state, setState }      = useContext(AppContext)
  const { request }              = useApi()
  const deleteOnePayment         = async (id: string) => {
    try {
      loadingHandler(true)
      await request(deleteOnePaymentApi, id)
      setState(actions.setPayments(state.payments.filter(payment => payment._id !== id)))
    } catch {
      return
    } finally {
      loadingHandler(false)
    }
  }
  return { deleteOnePayment }
}
