import NProgress from 'nprogress'
import Router, { useRouter } from 'next/router'
import '../styles/default.css'
import 'nprogress/nprogress.css'
import React, { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import { AppContext } from '../context/AppContext'
import { Types } from '../types'
import { verify } from 'jsonwebtoken'
import { usePayments } from '../hooks/usePayments'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({ Component, pageProps }: AppProps) => {
  const [token, setToken] = useState('')
  const [payments, setPayments] = useState<Types.Payment[]>([])
  const [user, setUser] = useState<Types.User | null>(null)
  const [months, setMonths] = useState([] as string[])
  const [years, setYears] = useState([] as string[])
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [summarySorting, setSummarySorting] = useState({
    by: 'day',
    as: 1
  } as Types.Sorting)
  const [detailsSorting, setDetailsSorting] = useState({
    by: 'time',
    as: 1
  } as Types.Sorting)

  const router = useRouter()

  useEffect(() => {
    (async () => {
      try {
        const token = window.localStorage.getItem('token')
        const jwtSecret = process.env.NEXT_PUBLIC_SECRET
        if (!jwtSecret) {
          console.log('Missing NEXT_PUBLIC_SECRET in .env.local')
          return
        }
        const payload = verify(token ?? '', jwtSecret) as {
          id: string
          username: string
        }
        setToken(token ?? '')
        setUser({ id: payload.id, username: payload.username })
      } catch (e) {
        window.localStorage.removeItem('token')
        router.push('/auth')
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      setPayments(await usePayments(token))
    })()
  }, [token])

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        payments,
        setPayments,
        months,
        setMonths,
        years,
        setYears,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
        summarySorting,
        setSummarySorting,
        detailsSorting,
        setDetailsSorting
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default App
