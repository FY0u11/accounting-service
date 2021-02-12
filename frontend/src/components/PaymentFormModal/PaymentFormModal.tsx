import { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import Button from '../Button/Button'
import ModalWindow from '../ModalWindow/ModalWindow'
import PaymentForm from '../PaymentForm/PaymentForm'
// import styles from './PaymentFormModal.module.css'

const PaymentFormModal = () => {
  const { lang } = useLanguage()
  const [isModalOpened, setIsModalOpened] = useState(false)
  return (
    <>
      <Button onClick={() => setIsModalOpened(true)}>{lang.ADD_BUTTON}</Button>
      {isModalOpened ? (
        <ModalWindow
          setIsModalOpened={setIsModalOpened}
          title={lang.MODAL_ADD_PAYMENT}
        >
          <PaymentForm />
        </ModalWindow>
      ) : null}
    </>
  )
}

export default PaymentFormModal
