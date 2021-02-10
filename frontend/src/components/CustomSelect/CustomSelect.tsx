import styles from './CustomSelect.module.css'

const CustomSelect = ({ onChangeHandler, values, selectedValue, title }) => {
  return (
    <>
      {selectedValue ? (
        <select
          name={title}
          onChange={e => {
            onChangeHandler(e.target.value)
          }}
          style={{ margin: '0 1rem' }}
          defaultValue={selectedValue}
        >
          <option disabled>{title}</option>
          {values.map(value => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      ) : null}
    </>
  )
}

export default CustomSelect
