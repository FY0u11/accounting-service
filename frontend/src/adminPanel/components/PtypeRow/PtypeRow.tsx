import classNames                                              from 'classnames'
import { Visibility, VisibilityOff, Delete, Edit, DragHandle } from '@material-ui/icons'
import { useApi }                                              from 'hooks'

import { updatePtypeApi }                                         from 'api'
import { useContext } from 'react'
import { getIcon }                                             from 'utils'
import { AdminContext } from '../../context/AdminContext'
import { actions } from '../../store/actions'
import styles                                                  from './PtypeRow.module.css'
import { Types }                                               from '../../../types'

type PtypeRowProps = {
  ptype             : Types.Ptype
  deletePtypeHandler: (type: string) => void
  selectIconHandler : () => void
  editPaymentHandler
}

const PtypeRow = ({
  ptype,
  deletePtypeHandler,
  editPaymentHandler,
  selectIconHandler
}: PtypeRowProps) => {
  const { setAdminState } = useContext(AdminContext)
  const { request } = useApi()

  const activeTypeHandler = async () => {
    try {
      setAdminState(actions.setIsLoading(true))
      await request(updatePtypeApi, { _id: ptype._id, isActive: !ptype.isActive })
      ptype.isActive = !ptype.isActive
      setAdminState(actions.setIsLoading(false))
    } catch { return }
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
