import NProgress from 'nprogress'
import Router, { useRouter } from 'next/router'
import '../styles/default.css'
import 'nprogress/nprogress.css'
import React, { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import { AppContext } from '../context/AppContext'
import { Types } from '../types'
import { verify } from 'jsonwebtoken'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({ Component, pageProps }: AppProps) => {
  const [token, setToken] = useState('')
  const [payments, setPayments] = useState<Types.Payment[]>([])
  const [user, setUser] = useState<Types.User | null>(null)
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
        const payload = verify(token ?? '', jwtSecret) as { id: string, username: string }
        setToken(token ?? '')
        setUser({ id: payload.id, username: payload.username })
      } catch (e) {
        window.localStorage.removeItem('token')
        router.push('/auth')
      }
    })()
  }, [])

  return (
    <AppContext.Provider
      value={{ user, setUser, token, setToken, payments, setPayments }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default App
