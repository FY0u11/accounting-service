import { useRouter }  from 'next/router'
import { useContext } from 'react'

import { AppContext } from '../context/AppContext'
import { actions }    from '../store/actions'

export const useLogoutHandler = () => {
  const { setState }          = useContext(AppContext)
  const router                = useRouter()
  return async () => {
    setState(actions.clearState())
    window.localStorage.removeItem('token')
    await router.push('/auth')
    setState(actions.setIsLoading(false))
  }
}
