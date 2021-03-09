import { useContext, useEffect, useState } from 'react'

import { Button, RadioInput, TextInput }   from 'components'
import { useCreatePayment }                from 'hooks'
import { verifyPayment }                   from 'utils'
import styles                              from './PaymentForm.module.css'
import { AppContext }                      from '../../context/AppContext'

const PaymentForm = () => {
  const { state }                 = useContext(AppContext)
  const [ptype, setPtype]         = useState(state.ptypes[0]._id)
  const [value, setValue]         = useState('')
  const [inputEl, setInputEl]     = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { createPayment }         = useCreatePayment(setIsLoading)

  useEffect(() => {
    const inputEl = document.getElementById('addPaymentForm')
    setInputEl(inputEl)
    inputEl.focus()
  }, [])

  const onClickHandler = async () => {
    inputEl.focus()
    await createPayment({ value: +value, ptype })
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
      </div>
      <Button onClick={onClickHandler} disabled={!verifyPayment(value) || isLoading || !value}>
        {state.enums.ADD_PAYMENT}
      </Button>
    </form>
  )
}

export default PaymentForm
