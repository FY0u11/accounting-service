import React, { MouseEvent } from 'react'
import classNames from 'classnames'
import { nF } from 'utils'
import styles from './Button.module.css'

type ButtonProps = {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
  disabled?: boolean
  [key: string]: unknown
}

const Button = ({ onClick = nF, children = 'button', disabled = false, ...props }: ButtonProps) => {
  return (
    <button
      className={classNames({
        disabled: disabled,
        btn: true,
        'grey darken-4': true,
        [styles.container]: true
      })}
      onClick={e => {
        e.preventDefault()
        onClick(e)
      }}
      {...props}
    >
      <span>{children}</span>
    </button>
  )
}

export default Button
