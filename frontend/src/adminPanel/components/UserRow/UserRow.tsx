import styles from './UserRow.module.css'
import { Delete, Edit } from '@material-ui/icons'
import { Types } from '../../../types'

type UserRowProps = { user: Types.User; deleteUserHandler: (id: string) => void; editUserHandler: () => void }

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
