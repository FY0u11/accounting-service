import React, { MouseEvent } from 'react'
import classNames from 'classnames'
import styles from './Button.module.css'
import { nF } from 'utils'

type ButtonProps = {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  children?: string
  disabled?: boolean
}

const Button = ({ onClick = nF, children = 'button', disabled = false }: ButtonProps) => {
  return (
    <button
      className={classNames({
        [styles.button]: true,
        [styles.disabled]: disabled
      })}
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  )
}

export default Button
