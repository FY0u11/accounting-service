import { useContext, useEffect } from 'react'

import { Button, ModalWindow }   from 'components'
import { nF }                    from 'utils'
import styles                    from './YesCancelModal.module.css'
import { AppContext }            from '../../context/AppContext'
import { Types }                 from '../../types'

type YesCancelModalProps = {
  isModalOpened?   : boolean
  setIsModalOpened?: Types.SetState<boolean>
  yesClickHandler? : () => void
  noClickHandler?  : () => void
  title?           : string
}

const YesCancelModal = ({
  title            = 'Default',
  isModalOpened    = false,
  setIsModalOpened = nF,
  yesClickHandler  = nF
}: YesCancelModalProps) => {
  const { state } = useContext(AppContext)

  useEffect(() => {
    if (!isModalOpened) return
    document.getElementById('no_button').focus()
  }, [isModalOpened])

  return (
    <ModalWindow isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} title={title}>
      <div className={styles.container}>
        <Button onClick={yesClickHandler}>{state.enums.YES}</Button>
        <Button onClick={() => setIsModalOpened(false)} id="no_button">
          {state.enums.CANCEL}
        </Button>
      </div>
    </ModalWindow>
  )
}

export default YesCancelModal
