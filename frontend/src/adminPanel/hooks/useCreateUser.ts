import { createUserApi } from 'api'
import { useApi } from 'hooks'
import { useState } from 'react'
import { Types } from '../../types'
import { actions } from '../store/actions'

export const useCreateUser = ({ adminState, setAdminState }) => {
  const [ userForm, setUserForm] = useState<Types.AdminUser>({ username: '', password: '' })
  const { request } = useApi()
  const createUser = async () => {
    try {
      setAdminState(actions.setIsLoading(true))
      const newUser = await request(createUserApi, userForm)
      setAdminState(actions.setUsers([...adminState.users, newUser]))
    } catch {
      return
    } finally {
      setAdminState(actions.setIsLoading(false))
      setUserForm({ username: '', password: '' })
    }
  }
  return { createUser, userForm, setUserForm }
}
