import { useContext, useEffect, useState } from 'react'

import { ModalWindow, TextInput } from 'components'
import { getIcon, icons }         from 'utils'
import { AppContext } from '../../../context/AppContext'
import styles                     from './IconSelectingForm.module.css'
import { Types }                  from '../../../types'

type IconSelectingFormProps = {
  isModalOpened   : boolean
  setIsModalOpened: Types.SetState<boolean>
  confirmIcon     : (icon: string) => void
}

const IconSelectingForm = ({ isModalOpened, setIsModalOpened, confirmIcon }: IconSelectingFormProps) => {
  const { state }                         = useContext(AppContext)
  const [selectedIcons, setSelectedIcons] = useState(icons)
  const [filter, setFilter]               = useState('')

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
    <ModalWindow isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} title={state.enums.ICON_SELECTING}>
      <div id={styles.wrapper}>
        <TextInput
          value={filter}
          onChangeHandler={v => {
            if (!/^\w{0,30}$/.test(v)) return
            setFilter(v)
          }}
          placeholder={state.enums.INPUT_KEYWORD_TO_SEARCH}
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
