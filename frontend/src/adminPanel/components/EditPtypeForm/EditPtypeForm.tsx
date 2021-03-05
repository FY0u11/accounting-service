import styles from '../../../pages/admin/Admin.module.css'
import { Button, ModalWindow, TextInput } from 'components'
import { Types } from '../../../types'
import { useEffect } from 'react'

type EditPtypeFormProps = {
  isEditModalOpened: boolean
  setIsEditModalOpened: Types.SetState<boolean>
  editedPtype: Types.PtypeToUpdate
  setEditedPtype: Types.SetState<Types.PtypeToUpdate>
  confirmEdit: () => void
}

const EditPtypeForm = ({
  isEditModalOpened,
  setIsEditModalOpened,
  editedPtype,
  setEditedPtype,
  confirmEdit
}: EditPtypeFormProps) => {
  useEffect(() => {
    if (isEditModalOpened) {
      document.getElementById('updatePtypeNameForm').focus()
    }
  }, [isEditModalOpened])

  return (
    <ModalWindow
      isModalOpened={isEditModalOpened}
      setIsModalOpened={setIsEditModalOpened}
      title="Изменить наименование платежей"
    >
      <form className={styles.edit}>
        <div>
          <label htmlFor="updatePtypeNameForm">Введите новое название платежей:</label>
          <TextInput
            type="text"
            value={editedPtype.name}
            onChangeHandler={name => setEditedPtype({ ...editedPtype, name })}
            id="updatePtypeNameForm"
            placeholder="Название платежей"
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Button onClick={confirmEdit} disabled={!editedPtype.name.trim()}>
            Изменить
          </Button>
        </div>
      </form>
    </ModalWindow>
  )
}

export default EditPtypeForm
