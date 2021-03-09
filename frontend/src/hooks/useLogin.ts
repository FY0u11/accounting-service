import { useRouter }              from 'next/router'
import { useContext, useState }   from 'react'

import { authenticate }           from 'api'
import { saveToken }              from 'utils'
import { useApi }                 from './index'
import { AppContext }             from '../context/AppContext'
import { actions }                from '../store/actions'

export const useLogin             = () => {
  const { setState }              = useContext(AppContext)
  const router                    = useRouter()
  const [form, setForm]           = useState({ username: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const { request }               = useApi()
  const login                     = async () => {
    try {
      setIsLoading(true)
      const token = await request(authenticate, form.username, form.password)
      saveToken(token)
      setState(actions.setUserToken(token))
      return router.push('/')
    } catch {
      setForm({ username: '', password: '' })
    }
    setIsLoading(false)
  }
  return { login, form, setForm, isLoading }
}
