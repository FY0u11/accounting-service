import styles from './DetailsTable.module.css'
import { useLanguage } from 'hooks'
import { Types } from '../../types'
import { Edit, Close } from '@material-ui/icons'
import { YesCancelModal, SortingHeader, ModalWindow, EditPaymentForm, Table } from 'components'
import React from 'react'
import moment from 'moment'
import { getIcon } from 'utils'

type DetailsTableProps = {
  payments: Types.Payment[]
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
  deleteHandler,
  isDeleteModalOpened,
  setIsDeleteModalOpened,
  isEditModalOpened,
  setIsEditModalOpened,
  selectedPaymentId,
  setSelectedPaymentId
}: DetailsTableProps) => {
  const { lang } = useLanguage()
  const tableHeaders = {
    time: lang.TIME,
    value: lang.PAYMENT,
    ptype: lang.TYPE
  }
  const totalValue = payments.reduce((acc, payment) => (acc += payment.value), 0)

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
      <Table
        tbodyId={styles.tbody}
        thead={
          <tr>
            <th className={styles.desktop_th}>
              <SortingHeader>{lang.NUMBER}</SortingHeader>
            </th>
            {Object.keys(tableHeaders).map(type => (
              <th key={type + 'header'}>
                <SortingHeader by={type} type="details">
                  {tableHeaders[type as keyof typeof tableHeaders]}
                </SortingHeader>
              </th>
            ))}
            <th>
              <SortingHeader>{lang.ACTIONS}</SortingHeader>
            </th>
          </tr>
        }
        tbody={
          <>
            {payments.map((payment, i) => {
              return (
                <tr key={i}>
                  <td className={styles.desktop_td}>{i + 1}</td>
                  <td>
                    <div className={styles.desktop}>{moment(payment.time).format('DD.MM.YYYY, HH:mm:ss')}</div>
                    <div className={styles.mobile}>{moment(payment.time).format('HH:mm')}</div>
                  </td>
                  <td className={payment.value < 0 ? 'outcome' : null}>{payment.value ? payment.value : '-'}</td>
                  <td>
                    <div className={styles.type}>
                      <div className={styles.icon}>{getIcon(payment.ptype.icon)()}</div>
                      <div className={styles.desktop}>{payment.ptype.name}</div>
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
              <td className={totalValue < 0 ? 'outcome' : null}>{totalValue.toLocaleString().replace(/^0$/, '-')}</td>
            </tr>
          </>
        }
      />
    </div>
  )
}

export default DetailsTable
