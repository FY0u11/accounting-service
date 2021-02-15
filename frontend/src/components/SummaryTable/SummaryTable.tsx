import { SortingHeader } from 'components'
import styles from './SummaryTable.module.css'
import Link from 'next/link'
import { useLanguage } from 'hooks'
import { Types } from '../../types'
import moment from 'moment'

type SummaryTableProps = {
  payments: Types.SummaryPayment[]
  selectedMonth: string
  selectedYear: string
  summarySorting: Types.Sorting
  setSummarySorting: Types.SetState<Types.Sorting>
}

const SummaryTable = ({
  payments,
  selectedMonth,
  selectedYear,
  summarySorting,
  setSummarySorting
}: SummaryTableProps) => {
  const { lang } = useLanguage()
  const tableHeaders = {
    day: lang.DAY,
    cash: lang.CASH,
    bank: lang.BANK,
    card: lang.CARD,
    kaspi: lang.KASPI,
    total: lang.TOTAL
  }

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
          {payments.map((payment, i) => {
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
                  {payments
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
