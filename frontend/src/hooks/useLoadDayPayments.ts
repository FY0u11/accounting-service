export const useLoadDayPayments = async (token, query) => {
  try {
    const { month, day, year } = query
    const response = await fetch(
      `http://localhost:3030?filter=${month}.${day}.${year}`,
      {
        headers: {
          Authorization: 'BEARER ' + token
        }
      }
    )
    const payments = await response.json()
    return payments
  } catch (e) {
    console.log(e.message)
  }
}
