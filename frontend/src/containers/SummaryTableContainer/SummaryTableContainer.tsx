import { useContext, useEffect, useState } from 'react'
import { SummaryTable } from 'components'
import { Types } from '../../types'
import { AppContext } from '../../context/AppContext'
import { useLanguage } from 'hooks'

const SummaryTableContainer = ({ payments }: { payments: Types.Payment[] }) => {
  const [selectedPayments, setSelectedPayments] = useState([] as Types.SummaryPayment[])
  const { state } = useContext(AppContext)
  const { lang } = useLanguage()

  const days = [lang.SUNDAY, lang.MONDAY, lang.TUESDAY, lang.WEDNESDAY, lang.THURSDAY, lang.FRIDAY, lang.SATURDAY]

  const sort = payments => {
    return [...payments].sort((p1, p2) =>
      (p1[state.app.summarySorting.by] ?? '') < (p2[state.app.summarySorting.by] ?? '')
        ? state.app.summarySorting.as
        : -state.app.summarySorting.as
    )
  }

  useEffect(() => {
    const daysMap = new Map()
    payments.forEach(payment => {
      const dt = new Date(payment.time)
      const day = daysMap.get(dt.getDate())
      if (day) {
        day[payment.ptype.name] ??= 0
        day[payment.ptype.name] += payment.value
        day.total += payment.value
      } else {
        daysMap.set(dt.getDate(), {
          day: `${dt.getDate()}, ${days[dt.getDay()]}`,
          [payment.ptype.name]: payment.value,
          total: payment.value
        })
      }
    })
    const paymentsToSelect = Array.from(daysMap.values())
    setSelectedPayments(sort(paymentsToSelect))
  }, [payments])

  useEffect(() => {
    if (!selectedPayments.length) return
    setSelectedPayments(sort(selectedPayments))
  }, [state.app.summarySorting, state.app.chosenMonth])

  return <SummaryTable payments={selectedPayments} />
}

export default SummaryTableContainer
