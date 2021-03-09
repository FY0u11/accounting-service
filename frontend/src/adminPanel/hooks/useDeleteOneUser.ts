import { deleteOneUserApi } from 'api'
import { useApi } from 'hooks'
import { useState } from 'react'
import { actions } from '../store/actions'

export const useDeleteOneUser = ({ adminState, setAdminState }) => {
  const [deleteUserCandidateId, setDeleteUserCandidateId] = useState('')
  const [isUserDeleteModalOpened, setIsUserDeleteModalOpened] = useState(false)
  const { request } = useApi()
  const deleteOneUser = async () => {
    try {
      setAdminState(actions.setIsLoading(true))
      await request(deleteOneUserApi, deleteUserCandidateId)
      setAdminState(actions.setUsers(adminState.users.filter(user => user._id !== deleteUserCandidateId)))
    } catch {
      return
    } finally {
      setDeleteUserCandidateId('')
      setIsUserDeleteModalOpened(false)
      setAdminState(actions.setIsLoading(false))
    }
  }
  const deleteUserHandler = (id: string) => {
    setDeleteUserCandidateId(id)
    setIsUserDeleteModalOpened(true)
  }
  return { deleteOneUser, deleteUserHandler, isUserDeleteModalOpened, setIsUserDeleteModalOpened }
}
