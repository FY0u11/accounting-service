import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { Types } from '../../types'
import { DetailsTable } from 'components'
import { useDeletePaymentHandler } from 'hooks'

const DetailsTableContainer = ({ payments }: { payments: Types.Payment[] }) => {
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false)
  const [isEditModalOpened, setIsEditModalOpened] = useState(false)
  const { detailsSorting, setDetailsSorting } = useContext(AppContext)
  const [selectedPayments, setSelectedPayments] = useState([] as Types.Payment[])
  const [selectedPaymentId, setSelectedPaymentId] = useState('')
  const deletePaymentHandler = useDeletePaymentHandler()

  const sort = payments => {
    return [...payments].sort((p1, p2) =>
      p1[detailsSorting.by as keyof Types.Payment] < p2[detailsSorting.by as keyof Types.Payment]
        ? detailsSorting.as
        : -detailsSorting.as
    )
  }

  useEffect(() => {
    setSelectedPayments(sort(payments))
  }, [payments])

  useEffect(() => {
    setSelectedPayments(sort(selectedPayments))
  }, [detailsSorting])

  const deleteHandler = async () => {
    await deletePaymentHandler(selectedPaymentId)
    setSelectedPaymentId('')
    setIsDeleteModalOpened(false)
  }

  return (
    <DetailsTable
      payments={selectedPayments}
      detailsSorting={detailsSorting}
      setDetailsSorting={setDetailsSorting}
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
