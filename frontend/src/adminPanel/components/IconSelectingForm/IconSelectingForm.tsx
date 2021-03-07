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
    if (!isModalOpened) return
    const input = document.getElementById('iconSearchInput')
    input.focus()
  }, [isModalOpened])

  useEffect(() => {
    const regex = new RegExp(filter, 'i')
    setSelectedIcons([...icons].filter(icon => icon.match(regex)))
  }, [filter])

  return (
    <ModalWindow isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} title="Выбор иконки">
      <div id={styles.wrapper}>
        <TextInput
          value={filter}
          onChangeHandler={v => {
            if (!/^\w{0,30}$/.test(v)) return
            setFilter(v)
          }}
          placeholder="Введите ключевое слово для поиска"
          id="iconSearchInput"
        />
        <div className={styles.container}>
          {selectedIcons.map(icon => {
            return (
              <div key={icon} onClick={() => confirmIcon(icon)} className={styles.icon}>
                {getIcon(icon)()}
              </div>
            )
          })}
        </div>
      </div>
    </ModalWindow>
  )
}

export default IconSelectingForm
