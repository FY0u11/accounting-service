import { deleteOnePtypeApi } from 'api'
import { useApi } from 'hooks'
import { useState } from 'react'
import { Types } from '../../types'
import { actions } from '../store/actions'

export const useDeleteOnePtype = ({ adminState, setAdminState }) => {
  const [deletePtypeCandidateId, setDeletePtypeCandidateId] = useState('')
  const [isPtypeDeleteModalOpened, setIsPtypeDeleteModalOpened] = useState(false)
  const [amountOfPayments, setAmountOfPayments] = useState(0)
  const { request } = useApi()
  const deleteOnePtype = async (id: string = deletePtypeCandidateId) => {
    try {
      setAdminState(actions.setIsLoading(true))
      await request(deleteOnePtypeApi, id)
      setAdminState(actions.setPtypes(adminState.ptypes.filter(ptype => ptype._id !== id)))
    } catch {
      return
    } finally {
      setDeletePtypeCandidateId('')
      setIsPtypeDeleteModalOpened(false)
      setAdminState(actions.setIsLoading(false))
    }
  }
  const deletePtypeHandler = async (ptype: Types.AdminPtype) => {
    if (ptype.payments.length) {
      setAmountOfPayments(ptype.payments.length)
      setDeletePtypeCandidateId(ptype._id)
      setIsPtypeDeleteModalOpened(true)
    } else {
      await deleteOnePtype(ptype._id)
    }
  }
  return { deleteOnePtype, deletePtypeHandler, isPtypeDeleteModalOpened, setIsPtypeDeleteModalOpened, amountOfPayments }
}
