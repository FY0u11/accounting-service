import React, { MouseEvent } from 'react'
import classNames from 'classnames'
import { nF } from 'utils'

type ButtonProps = {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
  disabled?: boolean
}

const Button = ({ onClick = nF, children = 'button', disabled = false }: ButtonProps) => {
  return (
    <button
      className={classNames({
        disabled: disabled,
        btn: true,
        'grey darken-4': true
      })}
      onClick={e => {
        e.preventDefault()
        onClick(e)
      }}
    >
      <span>{children}</span>
    </button>
  )
}

export default Button
