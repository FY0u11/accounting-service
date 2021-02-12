import { useContext, useEffect, useState } from 'react'
import SortingHeader from '../SortingHeader/SortingHeader'
import styles from './DetailsTable.module.css'
import { Close } from '@material-ui/icons'
import { useLanguage } from '../../hooks/useLanguage'
import DeleteModal from '../DeleteModal/DeleteModal'
import { Types } from '../../types'
import { AppContext } from '../../context/AppContext'
import { usePayments } from '../../hooks/usePayments'

const DetailsTable = () => {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const { payments, setPayments, token } = useContext(AppContext)
  usePayments('day')
  const [deleteCandidate, setDeleteCandidate] = useState('')
  const [sorting, setSorting] = useState({
    by: 'time',
    as: 1
  } as Types.Sorting)
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
        p1[sorting.by as keyof Types.Payment] <
        p2[sorting.by as keyof Types.Payment]
          ? sorting.as
          : -sorting.as
      )
    )
  }, [sorting])

  const deleteHandler = async () => {
    try {
      await fetch(`http://localhost:3030/${deleteCandidate}`, {
        method: 'delete',
        headers: {
          Authorization: 'BEARER ' + token
        }
      })
      setPayments(payments.filter(p => p._id !== deleteCandidate))
      setDeleteCandidate('')
      setIsModalOpened(false)
    } catch (e) {
      console.log(e.message)
    }
  }

  const openDeleteModal = (_id: string) => {
    setDeleteCandidate(_id)
    setIsModalOpened(true)
  }

  return (
    <div className={styles.container}>
      <DeleteModal
        isModalOpened={isModalOpened}
        setIsModalOpened={setIsModalOpened}
        deleteHandler={deleteHandler}
      />
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {Object.keys(tableHeaders).map(type => {
              return (
                <th key={type + 'header'}>
                  <SortingHeader
                    sorting={sorting}
                    setSorting={setSorting}
                    by={type}
                  >
                    {tableHeaders[type as keyof typeof tableHeaders]}
                  </SortingHeader>
                </th>
              )
            })}
            <th>
              <SortingHeader>{lang.ACTIONS}</SortingHeader>
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
                  <div className={styles.actions}>
                    <Close
                      onClick={() => openDeleteModal(payment._id)}
                      className={styles.close_icon}
                    />
                  </div>
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
