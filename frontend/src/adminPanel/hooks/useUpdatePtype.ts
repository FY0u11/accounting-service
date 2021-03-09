import { updatePtypeApi } from 'api'
import { useApi } from 'hooks'
import { useState } from 'react'
import { Types } from '../../types'
import { actions as adminActions } from '../store/actions'

export const useUpdatePtype = ({ adminState, setAdminState }) => {
  const [updatedPtype, setUpdatedPtype] = useState<Types.AdminPtype>({ name: '' })
  const [isPtypeUpdateModalOpened, setIsPtypeUpdateModalOpened] = useState(false)
  const { request } = useApi()
  const updatePtype = async () => {
    try {
      console.log('here', updatedPtype)
      setAdminState(adminActions.setIsLoading(true))
      await request(updatePtypeApi, updatedPtype)
      adminState.ptypes.find(ptype => ptype._id === updatedPtype._id).name = updatedPtype.name
      setAdminState(adminActions.setPtypes(adminState.ptypes))
    } catch {
      return
    } finally {
      setUpdatedPtype({ name: '' })
      setIsPtypeUpdateModalOpened(false)
      setAdminState(adminActions.setIsLoading(false))
    }
  }
  const updatePtypeHandler = (ptype: Types.AdminPtype) => {
    setUpdatedPtype(ptype)
    setIsPtypeUpdateModalOpened(true)
  }
  return { updatePtype, updatePtypeHandler, isPtypeUpdateModalOpened, setIsPtypeUpdateModalOpened, updatedPtype, setUpdatedPtype }
}
