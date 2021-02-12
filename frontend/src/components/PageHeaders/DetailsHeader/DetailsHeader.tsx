import Button from '../../Button/Button'
import PaymentFormModal from '../../PaymentFormModal/PaymentFormModal'
import styles from './DetailsHeader.module.css'
import { useRouter } from 'next/router'
import { useLanguage } from '../../../hooks/useLanguage'
import { AppContext } from '../../../context/AppContext'
import { useContext } from 'react'

const DetailsHeader = () => {
  const router = useRouter()
  const { lang } = useLanguage()
  const { setUser, setToken, user } = useContext(AppContext)

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
            <Button
              onClick={() => {
                router.push('/')
              }}
            >
              {lang.BACK}
            </Button>
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

export default DetailsHeader
