import { useLanguage } from 'hooks'
import { Types } from '../../types'
import styles from './YesCancelModal.module.css'
import { Button, ModalWindow } from 'components'
import { nF } from 'utils'
import { useEffect } from 'react'

type YesCancelModalProps = {
  isModalOpened?: boolean
  setIsModalOpened?: Types.SetState<boolean>
  yesClickHandler?: () => void
  noClickHandler?: () => void
  title?: string
}

const YesCancelModal = ({
  title = 'Default',
  isModalOpened = false,
  setIsModalOpened = nF,
  yesClickHandler = nF
}: YesCancelModalProps) => {
  useEffect(() => {
    if (!isModalOpened) return
    document.getElementById('no_button').focus()
  }, [isModalOpened])
  const { lang } = useLanguage()
  return (
    <ModalWindow isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} title={title}>
      <div className={styles.container}>
        <Button onClick={yesClickHandler}>{lang.YES}</Button>
        <Button onClick={() => setIsModalOpened(false)} id="no_button">
          {lang.CANCEL}
        </Button>
      </div>
    </ModalWindow>
  )
}

export default YesCancelModal
