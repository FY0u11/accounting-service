import styles from './ModalWindow.module.css'
import { Close } from '@material-ui/icons'
import { Types } from '../../types'
import React from 'react'
import { nF } from 'utils'

type ModalWindowProps = {
  isModalOpened?: boolean
  setIsModalOpened?: Types.SetState<boolean>
  title?: string
  children?: React.ReactNode
}

const ModalWindow = ({
  isModalOpened = false,
  setIsModalOpened = nF,
  title = 'default title',
  children = null
}: ModalWindowProps) => {
  return (
    <>
      {isModalOpened ? (
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
      ) : null}
    </>
  )
}

export default ModalWindow
