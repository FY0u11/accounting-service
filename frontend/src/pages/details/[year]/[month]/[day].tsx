import { useLanguage } from 'hooks'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../context/AppContext'
import moment from 'moment'
import { useRouter } from 'next/router'
import { Layout } from 'components'
import { DetailsTableContainer } from 'containers'

const DayDetails = () => {
  const router = useRouter()
  const { lang } = useLanguage()
  const { state } = useContext(AppContext)
  const [selectedPayments, setSelectedPayments] = useState([])

  useEffect(() => {
    const { day, month, year } = router.query
    setSelectedPayments(
      state.payments.filter(p => {
        return moment(p.time).isSame(moment(`${day}.${month}.${year}`, 'DD.MM.YYYY'), 'day')
      })
    )
  }, [state.payments])

  return (
    <Layout title={lang.DOCUMENT_TITLE_DETAILS}>
      <DetailsTableContainer payments={selectedPayments} />
    </Layout>
  )
}

export default DayDetails
