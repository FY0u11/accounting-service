import moment                                     from 'moment'
import { useRouter }                              from 'next/router'
import React, { useContext, useEffect, useState } from 'react'

import { Layout }                                 from 'components'
import { DetailsTableContainer }                  from 'containers'
import { AppContext }                             from '../../../../context/AppContext'

const DayDetails = () => {
  const { state }                                 = useContext(AppContext)
  const router                                    = useRouter()
  const [selectedPayments, setSelectedPayments]   = useState([])

  useEffect(() => {
    const { day, month, year } = router.query
    setSelectedPayments(
      state.payments.filter(p => {
        return moment(p.time).isSame(moment(`${day}.${month}.${year}`, 'DD.MM.YYYY'), 'day')
      })
    )
  }, [state.payments])

  return (
    <Layout title={state.enums.DOCUMENT_TITLE_DETAILS}>
      <DetailsTableContainer payments={selectedPayments} />
    </Layout>
  )
}

export default DayDetails
