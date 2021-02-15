import { MouseEvent, useState } from 'react'
import { useAddPaymentHandler, useLanguage } from 'hooks'
import { Types } from '../../types'
import styles from './PaymentForm.module.css'
import { Button, RadioInput, TextInput } from 'components'

const PaymentForm = () => {
  const [type, setType] = useState('cash' as Types.PaymentTypes)
  const [value, setValue] = useState('')
  const { lang } = useLanguage()
  const addPaymentHandler = useAddPaymentHandler()

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (isNaN(+value) || +value <= 0 || +value > 10e7 || value.length > 9) return
    setValue('')
    try {
      addPaymentHandler({ value: +value, type })
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <form className={styles.container}>
      <div>
        <TextInput value={value} onChangeHandler={setValue} placeholder={lang.INPUT_PAYMENT} />
        <RadioInput group="Payment types" id="1" onChangeHandler={() => setType('cash')} isChecked>
          {lang.CASH}
        </RadioInput>
        <RadioInput group="Payment types" id="2" onChangeHandler={() => setType('bank')}>
          {lang.BANK}
        </RadioInput>
        <RadioInput group="Payment types" id="3" onChangeHandler={() => setType('card')}>
          {lang.CARD}
        </RadioInput>
        <RadioInput group="Payment types" id="4" onChangeHandler={() => setType('kaspi')}>
          {lang.KASPI}
        </RadioInput>
      </div>
      <Button onClick={onClickHandler} disabled={isNaN(+value) || +value <= 0 || +value > 10e7 || value.length > 9}>
        {lang.ADD_PAYMENT}
      </Button>
    </form>
  )
}

export default PaymentForm
