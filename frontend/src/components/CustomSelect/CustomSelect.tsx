import { nF } from 'utils'
import { useEffect } from 'react'

type CustomSelectProps = {
  onChangeHandler?: (value: string) => void
  values?: string[]
  selectedValue?: string
  title?: string
}

const CustomSelect = ({
  onChangeHandler = nF,
  values = [],
  selectedValue = '',
  title = 'default'
}: CustomSelectProps) => {
  useEffect(() => {
    M.FormSelect.init(document.querySelectorAll('select'))
  }, [values, values])

  return (
    <>
      <div className="input-field">
        <select onChange={e => onChangeHandler(e.target.value)}>
          <option value="" disabled>
            {title}
          </option>
          {values.map(value => (
            <option value={value} key={value} selected={selectedValue === value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default CustomSelect
