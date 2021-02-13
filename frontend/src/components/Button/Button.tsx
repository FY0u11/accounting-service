import { MouseEvent } from 'react'
import styles from './Button.module.css'

type ButtonProps = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  disabled?: boolean
}

const Button = ({ onClick, children, disabled = false }: ButtonProps) => {
  return (
    <button className={styles.button + (disabled ? ' ' + styles.disabled : '')} onClick={onClick}>
      <span>{children}</span>
    </button>
  )
}

export default Button
