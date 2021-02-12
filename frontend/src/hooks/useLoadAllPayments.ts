export const useLoadAllPayments = async token => {
  try {
    const response = await fetch('http://localhost:3030', {
      headers: {
        Authorization: 'BEARER ' + token
      }
    })
    const payments = await response.json()
    return payments
  } catch (e) {
    console.log(e.message)
  }
}
