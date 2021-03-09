import React, { useEffect } from 'react'
import { Close }            from '@material-ui/icons'

import { nF }               from 'utils'
import styles               from './ModalWindow.module.css'
import { Types }            from '../../types'

type ModalWindowProps = { isModalOpened?: boolean; setIsModalOpened?: Types.SetState<boolean>; title?: string; children?: React.ReactNode }

const ModalWindow = ({ isModalOpened = false, setIsModalOpened = nF, title = 'default title', children = null }: ModalWindowProps) => {
  useEffect(() => {
    if (!isModalOpened) return
    document.getElementById('modal_window').addEventListener('keydown', e => {
      if (e.key === 'Escape') setIsModalOpened(false)
    })
  }, [isModalOpened])

  return (
    <>
      {isModalOpened ? (
        <div
          className={styles.container}
          onClick={e => {
            const el = document.getElementsByClassName(styles.container)[0]
            if (el === e.target) setIsModalOpened(false)
          }}
          id="modal_window"
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
