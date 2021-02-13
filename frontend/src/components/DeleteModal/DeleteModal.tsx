import { useLanguage } from '../../hooks/useLanguage'
import { Types } from '../../types'
import Button from '../Button/Button'
import ModalWindow from '../ModalWindow/ModalWindow'
import styles from './DeleteModal.module.css'

type DeleteModalProps = {
  isModalOpened: boolean
  setIsModalOpened: Types.SetState<boolean>
  deleteHandler: () => void
}

const DeleteModal = ({ isModalOpened, setIsModalOpened, deleteHandler }: DeleteModalProps) => {
  const { lang } = useLanguage()
  return (
    <>
      {isModalOpened ? (
        <ModalWindow setIsModalOpened={setIsModalOpened} title={lang.CONFIRM_DELETE}>
          <div className={styles.delete_modal}>
            <Button onClick={deleteHandler}>{lang.YES}</Button>
            <Button onClick={() => setIsModalOpened(false)}>{lang.NO}</Button>
          </div>
        </ModalWindow>
      ) : null}
    </>
  )
}

export default DeleteModal
