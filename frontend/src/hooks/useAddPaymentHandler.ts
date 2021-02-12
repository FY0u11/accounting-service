import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Types } from '../types'

export const useAddPaymentHandler = () => {
  const { payments, setPayments, token } = useContext(AppContext)
  return async (payment: Types.PaymentForCreate) => {
    try {
      const response = await fetch('http://localhost:3030', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'BEARER ' + token
        },
        body: JSON.stringify(payment)
      })
      const newPayment = await response.json()
      setPayments([...payments, newPayment])
    } catch (e) {
      console.log(e.message)
    }
  }
}
