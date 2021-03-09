import { useContext, useEffect, useState } from 'react'

import { Button, RadioInput, TextInput }   from 'components'
import { verifyPayment }                   from 'utils'
import styles                              from './EditPaymentForm.module.css'
import { AppContext }                      from '../../context/AppContext'
import { useUpdatePayment }                from '../../hooks/useUpdatePayment'
import { Types }                           from '../../types'

type EditPaymentFormProps = { selectedPayment : Types.Payment; setIsModalOpened: Types.SetState<boolean> }

const EditPaymentForm = ({ selectedPayment, setIsModalOpened }: EditPaymentFormProps) => {
  const { state }                                   = useContext(AppContext)
  const [inputEl, setInputEl]                       = useState(null)
  const { updatePayment, form, setForm, isLoading } = useUpdatePayment(selectedPayment)

  const updateHandler = async () => {
    await updatePayment()
    setIsModalOpened(false)
  }

  useEffect(() => {
    const inputEl = document.getElementById('editPaymentForm')
    setInputEl(inputEl)
    inputEl.focus()
  }, [])

  return (
    <form className={styles.container}>
      <div>
        <TextInput
          value={'' + form.value}
          onChangeHandler={v => {
            if (!verifyPayment(v)) return
            setForm({ ...form, value: +v })
          }}
          placeholder={state.enums.INPUT_PAYMENT}
          id="editPaymentForm"
        />
        {state.ptypes.map(ptype => (
          <RadioInput
            group="Payment types"
            id={ptype._id}
            onChangeHandler={() => {
              inputEl.focus()
              setForm({ ...form, ptype: ptype._id })
            }}
            isChecked={selectedPayment.ptype._id === ptype._id}
            key={ptype._id}
          >
            {ptype.name}
          </RadioInput>
        ))}
      </div>
      <Button onClick={updateHandler} disabled={!verifyPayment('' + form.value) || isLoading || !form.value}>
        {state.enums.READY}
      </Button>
    </form>
  )
}

export default EditPaymentForm
