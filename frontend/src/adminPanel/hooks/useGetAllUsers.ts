import { getAllUsersApi } from 'api'
import { useApi } from 'hooks'
import { actions } from '../store/actions'

export const useGetAllUsers = ({ setAdminState }) => {
  const { request } = useApi()
  const getAllUsers = async () => {
    try {
      setAdminState(actions.setIsLoading(true))
      const users = await request(getAllUsersApi)
      setAdminState(actions.setUsers(users))
    } catch {
      throw {}
    } finally {
      setAdminState(actions.setIsLoading(false))
    }
  }
  return {
    getAllUsers
  }
}
