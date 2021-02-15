import styles from './DetailsTable.module.css'
import { useLanguage } from 'hooks'
import { Types } from '../../types'
import { AccountBalance, LocalAtm, CreditCard, MonetizationOn, Edit, Close } from '@material-ui/icons'
import { YesCancelModal, SortingHeader, ModalWindow, EditPaymentForm } from 'components'
import React from 'react'
import moment from 'moment'

type DetailsTableProps = {
  payments: Types.Payment[]
  detailsSorting: Types.Sorting
  setDetailsSorting: Types.SetState<Types.Sorting>
  deleteHandler: () => void
  isDeleteModalOpened: boolean
  setIsDeleteModalOpened: Types.SetState<boolean>
  isEditModalOpened: boolean
  setIsEditModalOpened: Types.SetState<boolean>
  selectedPaymentId: string
  setSelectedPaymentId: Types.SetState<string>
}

const DetailsTable = ({
  payments,
  detailsSorting,
  setDetailsSorting,
  deleteHandler,
  isDeleteModalOpened,
  setIsDeleteModalOpened,
  isEditModalOpened,
  setIsEditModalOpened,
  selectedPaymentId,
  setSelectedPaymentId
}: DetailsTableProps) => {
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

  return (
    <div className={styles.container}>
      <YesCancelModal
        title={lang.CONFIRM_DELETE}
        isModalOpened={isDeleteModalOpened}
        setIsModalOpened={setIsDeleteModalOpened}
        yesClickHandler={deleteHandler}
      />
      <ModalWindow isModalOpened={isEditModalOpened} setIsModalOpened={setIsEditModalOpened} title={lang.EDIT_PAYMENT}>
        <EditPaymentForm
          selectedPayment={payments.find(p => p._id === selectedPaymentId)}
          setIsModalOpened={setIsEditModalOpened}
        />
      </ModalWindow>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.desktop_th}>
              <SortingHeader>{lang.NUMBER}</SortingHeader>
            </th>
            {Object.keys(tableHeaders).map(type => {
              return (
                <th key={type + 'header'}>
                  <SortingHeader sorting={detailsSorting} setSorting={setDetailsSorting} by={type}>
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
          {payments.map((payment, i) => {
            return (
              <tr key={i}>
                <td className={styles.desktop_td}>{i + 1}</td>
                <td>
                  <div className={styles.desktop}>{moment(payment.time).format('DD.MM.YYYY, HH:mm:ss')}</div>
                  <div className={styles.mobile}>{moment(payment.time).format('HH:mm')}</div>
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
                    <div className={styles.desktop}>{paymentTypes[payment.type]}</div>
                  </div>
                </td>
                <td>
                  <div className={styles.actions}>
                    <Edit
                      onClick={() => {
                        setSelectedPaymentId(payment._id)
                        setIsEditModalOpened(true)
                      }}
                      className={styles.close_icon}
                    />
                    <Close
                      onClick={() => {
                        setSelectedPaymentId(payment._id)
                        setIsDeleteModalOpened(true)
                      }}
                      className={styles.close_icon}
                    />
                  </div>
                </td>
              </tr>
            )
          })}
          <tr className={styles.total_by}>
            <td>{lang.TOTAL}</td>
            <td />
            <td>
              {payments
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
