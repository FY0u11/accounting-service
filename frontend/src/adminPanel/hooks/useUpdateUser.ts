import { updateUserApi } from 'api'
import { useApi } from 'hooks'
import { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { Types } from '../../types'
import { actions as adminActions } from '../store/actions'
import { actions } from '../../store/actions'

export const useUpdateUser = ({ adminState, setAdminState }) => {
  const { state, setState } = useContext(AppContext)
  const [updatedUser, setUpdatedUser] = useState<Types.AdminUser>({})
  const [isUserUpdateModalOpened, setIsUserUpdateModalOpened] = useState(false)
  const { request } = useApi()
  const updateUser = async () => {
    try {
      setAdminState(adminActions.setIsLoading(true))
      const update = {
        _id: updatedUser._id,
        username: updatedUser.username ? updatedUser.username : null,
        password: updatedUser.password ? updatedUser.password : null,
        role: updatedUser.role
      }
      await request(updateUserApi, update)
      const { username: oldUsername } = adminState.users.find(user => user._id === updatedUser._id)
      setAdminState(adminActions.setUsers([
        ...adminState.users.filter(user => user._id !== updatedUser._id),
        { ...updatedUser, username: updatedUser.username ? updatedUser.username : oldUsername }
      ]))
      if (state.user._id === updatedUser._id) {
        setState(
          actions.setUser({
            ...state.user,
            role: updatedUser.role,
            username: updatedUser.username ? updatedUser.username : state.user.username
          })
        )
      }
    } catch {
      return
    } finally {
      setUpdatedUser({})
      setIsUserUpdateModalOpened(false)
      setAdminState(adminActions.setIsLoading(false))
    }
  }
  const updateUserHandler = (updatedUser: Types.AdminUser) => {
    setUpdatedUser(updatedUser)
    setIsUserUpdateModalOpened(true)
  }
  return { updateUser, updateUserHandler, isUserUpdateModalOpened, setIsUserUpdateModalOpened, updatedUser, setUpdatedUser }
}
