// import styles from './RadioInput.module.css'

import { Types } from '../../../types'

type RadioInputProps = {
  type: string
  value: Types.PaymentTypes
  setType: Types.SetState<Types.PaymentTypes>
  group: string
  id: string
  children: React.ReactNode
}

const RadioInput = ({ type, value, setType, group, id, children, ...rest }: RadioInputProps) => {
  return (
    <p>
      <label htmlFor={id}>
        <input
          name={group}
          type="radio"
          id={id}
          defaultChecked={type === value}
          onChange={() => setType(value)}
          {...rest}
        />
        <span>{children}</span>
      </label>
    </p>
  )
}

export default RadioInput
