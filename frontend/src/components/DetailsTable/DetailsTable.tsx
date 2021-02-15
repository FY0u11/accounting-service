import styles from './DetailsTable.module.css'
import { Close } from '@material-ui/icons'
import { useLanguage } from 'hooks'
import { Types } from '../../types'
import { AccountBalance, LocalAtm, CreditCard, MonetizationOn } from '@material-ui/icons'
import { YesCancelModal, SortingHeader } from 'components'

type DetailsTableProps = {
  payments: Types.Payment[]
  detailsSorting: Types.Sorting
  setDetailsSorting: Types.SetState<Types.Sorting>
  deleteHandler: () => void
  openDeleteModal: (id: string) => void
  isModalOpened: boolean
  setIsModalOpened: Types.SetState<boolean>
}

const DetailsTable = ({
  payments,
  detailsSorting,
  setDetailsSorting,
  deleteHandler,
  openDeleteModal,
  isModalOpened,
  setIsModalOpened
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
        isModalOpened={isModalOpened}
        setIsModalOpened={setIsModalOpened}
        yesClickHandler={deleteHandler}
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
                <td>{i + 1}</td>
                <td>{new Date(Date.parse(payment.time)).toLocaleString('ru')}</td>
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
                <td>
                  <div className={styles.actions}>
                    <Close onClick={() => openDeleteModal(payment._id)} className={styles.close_icon} />
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
