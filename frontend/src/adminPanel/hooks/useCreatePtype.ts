import { createPtypeApi } from 'api'
import { useApi } from 'hooks'
import { useState } from 'react'
import { actions } from '../store/actions'

export const useCreatePtype = ({ adminState, setAdminState }) => {
  const [ ptypeName, setPtypeName] = useState('')
  const { request } = useApi()
  const createPtype = async () => {
    try {
      setAdminState(actions.setIsLoading(true))
      const newPtype = await request(createPtypeApi, { name: ptypeName.trim() })
      setAdminState(actions.setPtypes([...adminState.ptypes, newPtype]))
    } catch {
      return
    } finally {
      setAdminState(actions.setIsLoading(false))
      setPtypeName('')
    }
  }
  return { createPtype, ptypeName, setPtypeName }
}
