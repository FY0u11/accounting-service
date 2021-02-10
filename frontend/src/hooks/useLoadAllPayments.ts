import { useEffect } from 'react'

export const useLoadAllPayments = setPayments => {
  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch('http://localhost:3030')
        const payments = await response.json()
        setPayments(payments)
      } catch (e) {
        console.log(e.message)
      }
    })()
  }, [])
}
