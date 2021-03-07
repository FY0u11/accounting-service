import { MouseEvent, useContext, useEffect, useState } from 'react'
import { useAddPaymentHandler, useLanguage } from 'hooks'
import styles from './PaymentForm.module.css'
import { Button, RadioInput, TextInput } from 'components'
import { AppContext } from '../../context/AppContext'
import { verifyPayment } from 'utils'

const PaymentForm = () => {
  const { state } = useContext(AppContext)
  const [ptype, setPtype] = useState(state.ptypes[0]._id)
  const [value, setValue] = useState('')
  const [inputEl, setInputEl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { lang } = useLanguage()
  const addPaymentHandler = useAddPaymentHandler()

  useEffect(() => {
    const inputEl = document.getElementById('addPaymentForm')
    setInputEl(inputEl)
    inputEl.focus()
  }, [])

  const onClickHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!verifyPayment(value)) return
    if (!value) return
    setValue('')
    try {
      setIsLoading(true)
      inputEl.focus()
      await addPaymentHandler({ value: +value, ptype })
      setIsLoading(false)
    } catch (e) {
      console.log(e.message)
    }
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
          placeholder={lang.INPUT_PAYMENT}
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
      </div>
      <Button onClick={onClickHandler} disabled={!verifyPayment(value) || isLoading || !value}>
        {lang.ADD_PAYMENT}
      </Button>
    </form>
  )
}

export default PaymentForm
