import classNames            from 'classnames'
import React, { MouseEvent } from 'react'

import { nF }                from 'utils'

type ButtonProps = {
  onClick?     : (e: MouseEvent<HTMLButtonElement>) => void
  children?    : React.ReactNode
  disabled?    : boolean
  [key: string]: unknown
}

const Button = ({ onClick = nF, children = 'button', disabled = false, ...props }: ButtonProps) => {
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
      {...props}
    >
      <span>{children}</span>
    </button>
  )
}

export default Button
