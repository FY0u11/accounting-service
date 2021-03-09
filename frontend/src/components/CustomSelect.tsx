import { useEffect } from 'react'

import { nF }        from 'utils'

type CustomSelectProps = {
  onChangeHandler?: (value: string) => void
  values?         : string[]
  selectedValue?  : string
  title?          : string
  label?          : string
}

const CustomSelect = ({
  onChangeHandler = nF,
  values          = [],
  selectedValue   = '',
  title           = 'default',
  label
}: CustomSelectProps) => {
  useEffect(() => {
    M.FormSelect.init(document.querySelectorAll('select'))
  }, [values, values])

  return (
    <div className="input-field">
      <select onChange={e => onChangeHandler(e.target.value)} id={values.join()} value={selectedValue}>
        <option value="" disabled>
          {title}
        </option>
        {values.map(value => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
      <label>{label}</label>
    </div>
  )
}

export default CustomSelect
