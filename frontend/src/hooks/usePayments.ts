export const usePayments = async token => {
  try {
    const response = await fetch('http://localhost:3030', {
      headers: {
        Authorization: 'BEARER ' + token
      }
    })
    return await response.json()
  } catch (e) {
    console.log(e.message)
  }
}
