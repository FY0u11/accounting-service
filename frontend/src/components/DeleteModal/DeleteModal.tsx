import { useLanguage } from '../../hooks/useLanguage'
import Button from '../Button/Button'
import ModalWindow from '../ModalWindow/ModalWindow'
import styles from './DeleteModal.module.css'

const DeleteModal = ({ isModalOpened, setIsModalOpened, deleteHandler }) => {
  const { lang } = useLanguage()
  return (
    <>
      {isModalOpened ? (
        <ModalWindow
          setIsModalOpened={setIsModalOpened}
          title={lang.CONFIRM_DELETE}
        >
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
