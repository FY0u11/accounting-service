import styles from './Button.module.css'

const Button = ({ onClick, children, disabled = false }) => {
  return (
    <button
      className={styles.button + (disabled ? ' ' + styles.disabled : '')}
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  )
}

export default Button
