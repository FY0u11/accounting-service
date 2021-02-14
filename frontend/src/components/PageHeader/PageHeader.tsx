import styles from './PageHeader.module.css'
import { useRouter } from 'next/router'
import { useLanguage } from '../../hooks/useLanguage'
import { AppContext } from '../../context/AppContext'
import React, { useContext, useState } from 'react'
import { Button, ModalWindow, PaymentForm } from 'components'

type PageHeaderProps = {
  children?: React.ReactNode
}

const PageHeader = ({ children }: PageHeaderProps) => {
  const router = useRouter()
  const { lang } = useLanguage()
  const { setUser, setToken, user } = useContext(AppContext)
  const [isPaymentModalOpened, setIsPaymentModalOpened] = useState(false)

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
            <Button onClick={() => setIsPaymentModalOpened(true)}>{lang.ADD_BUTTON}</Button>
            <ModalWindow
              isModalOpened={isPaymentModalOpened}
              setIsModalOpened={setIsPaymentModalOpened}
              title={lang.MODAL_ADD_PAYMENT}
            >
              <PaymentForm />
            </ModalWindow>
            {children}
          </div>
          <div className={styles.right}>
            <p>{user.username}</p>
            <Button onClick={logoutHandler}>{lang.LOGOUT}</Button>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default PageHeader
