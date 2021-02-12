import { useRouter } from 'next/router'
import { useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import { useLanguage } from '../../../hooks/useLanguage'
import Button from '../../Button/Button'
import CustomSelect from '../../CustomSelect/CustomSelect'
import PaymentFormModal from '../../PaymentFormModal/PaymentFormModal'
import styles from './MainHeader.module.css'

type MainHeaderProps = {
  months: string[]
  selectMonthHandler: (month: string) => void
  selectedMonth: string
  selectedYear: string
  years: string[]
  selectYearHandler: (year: string) => void
}

const MainHeader = ({
  months = [],
  selectMonthHandler,
  selectedMonth,
  selectedYear,
  years = [],
  selectYearHandler
}: MainHeaderProps) => {
  const { lang } = useLanguage()
  const { setUser, setToken, user } = useContext(AppContext)
  const router = useRouter()

  const logoutHandler = () => {
    setUser(null)
    setToken('')
    window.localStorage.removeItem('token')
    router.push('/auth')
  }

  return (
    <>
      {user ? (
        <div className={styles.container}>
          <div className={styles.left}>
            <PaymentFormModal />
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
          </div>
          <div className={styles.right}>
            <p>{user.username}</p>
            <Button onClick={logoutHandler}>Выйти</Button>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default MainHeader
