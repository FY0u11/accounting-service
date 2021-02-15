import { useContext, useEffect, useState } from 'react'
import { SummaryTable } from 'components'
import { Types } from '../../types'
import { AppContext } from '../../context/AppContext'

const SummaryTableContainer = ({ payments }: { payments: Types.Payment[] }) => {
  const [selectedPayments, setSelectedPayments] = useState([] as Types.SummaryPayment[])
  const { selectedMonth, selectedYear, summarySorting, setSummarySorting } = useContext(AppContext)

  const sort = payments => {
    return [...payments].sort((p1, p2) =>
      p1[summarySorting.by as keyof Types.SummaryPayment] < p2[summarySorting.by as keyof Types.SummaryPayment]
        ? summarySorting.as
        : -summarySorting.as
    )
  }

  useEffect(() => {
    const daysMap = new Map()
    payments.forEach(payment => {
      const dt = new Date(payment.time)
      const day = daysMap.get(dt.getDate())
      if (day) {
        day[payment.type] += payment.value
        day.total += payment.value
      } else {
        const newP = {
          day: dt.getDate(),
          cash: 0,
          bank: 0,
          card: 0,
          kaspi: 0,
          total: 0
        }
        newP[payment.type] += payment.value
        newP.total += payment.value
        daysMap.set(dt.getDate(), newP)
      }
    })
    const paymentsToSelect = Array.from(daysMap.values())
    setSelectedPayments(sort(paymentsToSelect))
  }, [payments])

  useEffect(() => {
    if (!selectedPayments.length) return
    setSelectedPayments(sort(selectedPayments))
  }, [summarySorting, selectedMonth])

  return (
    <SummaryTable
      payments={selectedPayments}
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      setSummarySorting={setSummarySorting}
      summarySorting={summarySorting}
    />
  )
}

export default SummaryTableContainer
