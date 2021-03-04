import styles from './PtypeRow.module.css'
import { useContext } from 'react'
import { Visibility, VisibilityOff, Delete, Edit, DragHandle } from '@material-ui/icons'
import { Types } from '../../../types'
import { updatePtype } from 'api'
import { AppContext } from '../../../context/AppContext'
import classNames from 'classnames'
import { getIcon } from 'utils'

const PtypeRow = ({
  ptype,
  deletePtypeHandler,
  editPaymentHandler,
  selectIconHandler,
  setIsLoading
}: {
  setIsLoading: Types.SetState<boolean>
  ptype: Types.Ptype
  deletePtypeHandler: (type: string) => void
  selectIconHandler: () => void
  editPaymentHandler
}) => {
  const { state } = useContext(AppContext)

  const activeTypeHandler = async () => {
    setIsLoading(true)
    await updatePtype(ptype._id, { isActive: !ptype.isActive }, state.user.token)
    ptype.isActive = !ptype.isActive
    setIsLoading(false)
  }

  return (
    <tr className={!ptype.isActive ? styles.disabled : ''}>
      <td>
        <div className={classNames(styles.drag_icon, 'my-draggable')}>
          <DragHandle />
        </div>
      </td>
      <td>{ptype.name}</td>
      <td>{ptype.payments.length}</td>
      <td className={styles.icon} onClick={selectIconHandler}>
        {getIcon(ptype.icon)()}
      </td>
      <td>
        <div className={styles.center}>
          {ptype.isActive ? <Visibility onClick={activeTypeHandler} /> : <VisibilityOff onClick={activeTypeHandler} />}
          <Delete onClick={() => deletePtypeHandler(ptype._id)} />
          <Edit onClick={editPaymentHandler} />
        </div>
      </td>
    </tr>
  )
}

export default PtypeRow
