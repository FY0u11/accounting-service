import Button from '../../Button/Button'
import PaymentFormModal from '../../PaymentFormModal/PaymentFormModal'
import styles from './Header.module.css'
import { useRouter } from 'next/router'
import { useLanguage } from '../../../hooks/useLanguage'

const DetailsHeader = ({ addPaymentHandler }) => {
  const router = useRouter()
  const { lang } = useLanguage()
  return (
    <>
      <PaymentFormModal addPaymentHandler={addPaymentHandler} />
      <Button
        onClick={() => {
          router.push('/')
        }}
      >
        {lang.BACK}
      </Button>
    </>
  )
}

export default DetailsHeader
