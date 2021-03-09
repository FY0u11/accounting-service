import { getAllPtypesApi } from 'api'
import { useApi } from 'hooks'
import { actions } from '../store/actions'

export const useGetAllPtypes = ({ setAdminState }) => {
  const { request } = useApi()
  const getAllPtypes = async () => {
    try {
      setAdminState(actions.setIsLoading(true))
      const ptypes = await request(getAllPtypesApi)
      setAdminState(actions.setPtypes(ptypes))
    } catch {
      throw {}
    } finally {
      setAdminState(actions.setIsLoading(false))
    }
  }
  return {
    getAllPtypes
  }
}
