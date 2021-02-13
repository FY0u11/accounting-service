import { useRouter } from 'next/router'
import { useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import { useLanguage } from '../../../hooks/useLanguage'
import Button from '../../Button/Button'
import CustomSelect from '../../CustomSelect/CustomSelect'
import PaymentFormModal from '../../PaymentFormModal/PaymentFormModal'
import styles from './MainHeader.module.css'

const MainHeader = () => {
  const { lang } = useLanguage()
  const {
    setUser,
    setToken,
    user,
    setSelectedYear,
    setSelectedMonth,
    years,
    months,
    selectedYear,
    selectedMonth
  } = useContext(AppContext)
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
              onChangeHandler={setSelectedYear}
              values={years}
              selectedValue={selectedYear}
            />
            <CustomSelect
              title={lang.SELECT_MONTH}
              onChangeHandler={setSelectedMonth}
              values={months}
              selectedValue={selectedMonth}
              isForMonths={true}
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
