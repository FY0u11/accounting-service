import styles from './RadioInput.module.css'

const RadioInput = ({ type, value, setType, group, id, children, ...rest }) => {
  return (
    <p>
      <label htmlFor={id}>
        <input
          name={group}
          type="radio"
          id={id}
          defaultChecked={type === value}
          onChange={() => setType(value)}
          {...rest}
        />
        <span>{children}</span>
      </label>
    </p>
  )
}

export default RadioInput
