import { useEffect, useState } from 'react'
import ModalWindow from '../ModalWindow/ModalWindow'
import SortingHeader from '../SortingHeader/SortingHeader'
import styles from './DetailsTable.module.css'
import { Close } from '@material-ui/icons'
import { useLanguage } from '../../hooks/useLanguage'

const DetailsTable = ({ payments, setPayments }) => {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [deleteCandidate, setDeleteCandidate] = useState(null)
  const [sorting, setSorting] = useState({ by: 'time', as: 1 })
  const [sortedPayments, setSortedPayments] = useState(payments)
  const { lang } = useLanguage()
  const paymentTypes = {
    cash: lang.CASH,
    bank: lang.BANK,
    card: lang.CARD,
    kaspi: lang.KASPI
  }
  const tableHeaders = {
    time: lang.TIME,
    value: lang.PAYMENT,
    type: lang.TYPE
  }
  useEffect(() => {
    setSortedPayments(payments)
  }, [payments])

  useEffect(() => {
    setSortedPayments(
      [...payments].sort((p1, p2) =>
        p1[sorting.by] < p2[sorting.by] ? sorting.as : -sorting.as
      )
    )
  }, [sorting])

  const deleteHandler = async () => {
    try {
      await fetch(`http://localhost:3030/${deleteCandidate}`, {
        method: 'delete'
      })
      setPayments(payments.filter(p => p.time !== deleteCandidate))
      setDeleteCandidate(null)
      setIsModalOpened(false)
    } catch (e) {
      console.log(e.message)
    }
  }

  const openDeleteModal = time => {
    setDeleteCandidate(time)
    setIsModalOpened(true)
  }

  return (
    <div className={styles.container}>
      {isModalOpened ? (
        <ModalWindow
          setIsModalOpened={setIsModalOpened}
          title={lang.CONFIRM_DELETE}
        >
          <div style={{ width: '300px' }}>
            <button
              onClick={() => deleteHandler()}
              style={{ margin: '1rem 1rem 0 0' }}
            >
              {lang.YES}
            </button>
            <button onClick={() => setIsModalOpened(false)}>{lang.NO}</button>
          </div>
        </ModalWindow>
      ) : null}
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
            <th>
              <SortingHeader sorting={{}} setSorting={() => {}} by={null}>
                {lang.ACTIONS}
              </SortingHeader>
            </th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {sortedPayments.map((payment, i) => {
            return (
              <tr key={i}>
                <td>
                  {new Date(Date.parse(payment.time)).toLocaleString('ru')}
                </td>
                <td>{payment.value ? payment.value.toLocaleString() : '-'}</td>
                <td>{paymentTypes[payment.type]}</td>
                <td>
                  <Close
                    onClick={() => openDeleteModal(payment.time)}
                    style={{ cursor: 'pointer', color: 'red', display: 'flex' }}
                  />
                </td>
              </tr>
            )
          })}
          <tr className={styles.total_by}>
            <td>{lang.TOTAL}</td>
            <td>
              {sortedPayments
                .reduce((acc, payment) => (acc += payment.value), 0)
                .toLocaleString()
                .replace(/^0$/, '-')}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DetailsTable
