import DetailsTable from '../../../components/DetailsTable/DetailsTable'
import DetailsLayout from '../../../components/Layout/Layout'
import DetailsHeader from '../../../components/PageHeaders/DetailsHeader/DetailsHeader'
import { useLanguage } from '../../../hooks/useLanguage'
import { usePayments } from '../../../hooks/usePayments'
import React from 'react'

const DayDetails = () => {
  const { payments, setPayments, addPaymentHandler } = usePayments('day')
  const { lang } = useLanguage()
  return (
    <DetailsLayout
      title={lang.DOCUMENT_TITLE_DETAILS}
      HeaderComponent={<DetailsHeader addPaymentHandler={addPaymentHandler} />}
    >
      <DetailsTable payments={payments} setPayments={setPayments} />
    </DetailsLayout>
  )
}

export default DayDetails
