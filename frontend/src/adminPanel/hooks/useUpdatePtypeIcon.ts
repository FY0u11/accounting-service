import { updatePtypeApi } from 'api'
import { useApi } from 'hooks'
import { useState } from 'react'
import { Types } from '../../types'
import { actions } from '../store/actions'

export const useUpdatePtypeIcon = ({ adminState, setAdminState }) => {
  const [updatedPtype, setUpdatedPtype] = useState<Types.AdminPtype>({})
  const [isIconModalOpened, setIsIconModalOpened] = useState(false)
  const { request } = useApi()
  const updatePtypeIcon = async (icon: string) => {
    try {
      setAdminState(actions.setIsLoading(true))
      await request(updatePtypeApi, { _id: updatedPtype._id, icon })
      adminState.ptypes.find(ptype => ptype._id === updatedPtype._id).icon = icon
      setAdminState(actions.setPtypes(adminState.ptypes))
    } catch {
      return
    } finally {
      setAdminState(actions.setIsLoading(false))
      setIsIconModalOpened(false)
      setUpdatedPtype({})
    }
  }
  const updatePtypeIconHandler = (ptype: Types.AdminPtype) => {
    setUpdatedPtype(ptype)
    setIsIconModalOpened(true)
  }
  return { updatePtypeIcon, updatePtypeIconHandler, isIconModalOpened, setIsIconModalOpened }
}
