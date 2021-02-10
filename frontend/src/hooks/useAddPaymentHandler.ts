export const useAddPaymentHandler = (
  payments,
  setPayments
) => async payment => {
  try {
    await fetch('http://localhost:3030', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payment)
    })
    setPayments([...payments, payment])
  } catch (e) {
    console.log(e.message)
  }
}
