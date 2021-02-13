import { useContext, useEffect, useState } from 'react'
import SortingHeader from '../SortingHeader/SortingHeader'
import styles from './SummaryTable.module.css'
import Link from 'next/link'
import { useLanguage } from '../../hooks/useLanguage'
import { Types } from '../../types'
import { AppContext } from '../../context/AppContext'
import moment from 'moment'

type YearsMapType = Map<number, Map<string, Map<number, Types.SummaryPayment>>>

const SummaryTable = ({ payments }: { payments: Types.Payment[] }) => {
  const [paymentsMap, setPaymentsMap] = useState(new Map())
  const [selectedPayments, setSelectedPayments] = useState(
    [] as Types.SummaryPayment[]
  )
  const { lang } = useLanguage()
  const {
    setMonths,
    setYears,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    summarySorting,
    setSummarySorting
  } = useContext(AppContext)
  const tableHeaders = {
    day: lang.DAY,
    cash: lang.CASH,
    bank: lang.BANK,
    card: lang.CARD,
    kaspi: lang.KASPI,
    total: lang.TOTAL
  }

  const sort = (array: Types.SummaryPayment[]) => {
    array.sort((p1, p2) =>
      p1[summarySorting.by as keyof Types.SummaryPayment] <
      p2[summarySorting.by as keyof Types.SummaryPayment]
        ? summarySorting.as
        : -summarySorting.as
    )
  }

  useEffect(() => {
    console.log('1')
    const yearsMap: YearsMapType = new Map()
    payments.forEach(payment => {
      const dt = new Date(payment.time)
      let monthsMap = yearsMap.get(dt.getFullYear())
      if (!monthsMap) {
        monthsMap = new Map()
        yearsMap.set(dt.getFullYear(), monthsMap)
      }
      let daysMap = monthsMap.get(dt.toLocaleString('ru', { month: 'long' }))
      if (!daysMap) {
        daysMap = new Map()
        monthsMap.set(dt.toLocaleString('ru', { month: 'long' }), daysMap)
      }
      const day = daysMap.get(dt.getDate())
      if (day) {
        day[payment.type] += payment.value
        day.total += payment.value
      } else {
        const newP = {
          day: dt.getDate(),
          month: dt.getMonth() + 1,
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
    setPaymentsMap(yearsMap)
    const years = Array.from(yearsMap.keys())
    const months = Array.from(yearsMap.get(Math.max(...years))?.keys() ?? [])
    if (!selectedMonth && !selectedYear && setMonths) {
      setMonths(months)
      setYears(years.sort((a, b) => a - b).map(v => '' + v))
      setSelectedMonth(months[months.length - 1])
      setSelectedYear('' + Math.max(...years))
    }
  }, [payments])

  useEffect(() => {
    console.log(2)
    if (!selectedMonth || paymentsMap.size === 0) {
      return
    }
    const sPayments = Array.from(
      paymentsMap
        .get(+selectedYear)
        .get(selectedMonth)
        .values()
    ) as Types.SummaryPayment[]
    sort(sPayments)
    setSelectedPayments(sPayments)
  }, [selectedMonth])

  useEffect(() => {
    console.log(3)

    if (!selectedYear || paymentsMap.size === 0) {
      return
    }
    const months: string[] = Array.from(paymentsMap.get(+selectedYear).keys())
    setMonths(months)
    setSelectedMonth(months[months.length - 1])
    const sPayments = Array.from(
      paymentsMap
        .get(+selectedYear)
        .get(months[months.length - 1])
        .values()
    ) as Types.SummaryPayment[]
    sort(sPayments)
    setSelectedPayments(sPayments)
  }, [selectedYear])

  useEffect(() => {
    console.log(4)

    if (paymentsMap.size === 0 || !selectedMonth || !selectedYear) return
    const sPayments = Array.from(
      paymentsMap
        .get(+selectedYear)
        .get(selectedMonth)
        .values()
    ) as Types.SummaryPayment[]
    sort(sPayments)
    setSelectedPayments(sPayments)
  }, [paymentsMap])

  useEffect(() => {
    console.log(5)

    setSelectedPayments(
      [...selectedPayments].sort((p1, p2) =>
        p1[summarySorting.by as keyof Types.SummaryPayment] <
        p2[summarySorting.by as keyof Types.SummaryPayment]
          ? summarySorting.as
          : -summarySorting.as
      )
    )
  }, [summarySorting])

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {Object.keys(tableHeaders).map(type => {
              return (
                <th key={type + 'header'}>
                  <SortingHeader
                    sorting={summarySorting}
                    setSorting={setSummarySorting}
                    by={type}
                  >
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
              <Link
                key={i}
                href={`/${selectedYear}/${payment.month}/${payment.day}`}
              >
                <tr
                  className={
                    moment().isSame(
                      moment(
                        `${payment.day}/${payment.month}/${selectedYear}`,
                        'DD/MM/YYYY'
                      ),
                      'day'
                    )
                      ? styles.today
                      : ''
                  }
                >
                  <td>{payment.day}</td>
                  <td>{payment.cash ? payment.cash.toLocaleString() : '-'}</td>
                  <td>{payment.bank ? payment.bank.toLocaleString() : '-'}</td>
                  <td>{payment.card ? payment.card.toLocaleString() : '-'}</td>
                  <td>
                    {payment.kaspi ? payment.kaspi.toLocaleString() : '-'}
                  </td>
                  <td>
                    {payment.total ? payment.total.toLocaleString() : '-'}
                  </td>
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
                    .reduce(
                      (acc, payment) =>
                        (acc += payment[i as keyof typeof payment]),
                      0
                    )
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
