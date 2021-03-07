import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { Types } from '../../types'
import { DetailsTable } from 'components'
import { useDeletePaymentHandler } from 'hooks'

const DetailsTableContainer = ({ payments }: { payments: Types.Payment[] }) => {
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false)
  const [isEditModalOpened, setIsEditModalOpened] = useState(false)
  const { state } = useContext(AppContext)
  const [selectedPayments, setSelectedPayments] = useState([] as Types.Payment[])
  const [selectedPaymentId, setSelectedPaymentId] = useState('')
  const deletePaymentHandler = useDeletePaymentHandler()

  const sort = payments => {
    return [...payments].sort((p1, p2) => {
      switch (state.app.detailsSorting.by) {
        case 'ptype':
          return p1.ptype.name < p2.ptype.name ? state.app.detailsSorting.as : -state.app.detailsSorting.as
        case 'username':
          return p1.user.username < p2.user.username ? state.app.detailsSorting.as : -state.app.detailsSorting.as
        default:
          return p1[state.app.detailsSorting.by] < p2[state.app.detailsSorting.by]
            ? state.app.detailsSorting.as
            : -state.app.detailsSorting.as
      }
    })
  }

  useEffect(() => {
    setSelectedPayments(sort(payments))
  }, [payments])

  useEffect(() => {
    setSelectedPayments(sort(selectedPayments))
  }, [state.app.detailsSorting])

  const deleteHandler = () => {
    deletePaymentHandler(selectedPaymentId)
    setSelectedPaymentId('')
    setIsDeleteModalOpened(false)
  }

  return (
    <DetailsTable
      payments={selectedPayments}
      deleteHandler={deleteHandler}
      isDeleteModalOpened={isDeleteModalOpened}
      setIsDeleteModalOpened={setIsDeleteModalOpened}
      setIsEditModalOpened={setIsEditModalOpened}
      isEditModalOpened={isEditModalOpened}
      selectedPaymentId={selectedPaymentId}
      setSelectedPaymentId={setSelectedPaymentId}
    />
  )
}

export default DetailsTableContainer
