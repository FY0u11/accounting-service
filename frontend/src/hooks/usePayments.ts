import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { Types } from '../types'

import { useLoadAllPayments } from './useLoadAllPayments'
import { useLoadDayPayments } from './useLoadDayPayments'

export const usePayments = (type: Types.UsePaymentsTypes = 'all') => {
  const { setPayments, token } = useContext(AppContext)
  const router = useRouter()

  if (type === 'all')
    useEffect(() => {
      (async () => {
        setPayments(await useLoadAllPayments(token))
      })()
    }, [token])

  if (type === 'day')
    useEffect(() => {
      if (Object.keys(router.query).length) {
        (async () => {
          setPayments(await useLoadDayPayments(token, router.query))
        })()
      }
    }, [router])
}
