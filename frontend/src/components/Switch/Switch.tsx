import styles from './Switch.module.css'
import classNames from 'classnames'

type SwitchProps = {
  yes: string
  no: string
  checked: boolean
  checkHandler: () => void
}

const Switch = ({ no, yes, checked, checkHandler }: SwitchProps) => {
  return (
    <span className={classNames('switch', styles.container)}>
      <label>
        {no}
        <input type="checkbox" checked={checked} onChange={checkHandler} />
        <span className="lever" />
        {yes}
      </label>
    </span>
  )
}

export default Switch
