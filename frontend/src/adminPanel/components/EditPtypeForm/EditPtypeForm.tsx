import { useContext, useEffect }          from 'react'

import { Button, ModalWindow, TextInput } from 'components'
import { AppContext }                     from '../../../context/AppContext'
import styles                             from '../../../pages/admin/Admin.module.css'
import { Types }                          from '../../../types'

type EditPtypeFormProps = {
  isEditModalOpened   : boolean
  setIsEditModalOpened: Types.SetState<boolean>
  editedPtype         : Types.PtypeToUpdate
  setEditedPtype      : Types.SetState<Types.PtypeToUpdate>
  confirmEdit         : () => void
}

const EditPtypeForm = ({
  isEditModalOpened,
  setIsEditModalOpened,
  editedPtype,
  setEditedPtype,
  confirmEdit
}: EditPtypeFormProps) => {
  const { state } = useContext(AppContext)

  useEffect(() => {
    if (isEditModalOpened) {
      document.getElementById('updatePtypeNameForm').focus()
    }
  }, [isEditModalOpened])

  return (
    <ModalWindow
      isModalOpened={isEditModalOpened}
      setIsModalOpened={setIsEditModalOpened}
      title={state.enums.CHANGE_PAYMENT_TYPE_NAME}
    >
      <form className={styles.edit}>
        <div>
          <label htmlFor="updatePtypeNameForm">{state.enums.ADD_NEW_PAYMENT_TYPE_NAME}:</label>
          <TextInput
            type="text"
            value={editedPtype.name}
            onChangeHandler={name => setEditedPtype({ ...editedPtype, name })}
            id="updatePtypeNameForm"
            placeholder={state.enums.PAYMENT_TYPE}
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Button onClick={confirmEdit} disabled={!editedPtype.name.trim()}>
            {state.enums.UPDATE}
          </Button>
        </div>
      </form>
    </ModalWindow>
  )
}

export default EditPtypeForm
