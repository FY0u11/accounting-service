import styles from './TextInput.module.css'
import { nF } from 'utils'

type TextInputProps = {
  value?: string
  onChangeHandler?: (value: string) => void
  [prop: string]: unknown
}

const TextInput = ({ value = '', onChangeHandler = nF, ...props }: TextInputProps) => {
  return (
    <input
      type="text"
      value={value}
      className={styles.input}
      onChange={e => onChangeHandler(e.target.value)}
      {...props}
    />
  )
}

export default TextInput
