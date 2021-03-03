import { SortingHeader, Table } from 'components'
import styles from './SummaryTable.module.css'
import Link from 'next/link'
import { useLanguage } from 'hooks'
import { Types } from '../../types'
import moment from 'moment'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

type SummaryTableProps = {
  payments: Types.SummaryPayment[]
}

const SummaryTable = ({ payments }: SummaryTableProps) => {
  const { lang } = useLanguage()
  const { state } = useContext(AppContext)
  const totalValue = payments.reduce((acc, payment) => (acc += +payment.total), 0)

  // const paymentTypes = state.ptypes.map(ptype => ptype.name)

  return (
    <div className={styles.container}>
      <Table
        trHover={true}
        tbodyId={styles.tbody}
        theadId={styles.thead}
        thead={
          <tr>
            <th>
              <SortingHeader by={'day'}>{lang.DAY}</SortingHeader>
            </th>
            {state.ptypes.map((ptype, i) => (
              <th key={i}>
                <SortingHeader by={ptype.name}>{ptype.name}</SortingHeader>
              </th>
            ))}
            <th>
              <SortingHeader by={'total'}>{lang.TOTAL}</SortingHeader>
            </th>
          </tr>
        }
        tbody={
          <>
            {payments.map((payment, i) => {
              return (
                <Link key={i} href={`/details/${state.app.chosenYear}/${state.app.chosenMonth}/${payment.day}`}>
                  <tr
                    className={
                      moment().isSame(
                        moment(`${payment.day}/${state.app.chosenMonth}/${state.app.chosenYear}`, 'DD/MM/YYYY'),
                        'day'
                      )
                        ? styles.today
                        : ''
                    }
                  >
                    <td>{payment.day}</td>
                    {state.ptypes.map((ptype, i) => (
                      <td key={i + 'td'} className={payment[ptype.name] < 0 ? 'outcome' : null}>
                        {payment[ptype.name] ? payment[ptype.name].toLocaleString() : '-'}
                      </td>
                    ))}
                    <td className={payment.total < 0 ? 'outcome' : null}>
                      {payment.total ? payment.total.toLocaleString() : '-'}
                    </td>
                  </tr>
                </Link>
              )
            })}
            <tr>
              <td>{lang.TOTAL}</td>
              {state.ptypes.map((ptype, i) => {
                const total = payments.reduce(
                  (acc, payment) => (acc += payment[ptype.name] ? +payment[ptype.name] : 0),
                  0
                )
                return (
                  <td key={i + 'total'} className={total < 0 ? 'outcome' : null}>
                    {total.toLocaleString().replace(/^0$/, '-')}
                  </td>
                )
              })}
              <td className={totalValue < 0 ? 'outcome' : null}>{totalValue.toLocaleString().replace(/^0$/, '-')}</td>
            </tr>
          </>
        }
      />
    </div>
  )
}

export default SummaryTable
