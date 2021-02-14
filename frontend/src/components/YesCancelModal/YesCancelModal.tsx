import { useLanguage } from '../../hooks/useLanguage'
import { Types } from '../../types'
import styles from './YesCancelModal.module.css'
import { Button, ModalWindow } from 'components'
import { nF } from 'utils'

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
  const { lang } = useLanguage()
  return (
    <ModalWindow isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} title={title}>
      <div className={styles.container}>
        <Button onClick={yesClickHandler}>{lang.YES}</Button>
        <Button onClick={() => setIsModalOpened(false)}>{lang.CANCEL}</Button>
      </div>
    </ModalWindow>
  )
}

export default YesCancelModal
