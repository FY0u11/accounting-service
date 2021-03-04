import styles from './IconSelectingForm.module.css'
import { ModalWindow, TextInput } from 'components'
import { Types } from '../../../types'
import { getIcon, icons } from 'utils'
import { useEffect, useState } from 'react'

type IconSelectingFormProps = {
  isModalOpened: boolean
  setIsModalOpened: Types.SetState<boolean>
  confirmIcon: (icon: string) => void
}

const IconSelectingForm = ({ isModalOpened, setIsModalOpened, confirmIcon }: IconSelectingFormProps) => {
  const [selectedIcons, setSelectedIcons] = useState(icons)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const regex = new RegExp(`${filter}`, 'i')
    setSelectedIcons([...icons].filter(icon => regex.test(icon)))
  }, [filter])

  return (
    <ModalWindow isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} title="Выбор иконки">
      <TextInput value={filter} onChangeHandler={setFilter} placeholder="Введите ключевое слово для поиска" />
      <div className={styles.container}>
        {selectedIcons.map(icon => {
          return (
            <div key={icon} onClick={() => confirmIcon(icon)} className={styles.icon}>
              {getIcon(icon)()}
            </div>
          )
        })}
      </div>
    </ModalWindow>
  )
}

export default IconSelectingForm
