import { useLanguage } from '../../../hooks/useLanguage'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import moment from 'moment'
import { useRouter } from 'next/router'
import { DetailsHeader, DetailsTable, Layout } from 'components'

const DayDetails = () => {
  const router = useRouter()
  const { lang } = useLanguage()
  const { user, payments } = useContext(AppContext)
  const [selectedPayments, setSelectedPayments] = useState([])

  useEffect(() => {
    if (!payments.length || !Object.keys(router.query).length) return
    const { day, month, year } = router.query
    setSelectedPayments(
      payments.filter(p => {
        return moment(p.time).isSame(moment(`${day}.${month}.${year}`, 'DD.MM.YYYY'), 'day')
      })
    )
  }, [payments])

  return (
    <>
      {user && payments.length ? (
        <Layout title={lang.DOCUMENT_TITLE_DETAILS} HeaderComponent={<DetailsHeader />}>
          <DetailsTable payments={selectedPayments} />
        </Layout>
      ) : null}
    </>
  )
}

export default DayDetails
