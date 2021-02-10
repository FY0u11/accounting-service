import { Types } from '../types'

export const useAddPaymentHandler = (
  payments: Types.Payment[],
  setPayments: Types.SetState<Types.Payment[]>
) => async (payment: Types.PaymentForCreate) => {
  try {
    const response = await fetch('http://localhost:3030', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payment)
    })
    const newPayment = await response.json()
    setPayments([...payments, newPayment])
  } catch (e) {
    console.log(e.message)
  }
}
