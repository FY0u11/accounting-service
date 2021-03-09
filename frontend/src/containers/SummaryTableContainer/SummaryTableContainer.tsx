import { useContext, useEffect, useState } from 'react'

import { SummaryTable }                    from 'components'
import { AppContext }                      from '../../context/AppContext'
import { Types }                           from '../../types'

const SummaryTableContainer = ({ payments }: { payments: Types.Payment[] }) => {
  const { state }                               = useContext(AppContext)
  const [selectedPayments, setSelectedPayments] = useState([] as Types.SummaryPayment[])
  const days                                    = [
    state.enums.SUNDAY,
    state.enums.MONDAY,
    state.enums.TUESDAY,
    state.enums.WEDNESDAY,
    state.enums.THURSDAY,
    state.enums.FRIDAY,
    state.enums.SATURDAY
  ]

  const sort = payments => {
    if (state.app.summarySorting.by === 'day') {
      const pattern = new RegExp('^(?<num>\\d+)')
      return [...payments].sort((p1, p2) => +pattern.exec(p1.day).groups.num < +pattern.exec(p2.day).groups.num
        ? state.app.summarySorting.as
        : -state.app.summarySorting.as
      )
    }
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
