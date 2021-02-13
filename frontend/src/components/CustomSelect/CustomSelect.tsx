// import styles from './CustomSelect.module.css'

import { useLanguage } from '../../hooks/useLanguage'

type CustomSelectProps = {
  onChangeHandler: (value: string) => void
  values: string[]
  selectedValue: string
  title: string
  isForMonths?: boolean
}

const CustomSelect = ({ onChangeHandler, values, selectedValue, title, isForMonths = false }: CustomSelectProps) => {
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
      {selectedValue ? (
        <select
          name={title}
          onChange={e => {
            onChangeHandler(e.target.value)
          }}
          style={{ margin: '0 1rem' }}
          value={selectedValue}
        >
          <option disabled>{title}</option>
          {values.map(value => (
            <option value={value} key={value}>
              {isForMonths ? months[+value - 1] : value}
            </option>
          ))}
        </select>
      ) : null}
    </>
  )
}

export default CustomSelect
