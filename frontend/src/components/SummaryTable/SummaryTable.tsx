import { useContext, useEffect, useState } from 'react'
import { SortingHeader } from 'components'
import styles from './SummaryTable.module.css'
import Link from 'next/link'
import { useLanguage } from '../../hooks/useLanguage'
import { Types } from '../../types'
import { AppContext } from '../../context/AppContext'
import moment from 'moment'

// fixme: If go to details page, delete payment and press back button it will replace all payments with details payments

const SummaryTable = ({ payments }: { payments: Types.Payment[] }) => {
  const [selectedPayments, setSelectedPayments] = useState([] as Types.SummaryPayment[])
  const { lang } = useLanguage()
  const { selectedMonth, selectedYear, summarySorting, setSummarySorting } = useContext(AppContext)
  const tableHeaders = {
    day: lang.DAY,
    cash: lang.CASH,
    bank: lang.BANK,
    card: lang.CARD,
    kaspi: lang.KASPI,
    total: lang.TOTAL
  }

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
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {Object.keys(tableHeaders).map(type => {
              return (
                <th key={type + 'header'}>
                  <SortingHeader sorting={summarySorting} setSorting={setSummarySorting} by={type}>
                    {tableHeaders[type as keyof typeof tableHeaders]}
                  </SortingHeader>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {selectedPayments.map((payment, i) => {
            return (
              <Link key={i} href={`/${selectedYear}/${selectedMonth}/${payment.day}`}>
                <tr
                  className={
                    moment().isSame(moment(`${payment.day}/${selectedMonth}/${selectedYear}`, 'DD/MM/YYYY'), 'day')
                      ? styles.today
                      : ''
                  }
                >
                  <td>{payment.day}</td>
                  <td>{payment.cash ? payment.cash.toLocaleString() : '-'}</td>
                  <td>{payment.bank ? payment.bank.toLocaleString() : '-'}</td>
                  <td>{payment.card ? payment.card.toLocaleString() : '-'}</td>
                  <td>{payment.kaspi ? payment.kaspi.toLocaleString() : '-'}</td>
                  <td>{payment.total ? payment.total.toLocaleString() : '-'}</td>
                </tr>
              </Link>
            )
          })}
          <tr className={styles.total_by}>
            <td>{lang.TOTAL}</td>
            {['cash', 'bank', 'card', 'kaspi', 'total'].map(i => {
              return (
                <td key={i + 'total'}>
                  {selectedPayments
                    .reduce((acc, payment) => (acc += payment[i as keyof typeof payment]), 0)
                    .toLocaleString()
                    .replace(/^0$/, '-')}
                </td>
              )
            })}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default SummaryTable
