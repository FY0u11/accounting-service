import styles from './CustomSelect.module.css'

import { useLanguage } from 'hooks'
import { nF } from 'utils'

type CustomSelectProps = {
  onChangeHandler?: (value: string) => void
  values?: string[]
  selectedValue?: string
  title?: string
  isForMonths?: boolean
}

const CustomSelect = ({
  onChangeHandler = nF,
  values = [],
  selectedValue = '',
  title = 'default',
  isForMonths = false
}: CustomSelectProps) => {
  const { lang } = useLanguage()
  const months = [
    lang.MONTHS_JAN,
    lang.MONTHS_FEB,
    lang.MONTHS_MAR,
    lang.MONTHS_APR,
    lang.MONTHS_MAY,
    lang.MONTHS_JUN,
    lang.MONTHS_JUL,
    lang.MONTHS_AUG,
    lang.MONTHS_SEP,
    lang.MONTHS_OCT,
    lang.MONTHS_NOV,
    lang.MONTHS_DEC
  ]

  return (
    <>
      <select onChange={e => onChangeHandler(e.target.value)} className={styles.select} value={selectedValue}>
        <option disabled>{title}</option>
        {values.map(value => (
          <option value={value} key={value}>
            {isForMonths ? months[+value - 1] : value}
          </option>
        ))}
      </select>
    </>
  )
}

export default CustomSelect
