import { useState } from 'react'
import { Types } from '../types'

import { useAddPaymentHandler } from './useAddPaymentHandler'
import { useLoadAllPayments } from './useLoadAllPayments'
import { useLoadDayPayments } from './useLoadDayPayments'

export const usePayments = (type: Types.UsePaymentsTypes = 'all') => {
  const [payments, setPayments] = useState([] as Types.Payment[])

  switch (type) {
    case 'all':
      useLoadAllPayments(setPayments)
      break
    case 'day':
      useLoadDayPayments(setPayments)
      break
  }

  const addPaymentHandler = useAddPaymentHandler(payments, setPayments)
  return { payments, setPayments, addPaymentHandler }
}
