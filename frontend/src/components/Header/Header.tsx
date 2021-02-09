import { useState } from 'react'
import ModalWindow from '../ModalWindow/ModalWindow'
import PaymentForm from '../PaymentForm/PaymentForm'
import styles from './Header.module.css'

const monthsArr = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
]

const Header = ({
  addPaymentHandler,
  months = [],
  selectMonthHandler,
  years = [],
  selectYearHandler
}) => {
  const [isModalOpened, setIsModalOpened] = useState(false)

  return (
    <>
      <button onClick={() => setIsModalOpened(true)}>Добавить</button>
      <select
        name="years"
        onChange={e => {
          selectYearHandler(e.target.value)
        }}
        style={{ margin: '0 1rem' }}
      >
        <option disabled>Выберите год</option>
        {years.map(year => (
          <option value={year} key={year}>
            {year}
          </option>
        ))}
      </select>
      <select
        name="months"
        onChange={e => {
          selectMonthHandler(e.target.value)
        }}
      >
        <option disabled>Выберите месяц</option>
        {months.map(month => (
          <option value={month} key={month}>
            {monthsArr[month]}
          </option>
        ))}
      </select>
      {isModalOpened ? (
        <ModalWindow
          setIsModalOpened={setIsModalOpened}
          title="Добавить оплату"
        >
          <PaymentForm
            addPaymentHandler={addPaymentHandler}
            setIsModalOpened={setIsModalOpened}
          />
        </ModalWindow>
      ) : null}
    </>
  )
}

export default Header
