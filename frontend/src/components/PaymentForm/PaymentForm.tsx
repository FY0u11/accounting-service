import { ViewDayTwoTone } from '@material-ui/icons'
import { useState } from 'react'
import styles from './PaymentForm.module.css'
import RadioInput from './RadioInput/RadioInput'

const PaymentForm = ({ addPaymentHandler, setIsModalOpened }) => {
  const [type, setType] = useState('cash')
  const [value, setValue] = useState('')

  const onClickHandler = e => {
    e.preventDefault()
    setValue('')
    addPaymentHandler({ value: +value, type, time: new Date() })
  }

  return (
    <form className={styles.container}>
      <input
        type="text"
        placeholder="Введите оплату"
        id="payment"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div>
        <RadioInput
          group="radio"
          id="1"
          value="cash"
          type={type}
          setType={setType}
        >
          Наличный расчет
        </RadioInput>
        <RadioInput
          group="radio"
          id="2"
          value="bank"
          type={type}
          setType={setType}
        >
          Безналичный расчет
        </RadioInput>
        <RadioInput
          group="radio"
          id="3"
          value="card"
          type={type}
          setType={setType}
        >
          Оплата по карте
        </RadioInput>
        <RadioInput
          group="radio"
          id="4"
          value="kaspi"
          type={type}
          setType={setType}
        >
          Kaspi Gold
        </RadioInput>
      </div>

      <button
        onClick={e => onClickHandler(e)}
        disabled={!value || /[^0-9]+/.test(value)}
      >
        Внести
      </button>
    </form>
  )
}

export default PaymentForm
