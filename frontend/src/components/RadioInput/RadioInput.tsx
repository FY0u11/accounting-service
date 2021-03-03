import React from 'react'
import { nF } from 'utils'
import styles from './RadioInput.module.css'

type RadioInputProps = {
  onChangeHandler?: () => void
  group?: string
  id: string
  children?: React.ReactNode
  isChecked?: boolean
}

const RadioInput = ({
  onChangeHandler = nF,
  group = 'default',
  id,
  children = null,
  isChecked = false
}: RadioInputProps) => {
  return (
    <p>
      <label htmlFor={id}>
        <input
          name={group}
          type="radio"
          id={id}
          defaultChecked={isChecked}
          onChange={onChangeHandler}
          className={styles.input}
        />
        <span className={styles.value}>{children}</span>
      </label>
    </p>
  )
}

export default RadioInput
