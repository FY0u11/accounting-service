import { useEffect } from 'react'
import { Types } from '../types'

export const useLoadAllPayments = (
  setPayments: Types.SetState<Types.Payment[]>
) => {
  useEffect(() => {
    (async () => {
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
