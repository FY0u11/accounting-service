import { useLanguage } from '../../../hooks/useLanguage'
import CustomSelect from '../../CustomSelect/CustomSelect'
import PaymentFormModal from '../../PaymentFormModal/PaymentFormModal'
import styles from './MainHeader.module.css'

const MainHeader = ({
  addPaymentHandler,
  months = [],
  selectMonthHandler,
  selectedMonth,
  selectedYear,
  years = [],
  selectYearHandler
}) => {
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
