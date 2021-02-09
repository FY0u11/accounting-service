import { useEffect, useState } from 'react'
import SortingHeader from '../SortingHeader/SortingHeader'
import styles from './SummaryTable.module.css'
import Link from 'next/link'

// todo: remove these types to somewhere else
type PaymentType = {
  cash: number
  card: number
  bank: number
  kaspi: number
}
type YearsMapType = Map<number, Map<number, Map<number, PaymentType>>>

const tableHeaders = {
  day: 'Дата',
  cash: 'Наличный расчет',
  bank: 'Безналичный расчет',
  card: 'Оплата по карте',
  kaspi: 'Оплата на Kaspi Gold'
}

const SummaryTable = ({
  payments,
  setMonths,
  setYears,
  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear
}) => {
  const [sorting, setSorting] = useState({ by: 'day', as: 1 })
  const [paymentsMap, setPaymentsMap] = useState(new Map())
  const [selectedPayments, setSelectedPayments] = useState([])

  const sort = array => {
    array.sort((p1, p2) =>
      p1[sorting.by] < p2[sorting.by] ? sorting.as : -sorting.as
    )
  }

  useEffect(() => {
    const yearsMap: YearsMapType = new Map()
    payments.forEach(payment => {
      const dt = new Date(payment.time)
      let monthsMap = yearsMap.get(dt.getFullYear())
      if (!monthsMap) {
        monthsMap = new Map()
        yearsMap.set(dt.getFullYear(), monthsMap)
      }
      let daysMap = monthsMap.get(dt.getMonth())
      if (!daysMap) {
        daysMap = new Map()
        monthsMap.set(dt.getMonth(), daysMap)
      }
      let day = daysMap.get(dt.getDate())
      if (day) {
        day[payment.type] += payment.value
      } else {
        const newP = {
          day: dt.getDate(),
          cash: 0,
          bank: 0,
          card: 0,
          kaspi: 0
        }
        newP[payment.type] += payment.value
        daysMap.set(dt.getDate(), newP)
      }
    })
    setPaymentsMap(yearsMap)
    const years = Array.from(yearsMap.keys())
    const months = Array.from(yearsMap.get(Math.max(...years)).keys())
    if (!selectedMonth && !selectedYear) {
      setMonths(months.sort((a, b) => b - a))
      setYears(years.sort((a, b) => b - a))
      setSelectedMonth(Math.max(...months))
      setSelectedYear(Math.max(...years))
    }
  }, [payments])

  useEffect(() => {
    if (!selectedMonth) {
      return
    }
    const sPayments = Array.from(
      paymentsMap
        .get(+selectedYear)
        .get(+selectedMonth)
        .values()
    )
    sort(sPayments)
    setSelectedPayments(sPayments)
  }, [selectedMonth])

  useEffect(() => {
    if (!selectedYear) {
      return
    }
    const months: Array<number> = Array.from(
      paymentsMap.get(+selectedYear).keys()
    )
    setMonths(months.sort((a, b) => b - a))
    setSelectedMonth(Math.max(...months))
    const sPayments = Array.from(
      paymentsMap
        .get(+selectedYear)
        .get(Math.max(...months))
        .values()
    )
    sort(sPayments)
    setSelectedPayments(sPayments)
  }, [selectedYear])

  useEffect(() => {
    if (!paymentsMap || !selectedMonth || !selectedYear) return
    const sPayments = Array.from(
      paymentsMap
        .get(+selectedYear)
        .get(+selectedMonth)
        .values()
    )
    sort(sPayments)
    setSelectedPayments(sPayments)
  }, [paymentsMap])

  useEffect(() => {
    setSelectedPayments(
      [...selectedPayments].sort((p1, p2) =>
        p1[sorting.by] < p2[sorting.by] ? sorting.as : -sorting.as
      )
    )
  }, [sorting])

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {Object.keys(tableHeaders).map((type, i) => {
              return (
                <th key={type + 'header'}>
                  <SortingHeader
                    sorting={sorting}
                    setSorting={setSorting}
                    by={type}
                  >
                    {tableHeaders[type]}
                  </SortingHeader>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {selectedPayments.map((payment, i) => {
            return (
              <Link
                key={i}
                href={`/${selectedYear}/${+selectedMonth + 1}/${payment.day}`}
              >
                <tr
                  className={
                    new Date().getDate() === payment.day ? styles.today : null
                  }
                >
                  <td>{payment.day}</td>
                  <td>{payment.cash ? payment.cash.toLocaleString() : '-'}</td>
                  <td>{payment.bank ? payment.bank.toLocaleString() : '-'}</td>
                  <td>{payment.card ? payment.card.toLocaleString() : '-'}</td>
                  <td>
                    {payment.kaspi ? payment.kaspi.toLocaleString() : '-'}
                  </td>
                </tr>
              </Link>
            )
          })}
          <tr className={styles.total_by}>
            <td>Итого: </td>
            {['cash', 'bank', 'card', 'kaspi'].map(i => {
              return (
                <td key={i + 'total'}>
                  {selectedPayments
                    .reduce((acc, payment) => (acc += payment[i]), 0)
                    .toLocaleString()
                    .replace(/^0$/, '-')}
                </td>
              )
            })}
          </tr>
          <tr>
            <td>Всего за месяц:</td>
            <td>
              {selectedPayments
                .reduce(
                  (acc, payment) =>
                    (acc +=
                      payment.cash +
                      payment.bank +
                      payment.card +
                      payment.kaspi),
                  0
                )
                .toLocaleString() + ' тг'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default SummaryTable
