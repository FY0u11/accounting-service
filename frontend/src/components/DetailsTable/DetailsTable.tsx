import { useContext, useEffect, useState } from 'react'
import SortingHeader from '../SortingHeader/SortingHeader'
import styles from './DetailsTable.module.css'
import { Close } from '@material-ui/icons'
import { useLanguage } from '../../hooks/useLanguage'
import DeleteModal from '../DeleteModal/DeleteModal'
import { Types } from '../../types'
import { AppContext } from '../../context/AppContext'
import moment from 'moment'
import { useRouter } from 'next/router'
import {
  AccountBalance,
  LocalAtm,
  CreditCard,
  MonetizationOn
} from '@material-ui/icons'

const DetailsTable = () => {
  const router = useRouter()
  const [isModalOpened, setIsModalOpened] = useState(false)
  const { payments, setPayments, token, detailsSorting, setDetailsSorting } = useContext(
    AppContext
  )
  const [deleteCandidate, setDeleteCandidate] = useState('')
  const [dayPayments, setDayPayments] = useState(
    payments.filter(payment => {
      return moment(payment.time).isSame(
        moment(
          `${router.query.day}/${router.query.month}/${router.query.year}`,
          'DD/MM/YYYY'
        ),
        'day'
      )
    })
  )
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

  const isToday = () => {
    return moment().isSame(
      moment(
        `${router.query.day}/${router.query.month}/${router.query.year}`,
        'DD/MM/YYYY'
      ),
      'day'
    )
  }

  const sort = payments => {
    return [...payments].sort((p1, p2) =>
      p1[detailsSorting.by as keyof Types.Payment] <
      p2[detailsSorting.by as keyof Types.Payment]
        ? detailsSorting.as
        : -detailsSorting.as
    )
  }

  useEffect(() => {
    setDayPayments(
      sort(
        payments.filter(payment => {
          return moment(payment.time).isSame(
            moment(
              `${router.query.day}/${router.query.month}/${router.query.year}`,
              'DD/MM/YYYY'
            ),
            'day'
          )
        })
      )
    )
  }, [payments])

  useEffect(() => {
    setDayPayments(
      [...dayPayments].sort((p1, p2) =>
        p1[detailsSorting.by as keyof Types.Payment] <
        p2[detailsSorting.by as keyof Types.Payment]
          ? detailsSorting.as
          : -detailsSorting.as
      )
    )
  }, [detailsSorting])

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
            <th>
              <SortingHeader>{lang.NUMBER}</SortingHeader>
            </th>
            {Object.keys(tableHeaders).map(type => {
              return (
                <th key={type + 'header'}>
                  <SortingHeader
                    sorting={detailsSorting}
                    setSorting={setDetailsSorting}
                    by={type}
                  >
                    {tableHeaders[type as keyof typeof tableHeaders]}
                  </SortingHeader>
                </th>
              )
            })}
            {/* {isToday() ? ( */}
              <th>
                <SortingHeader>{lang.ACTIONS}</SortingHeader>
              </th>
            {/* ) : null} */}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {dayPayments.map((payment, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  {new Date(Date.parse(payment.time)).toLocaleString('ru')}
                </td>
                <td>{payment.value ? payment.value.toLocaleString() : '-'}</td>
                <td>
                  <div className={styles.type}>
                    {payment.type === 'bank' ? (
                      <AccountBalance className={styles.icon} />
                    ) : payment.type === 'cash' ? (
                      <LocalAtm className={styles.icon} />
                    ) : payment.type === 'card' ? (
                      <CreditCard className={styles.icon} />
                    ) : (
                      <MonetizationOn className={styles.icon} />
                    )}
                    <div>{paymentTypes[payment.type]}</div>
                  </div>
                </td>
                {/* {isToday() ? ( */}
                  <td>
                    <div className={styles.actions}>
                      <Close
                        onClick={() => openDeleteModal(payment._id)}
                        className={styles.close_icon}
                      />
                    </div>
                  </td>
                {/* ) : null} */}
              </tr>
            )
          })}
          <tr className={styles.total_by}>
            <td>{lang.TOTAL}</td>
            <td></td>
            <td>
              {dayPayments
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
