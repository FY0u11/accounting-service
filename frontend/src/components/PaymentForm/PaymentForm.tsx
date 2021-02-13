import { MouseEvent, useState } from 'react'
import { useAddPaymentHandler } from '../../hooks/useAddPaymentHandler'
import { useLanguage } from '../../hooks/useLanguage'
import { Types } from '../../types'
import Button from '../Button/Button'
import styles from './PaymentForm.module.css'
import RadioInput from './RadioInput/RadioInput'

const PaymentForm = () => {
  const [type, setType] = useState('cash' as Types.PaymentTypes)
  const [value, setValue] = useState('')
  const { lang } = useLanguage()
  const addPaymentHandler = useAddPaymentHandler()

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (isNaN(+value) || +value <= 0 || +value > 10e7 || value.length > 9) return
    setValue('')
    addPaymentHandler({ value: +value, type })
  }

  return (
    <form className={styles.container}>
      <input
        type="text"
        placeholder={lang.INPUT_PAYMENT}
        id="payment"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div>
        <RadioInput group="radio" id="1" value="cash" type={type} setType={setType}>
          {lang.CASH}
        </RadioInput>
        <RadioInput group="radio" id="2" value="bank" type={type} setType={setType}>
          {lang.BANK}
        </RadioInput>
        <RadioInput group="radio" id="3" value="card" type={type} setType={setType}>
          {lang.CARD}
        </RadioInput>
        <RadioInput group="radio" id="4" value="kaspi" type={type} setType={setType}>
          {lang.KASPI}
        </RadioInput>
      </div>

      <Button
        onClick={e => onClickHandler(e)}
        disabled={isNaN(+value) || +value <= 0 || +value > 10e7 || value.length > 9}
      >
        {lang.ADD_PAYMENT}
      </Button>
    </form>
  )
}

export default PaymentForm
