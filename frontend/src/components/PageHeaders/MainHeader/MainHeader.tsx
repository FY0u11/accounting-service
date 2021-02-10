import { useLanguage } from '../../../hooks/useLanguage'
import { Types } from '../../../types'
import CustomSelect from '../../CustomSelect/CustomSelect'
import PaymentFormModal from '../../PaymentFormModal/PaymentFormModal'
// import styles from './MainHeader.module.css'

type MainHeaderProps = {
  addPaymentHandler: (payment: Types.PaymentForCreate) => void
  months: string[]
  selectMonthHandler: (month: string) => void
  selectedMonth: string
  selectedYear: string
  years: string[]
  selectYearHandler: (year: string) => void
}

const MainHeader = ({
  addPaymentHandler,
  months = [],
  selectMonthHandler,
  selectedMonth,
  selectedYear,
  years = [],
  selectYearHandler
}: MainHeaderProps) => {
  const { lang } = useLanguage()
  return (
    <>
      <PaymentFormModal addPaymentHandler={addPaymentHandler} />
      <CustomSelect
        title={lang.SELECT_YEAR}
        onChangeHandler={selectYearHandler}
        values={years}
        selectedValue={selectedYear}
      />
      <CustomSelect
        title={lang.SELECT_MONTH}
        onChangeHandler={selectMonthHandler}
        values={months}
        selectedValue={selectedMonth}
      />
    </>
  )
}

export default MainHeader
