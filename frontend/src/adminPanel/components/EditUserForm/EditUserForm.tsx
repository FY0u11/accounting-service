import { useContext, useEffect }                        from 'react'

import { Button, CustomSelect, ModalWindow, TextInput } from 'components'
import { verifyPassword, verifyUsername }               from 'utils'
import { AppContext }                                   from '../../../context/AppContext'
import styles                                           from '../../../pages/admin/Admin.module.css'
import { Types }                                        from '../../../types'

type EditUserFormProps = {
  isEditModalOpened   : boolean
  setIsEditModalOpened: Types.SetState<boolean>
  editedUser          : Types.UserToUpdate
  setEditedUser       : Types.SetState<Types.UserToUpdate>
  confirmEdit         : () => void
}

const EditUserForm = ({
  isEditModalOpened,
  setIsEditModalOpened,
  editedUser,
  setEditedUser,
  confirmEdit
}: EditUserFormProps) => {
  const { state } = useContext(AppContext)

  useEffect(() => {
    if (isEditModalOpened) {
      document.getElementById('usernameInput').focus()
    }
  }, [isEditModalOpened])

  return (
    <ModalWindow
      isModalOpened={isEditModalOpened}
      setIsModalOpened={setIsEditModalOpened}
      title={state.enums.USER_EDITING}
    >
      <form className={styles.edit}>
        <div>
          <label htmlFor="usernameInput">{state.enums.ADD_NEW_USERNAME}:</label>
          <TextInput
            type="text"
            value={editedUser.username}
            onChangeHandler={username => {
              if (!verifyUsername(username)) return
              setEditedUser({ ...editedUser, username })
            }}
            id="usernameInput"
            placeholder={state.enums.USERNAME}
          />
        </div>
        <div>
          <label htmlFor="passwordInput">{state.enums.ADD_NEW_PASSWORD}:</label>
          <TextInput
            type="password"
            value={editedUser.password}
            onChangeHandler={password => {
              if (!verifyPassword(password)) return
              setEditedUser({ ...editedUser, password })
            }}
            id="passwordInput"
            placeholder={state.enums.PASSWORD}
          />
        </div>
        <CustomSelect
          values={['user', 'admin']}
          onChangeHandler={role => setEditedUser({ ...editedUser, role: role as 'user' | 'admin' })}
          selectedValue={editedUser.role}
          title={state.enums.SELECT_NEW_ROLE}
          label={state.enums.UPDATE_ROLE}
        />
        <div>
          <Button onClick={confirmEdit}>{state.enums.UPDATE}</Button>
        </div>
      </form>
    </ModalWindow>
  )
}

export default EditUserForm
