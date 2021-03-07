import styles from '../../../pages/admin/Admin.module.css'
import { Button, CustomSelect, ModalWindow, TextInput } from 'components'
import { Types } from '../../../types'
import { useEffect } from 'react'
import { verifyPassword, verifyUsername } from 'utils'

type EditUserFormProps = {
  isEditModalOpened: boolean
  setIsEditModalOpened: Types.SetState<boolean>
  editedUser: Types.UserToUpdate
  setEditedUser: Types.SetState<Types.UserToUpdate>
  confirmEdit: () => void
}

const EditUserForm = ({
  isEditModalOpened,
  setIsEditModalOpened,
  editedUser,
  setEditedUser,
  confirmEdit
}: EditUserFormProps) => {
  useEffect(() => {
    if (isEditModalOpened) {
      document.getElementById('usernameInput').focus()
    }
  }, [isEditModalOpened])

  return (
    <ModalWindow
      isModalOpened={isEditModalOpened}
      setIsModalOpened={setIsEditModalOpened}
      title="Редактирование данных пользователя"
    >
      <form className={styles.edit}>
        <div>
          <label htmlFor="usernameInput">Введите новое имя пользователя:</label>
          <TextInput
            type="text"
            value={editedUser.username}
            onChangeHandler={username => {
              if (!verifyUsername(username)) return
              setEditedUser({ ...editedUser, username })
            }}
            id="usernameInput"
            placeholder="Имя пользователя"
          />
        </div>
        <div>
          <label htmlFor="passwordInput">Введите новый пароль:</label>
          <TextInput
            type="password"
            value={editedUser.password}
            onChangeHandler={password => {
              if (!verifyPassword(password)) return
              setEditedUser({ ...editedUser, password })
            }}
            id="passwordInput"
            placeholder="Пароль"
          />
        </div>
        <CustomSelect
          values={['user', 'admin']}
          onChangeHandler={role => setEditedUser({ ...editedUser, role: role as 'user' | 'admin' })}
          selectedValue={editedUser.role}
          title="Выберите роль пользователя"
          label="Изменить роль:"
        />
        <div>
          <Button onClick={confirmEdit} disabled={!editedUser.username?.trim() || !editedUser.password?.trim()}>
            Изменить
          </Button>
        </div>
      </form>
    </ModalWindow>
  )
}

export default EditUserForm
