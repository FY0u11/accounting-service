import NProgress from 'nprogress'
import Router, { useRouter } from 'next/router'
import '../styles/default.css'
import 'nprogress/nprogress.css'
import React, { useEffect, useReducer } from 'react'
import { AppProps } from 'next/app'
import { AppContext } from '../context/AppContext'
import { io } from 'socket.io-client'
import { initialState, reducer } from '../store/reducers'
import { actions } from '../store/actions'
import { getTokenPayload } from 'utils'
import { AppLoader } from 'components'
import { getActivePtypes, getAllPayments } from 'api'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({ Component, pageProps }: AppProps) => {
  const [state, setState] = useReducer(reducer, initialState)
  const router = useRouter()
  useEffect(() => {
    (async () => {
      if (window) await import('../../node_modules/materialize-css/dist/js/materialize.min')
      const token = window.localStorage.getItem('token')
      if (!token) {
        await router.push('/auth')
        setState(actions.setIsLoading(false))
        return
      }
      setState(actions.setUserToken(token))
    })()
  }, [])

  useEffect(() => {
    if (!state.user.token) return
    setState(actions.setIsLoading(true))
    ;(async () => {
      let payload
      try {
        payload = getTokenPayload(state.user.token)
      } catch (e) {
        setState(actions.setUserToken(null))
        window.localStorage.removeItem('token')
        await router.push('/auth')
        setState(actions.setIsLoading(false))
        return
      }
      const socket = io(process.env.NEXT_PUBLIC_IO_URL)
      setState(
        actions.setUser({
          id: payload.id,
          username: payload.username,
          role: payload.role,
          token: state.user.token,
          socket
        })
      )
      socket.on('message', message => {
        if (message === 'update page') router.reload()
      })
      const payments = await getAllPayments(state.user.token)
      const ptypes = await getActivePtypes(state.user.token)
      setState(actions.setPayments(payments))
      setState(actions.setPtypes(ptypes))
      setState(actions.setIsLoading(false))
    })()
  }, [state.user.token])

  return (
    <AppContext.Provider
      value={{
        state,
        setState
      }}
    >
      {state.isLoading ? <AppLoader /> : <Component {...pageProps} />}
    </AppContext.Provider>
  )
}

export default App
