import { AppProps }                                                  from 'next/app'
import Router, { useRouter }                                         from 'next/router'
import NProgress                                                     from 'nprogress'
import React, { useEffect, useReducer }                              from 'react'
import { io }                                                        from 'socket.io-client'

import { getActivePtypes, getAllPayments, getSelf, getSelfPayments } from 'api'
import { AppLoader }                                                 from 'components'
import { useApi }                                                    from 'hooks'
import { getTokenPayload }                                           from 'utils'
import { AppContext }                                                from '../context/AppContext'
import { actions }                                                   from '../store/actions'
import { initialState, reducer }                                     from '../store/reducers'
import 'nprogress/nprogress.css'
import '../styles/default.css'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({ Component, pageProps }: AppProps) => {
  const [state, setState] = useReducer(reducer, initialState)
  const router            = useRouter()
  const { request }       = useApi(state)

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
      let user
      try {
        payload = getTokenPayload(state.user.token)
        user = await request(getSelf)
      } catch {
        setState(actions.setUserToken(null))
        window.localStorage.removeItem('token')
        await router.push('/auth')
        setState(actions.setIsLoading(false))
        return
      }
      const socket = io(process.env.NEXT_PUBLIC_IO_URL)
      setState(
        actions.setUser({
          _id: payload.id,
          username: user.username,
          role: user.role,
          token: state.user.token,
          socket,
          settings: JSON.parse(user.settings)
        })
      )
      socket.on('message', message => {
        if (message === 'update page') router.reload()
      })
      try {
        const payments =
          user.role === 'admin' && JSON.parse(user.settings).showAllPayments
            ? await request(getAllPayments)
            : await request(getSelfPayments)
        const ptypes = await request(getActivePtypes)
        setState(actions.setPayments(payments))
        setState(actions.setPtypes(ptypes))
        setState(actions.setIsLoading(false))
      } catch {
        return
      }
    })()
  }, [state.user.token])

  useEffect(() => {
    (async () => {
      if (!state.user.token) return
      try {
        const payments =
          state.user.role === 'admin' && state.user.settings.showAllPayments
            ? await request(getAllPayments)
            : await request(getSelfPayments)
        setState(actions.setPayments(payments))
      } catch {
        return
      }
    })()
  }, [state.user.settings.showAllPayments])

  useEffect(() => {
    if (!state.user.settings.lang) return
    setState(actions.setEnums(state.user.settings.lang))
  }, [state.user.settings.lang])

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
