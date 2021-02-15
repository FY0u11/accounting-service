import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useRouter } from 'next/router'

export const useLogoutHandler = () => {
  const {
    setToken,
    setUser,
    setPayments,
    setMonths,
    setYears,
    setSelectedMonth,
    setSelectedYear,
    setSummarySorting,
    setDetailsSorting
  } = useContext(AppContext)
  const router = useRouter()
  return () => {
    setUser(null)
    setSummarySorting({
      by: 'day',
      as: 1
    })
    setDetailsSorting({
      by: 'time',
      as: 1
    })
    setMonths([])
    setYears([])
    setSelectedYear('')
    setSelectedMonth('')
    setPayments([])
    setToken('')
    window.localStorage.removeItem('token')
    router.push('/auth')
  }
}
