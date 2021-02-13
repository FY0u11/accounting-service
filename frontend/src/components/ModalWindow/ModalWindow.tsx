import styles from './ModalWindow.module.css'
import { Close } from '@material-ui/icons'
import { Types } from '../../types'

type ModalWindowProps = {
  setIsModalOpened: Types.SetState<boolean>
  title: string
  children: React.ReactNode
}

const ModalWindow = ({ setIsModalOpened, title, children }: ModalWindowProps) => {
  return (
    <div
      className={styles.container}
      onClick={e => {
        const el = document.getElementsByClassName(styles.container)[0]
        if (el === e.target) setIsModalOpened(false)
      }}
    >
      <div className={styles.inner_container}>
        <div className={styles.header}>
          <div className={styles.header_title}>{title}</div>
          <div className={styles.close} onClick={() => setIsModalOpened(false)}>
            <Close />
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default ModalWindow
