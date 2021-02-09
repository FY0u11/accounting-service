import { useEffect, useState } from 'react'
import ModalWindow from '../ModalWindow/ModalWindow'
import SortingHeader from '../SortingHeader/SortingHeader'
import styles from './DetailsTable.module.css'
import { Close } from '@material-ui/icons'

const tableHeaders = {
  time: 'Время',
  type: 'Тип',
  value: 'Платеж'
}

const paymentTypes = {
  cash: 'Наличный расчет',
  bank: 'Безналичный расчет',
  card: 'Оплата по карте',
  kaspi: 'Оплата на Kaspi Gold'
}

const DetailsTable = ({ payments, setPayments }) => {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [deleteCandidate, setDeleteCandidate] = useState(null)
  const [sorting, setSorting] = useState({ by: 'time', as: 1 })
  const [sortedPayments, setSortedPayments] = useState(payments)

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
          title="Действительно удалить?"
        >
          <div style={{ width: '300px' }}>
            <button
              onClick={() => deleteHandler()}
              style={{ margin: '1rem 1rem 0 0' }}
            >
              Да
            </button>
            <button onClick={() => setIsModalOpened(false)}>Нет</button>
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
                Действия
              </SortingHeader>
            </th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {sortedPayments.map((payment, i) => {
            return (
              <tr key={i}>
                <td>
                  {new Date(Date.parse(payment.time)).toLocaleTimeString()}
                </td>
                <td>{paymentTypes[payment.type]}</td>
                <td>{payment.value.toLocaleString()}</td>
                <td>
                  <Close
                    onClick={() => openDeleteModal(payment.time)}
                    style={{ cursor: 'pointer', color: 'red', display: 'flex' }}
                  />
                </td>
              </tr>
            )
          })}
          {/* <tr className={styles.total_by}>
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
          </tr> */}
        </tbody>
      </table>
    </div>
  )
}

export default DetailsTable
