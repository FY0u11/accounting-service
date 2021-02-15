import styles from './RootHeader.module.css'
import { useLanguage, useLogoutHandler } from 'hooks'
import { AppContext } from '../../../../context/AppContext'
import React, { useContext, useState } from 'react'
import { Button, ModalWindow, PaymentForm } from 'components'

type RootHeaderProps = {
  children?: React.ReactNode
}

const RootHeader = ({ children }: RootHeaderProps) => {
  const { lang } = useLanguage()
  const { user } = useContext(AppContext)
  const [isPaymentModalOpened, setIsPaymentModalOpened] = useState(false)
  const logoutHandler = useLogoutHandler()

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

export default RootHeader
