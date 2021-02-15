import { MouseEvent, useState } from 'react'
import { useEditPaymentHandler, useLanguage } from 'hooks'
import { Types } from '../../types'
import styles from './EditPaymentForm.module.css'
import { Button, RadioInput, TextInput } from 'components'

const EditPaymentForm = ({
  selectedPayment,
  setIsModalOpened
}: {
  selectedPayment: Types.Payment
  setIsModalOpened: Types.SetState<boolean>
}) => {
  const [type, setType] = useState(selectedPayment.type)
  const [value, setValue] = useState('' + selectedPayment.value)
  const { lang } = useLanguage()
  const editPaymentHandler = useEditPaymentHandler()

  const editHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (isNaN(+value) || +value <= 0 || +value > 10e7 || value.length > 9) return
    setValue('')
    setIsModalOpened(false)
    try {
      editPaymentHandler(selectedPayment._id, { value: +value, type })
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <form className={styles.container}>
      <div>
        <TextInput value={value} onChangeHandler={setValue} placeholder={lang.INPUT_PAYMENT} />
        <RadioInput
          group="Payment types"
          id="1"
          onChangeHandler={() => setType('cash')}
          isChecked={selectedPayment.type === 'cash'}
        >
          {lang.CASH}
        </RadioInput>
        <RadioInput
          group="Payment types"
          id="2"
          onChangeHandler={() => setType('bank')}
          isChecked={selectedPayment.type === 'bank'}
        >
          {lang.BANK}
        </RadioInput>
        <RadioInput
          group="Payment types"
          id="3"
          onChangeHandler={() => setType('card')}
          isChecked={selectedPayment.type === 'card'}
        >
          {lang.CARD}
        </RadioInput>
        <RadioInput
          group="Payment types"
          id="4"
          onChangeHandler={() => setType('kaspi')}
          isChecked={selectedPayment.type === 'kaspi'}
        >
          {lang.KASPI}
        </RadioInput>
      </div>
      <Button onClick={editHandler} disabled={isNaN(+value) || +value <= 0 || +value > 10e7 || value.length > 9}>
        {lang.READY}
      </Button>
    </form>
  )
}

export default EditPaymentForm
