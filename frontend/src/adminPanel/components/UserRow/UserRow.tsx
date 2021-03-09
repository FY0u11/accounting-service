import { Delete, Edit } from '@material-ui/icons'

import styles           from './UserRow.module.css'
import { Types }        from '../../../types'

type UserRowProps = { user: Types.AdminUser; deleteUserHandler: (id: string) => void; editUserHandler: () => void }

const UserRow = ({ user, deleteUserHandler, editUserHandler }: UserRowProps) => {
  return (
    <tr>
      <td>{user.username}</td>
      <td>{user.role}</td>
      <td>
        <div className={styles.center}>
          <Delete onClick={() => deleteUserHandler(user._id)} />
          <Edit onClick={editUserHandler} />
        </div>
      </td>
    </tr>
  )
}

export default UserRow
