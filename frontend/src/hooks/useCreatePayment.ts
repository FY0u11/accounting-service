import { useContext }         from 'react'

import { createPaymentApi }   from 'api'
import { nF }                 from 'utils'
import { useApi }             from './index'
import { AppContext }         from '../context/AppContext'
import { actions }            from '../store/actions'
import { Types }              from '../types'

export const useCreatePayment = (loadingHandler: (isLoading: boolean) => void = nF) => {
  const { state, setState }   = useContext(AppContext)
  const { request }           = useApi()
  const createPayment         = async (payment: Types.PaymentForCreate) => {
    try {
      loadingHandler(true)
      const newPayment = await request(createPaymentApi, payment)
      setState(actions.setPayments([...state.payments, newPayment]))
    } catch {
      return
    } finally {
      loadingHandler(false)
    }
  }
  return { createPayment }
}
