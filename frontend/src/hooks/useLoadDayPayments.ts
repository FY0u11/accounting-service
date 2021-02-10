import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Types } from '../types'

export const useLoadDayPayments = (
  setPayments: Types.SetState<Types.Payment[]>
) => {
  const router = useRouter()
  useEffect(() => {
    (async () => {
      const { day, month, year } = router.query
      if (!day || !month || !year) return
      try {
        const response = await fetch(
          `http://localhost:3030?filter=${month}.${day}.${year}`
        )
        const payments = await response.json()
        setPayments(payments)
      } catch (e) {
        console.log(e.message)
      }
    })()
  }, [router])
}
