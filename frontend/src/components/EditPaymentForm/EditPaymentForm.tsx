import { MouseEvent, useContext, useEffect, useState } from 'react'
import { useEditPaymentHandler, useLanguage } from 'hooks'
import { Types } from '../../types'
import styles from './EditPaymentForm.module.css'
import { Button, RadioInput, TextInput } from 'components'
import { AppContext } from '../../context/AppContext'

const EditPaymentForm = ({
  selectedPayment,
  setIsModalOpened
}: {
  selectedPayment: Types.Payment
  setIsModalOpened: Types.SetState<boolean>
}) => {
  const [ptypeId, setPtypeId] = useState(selectedPayment.ptype._id)
  const [value, setValue] = useState('' + selectedPayment.value)
  const [inputEl, setInputEl] = useState(null)
  const { lang } = useLanguage()
  const { state } = useContext(AppContext)
  const editPaymentHandler = useEditPaymentHandler()

  const editHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (isNaN(+value) || +value <= -10e7 || +value > 10e7 || value.length > 9) return
    setValue('')
    setIsModalOpened(false)
    try {
      editPaymentHandler(selectedPayment._id, { value: +value, ptype: ptypeId })
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    const inputEl = document.getElementById('editPaymentForm')
    setInputEl(inputEl)
    inputEl.focus()
  }, [])

  return (
    <form className={styles.container}>
      <div>
        <TextInput value={value} onChangeHandler={setValue} placeholder={lang.INPUT_PAYMENT} id="editPaymentForm" />
        {state.ptypes.map(ptype => (
          <RadioInput
            group="Payment types"
            id={ptype._id}
            onChangeHandler={() => {
              inputEl.focus()
              setPtypeId(ptype._id)
            }}
            isChecked={selectedPayment.ptype._id === ptype._id}
            key={ptype._id}
          >
            {ptype.name}
          </RadioInput>
        ))}
      </div>
      <Button onClick={editHandler} disabled={isNaN(+value) || +value <= -10e7 || +value > 10e7 || value.length > 9}>
        {lang.READY}
      </Button>
    </form>
  )
}

export default EditPaymentForm
