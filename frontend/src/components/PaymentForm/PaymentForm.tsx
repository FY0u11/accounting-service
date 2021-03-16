import moment                              from 'moment'
import { useContext, useEffect, useState } from 'react'

import { Button, RadioInput, TextInput }   from 'components'
import { useCreatePayment }                from 'hooks'
import { verifyPayment }                   from 'utils'
import styles                              from './PaymentForm.module.css'
import { AppContext }                      from '../../context/AppContext'
import { Types }                           from '../../types'

const PaymentForm = () => {
  const { state }                         = useContext(AppContext)
  const [ptype, setPtype]                 = useState(state.ptypes[0]._id)
  const [value, setValue]                 = useState('')
  const [inputEl, setInputEl]             = useState(null)
  const [isLoading, setIsLoading]         = useState(false)
  const [isForPastDate, setIsForPastDate] = useState(false)
  const [selectedDate, setSelectedDate]   = useState<Date>(null)
  const { createPayment }                 = useCreatePayment(setIsLoading)

  useEffect(() => {
    const inputEl = document.getElementById('addPaymentForm')
    setInputEl(inputEl)
    inputEl.focus()
  }, [])

  useEffect(() => {
    if (!isForPastDate) return
    const datePicker = document.querySelector('.datepicker')
    M.Datepicker.init(datePicker, {
      format: 'dd.mm.yyyy',
      firstDay: 1,
      minDate: moment().subtract(1, 'month').toDate(),
      maxDate: moment().subtract(1, 'day').toDate(),
      i18n: {
        cancel: state.enums.CANCEL,
        done: state.enums.READY,
        months: [
          state.enums.MONTHS_JAN,
          state.enums.MONTHS_FEB,
          state.enums.MONTHS_MAR,
          state.enums.MONTHS_APR,
          state.enums.MONTHS_MAY,
          state.enums.MONTHS_JUN,
          state.enums.MONTHS_JUL,
          state.enums.MONTHS_AUG,
          state.enums.MONTHS_SEP,
          state.enums.MONTHS_OCT,
          state.enums.MONTHS_NOV,
          state.enums.MONTHS_DEC,
        ],
        monthsShort: [
          state.enums.MONTHS_SHORT_JAN,
          state.enums.MONTHS_SHORT_FEB,
          state.enums.MONTHS_SHORT_MAR,
          state.enums.MONTHS_SHORT_APR,
          state.enums.MONTHS_SHORT_MAY,
          state.enums.MONTHS_SHORT_JUN,
          state.enums.MONTHS_SHORT_JUL,
          state.enums.MONTHS_SHORT_AUG,
          state.enums.MONTHS_SHORT_SEP,
          state.enums.MONTHS_SHORT_OCT,
          state.enums.MONTHS_SHORT_NOV,
          state.enums.MONTHS_SHORT_DEC,
        ],
        weekdays: [
          state.enums.DAYS_SUNDAY,
          state.enums.DAYS_MONDAY,
          state.enums.DAYS_TUESDAY,
          state.enums.DAYS_WEDNESDAY,
          state.enums.DAYS_THURSDAY,
          state.enums.DAYS_FRIDAY,
          state.enums.DAYS_SATURDAY
        ],
        weekdaysShort: [
          state.enums.SUNDAY,
          state.enums.MONDAY,
          state.enums.TUESDAY,
          state.enums.WEDNESDAY,
          state.enums.THURSDAY,
          state.enums.FRIDAY,
          state.enums.SATURDAY
        ],
        weekdaysAbbrev: [
          state.enums.DAYS_ABBR_SUNDAY,
          state.enums.DAYS_ABBR_MONDAY,
          state.enums.DAYS_ABBR_TUESDAY,
          state.enums.DAYS_ABBR_WEDNESDAY,
          state.enums.DAYS_ABBR_THURSDAY,
          state.enums.DAYS_ABBR_FRIDAY,
          state.enums.DAYS_ABBR_SATURDAY
        ]
      },
      onSelect(date) {
        setSelectedDate(date)
      }
    })
  }, [isForPastDate])

  const onClickHandler = async () => {
    inputEl.focus()
    const payment: Types.PaymentForCreate = { value: +value, ptype }
    if (isForPastDate && selectedDate !== null) payment.time = selectedDate
    await createPayment(payment)
    setValue('')
  }

  return (
    <form className={styles.container}>
      <div>
        <TextInput
          value={value}
          onChangeHandler={v => {
            if (!verifyPayment(v)) return
            setValue(v)
          }}
          placeholder={state.enums.INPUT_PAYMENT}
          id="addPaymentForm"
        />
        {state.ptypes.map((ptype, i) => {
          return (
            <RadioInput
              group="ptypes"
              id={ptype._id}
              onChangeHandler={() => {
                inputEl.focus()
                setPtype(ptype._id)
              }}
              isChecked={i === 0}
              key={ptype._id}
            >
              <span>{ptype.name}</span>
            </RadioInput>
          )
        })}
        <hr />
        <p>
          <label htmlFor="checkbox-past-date">
            <input id="checkbox-past-date" type="checkbox" checked={isForPastDate} onChange={() => setIsForPastDate(!isForPastDate)} />
            <span>{state.enums.FOR_PAST_DATE}</span>
          </label>
        </p>
        { isForPastDate ?
          <input type="text" className="datepicker" placeholder={state.enums.SPECIFY_DATE} />
        : null}
      </div>
      <Button onClick={onClickHandler} disabled={!verifyPayment(value) || isLoading || !value}>
        {state.enums.ADD_PAYMENT}
      </Button>
    </form>
  )
}

export default PaymentForm
