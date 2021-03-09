import { useContext, useState }   from 'react'

import { updatePaymentApi }       from 'api'
import { useApi }                 from './index'
import { AppContext }             from '../context/AppContext'
import { actions }                from '../store/actions'
import { Types }                  from '../types'

export const useUpdatePayment     = (paymentToUpdate: Types.Payment) => {
  const { state, setState }       = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm]           = useState({
    _id: paymentToUpdate._id,
    value: paymentToUpdate.value,
    ptype: paymentToUpdate.ptype._id
  })
  const { request }               = useApi()
  const updatePayment             = async () => {
    try {
      setIsLoading(true)
      const updatedPayment = await request(updatePaymentApi, form)
      setState(actions.setPayments([...state.payments.filter(p => p._id !== paymentToUpdate._id), updatedPayment]))
    } catch {
      return
    } finally {
      setIsLoading(false)
    }
  }
  return { updatePayment, form, setForm, isLoading }
}
