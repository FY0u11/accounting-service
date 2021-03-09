import { useContext, useEffect, useState } from 'react'

import { AppLoader, DetailsTable }         from 'components'
import { useDeleteOnePayment }             from 'hooks'
import { AppContext }                      from '../../context/AppContext'
import { Types }                           from '../../types'

const DetailsTableContainer = ({ payments }: { payments: Types.Payment[] }) => {
  const { state }                                     = useContext(AppContext)
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false)
  const [isEditModalOpened, setIsEditModalOpened]     = useState(false)
  const [selectedPayments, setSelectedPayments]       = useState([] as Types.Payment[])
  const [selectedPaymentId, setSelectedPaymentId]     = useState('')
  const [isLoading, setIsLoading]                     = useState(false)
  const { deleteOnePayment }                          = useDeleteOnePayment(setIsLoading)

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

  const deleteHandler = async () => {
    await deleteOnePayment(selectedPaymentId)
    setSelectedPaymentId('')
    setIsDeleteModalOpened(false)
  }

  return (
    <>
      {!isLoading ? (
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
      ) : (
        <AppLoader />
      )}
    </>
  )
}

export default DetailsTableContainer
