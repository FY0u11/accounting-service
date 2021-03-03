import { ExpandLess, ExpandMore } from '@material-ui/icons'
import styles from './SortingHeader.module.css'
import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { actions } from '../../store/actions'

type SortingHeaderProps = {
  by?: string
  type?: 'details' | 'summary'
  children: React.ReactNode
}

const SortingHeader = ({ by = null, children, type = 'summary' }: SortingHeaderProps) => {
  const { state, setState } = useContext(AppContext)
  const sorting = type === 'summary' ? state.app.summarySorting : state.app.detailsSorting
  const action = type === 'summary' ? actions.setAppSummarySorting : actions.setAppDetailsSorting
  return (
    <div className={styles.container} onClick={() => (by ? setState(action({ by, as: -sorting.as })) : null)}>
      {children}
      {sorting.by === by ? sorting.as === -1 ? <ExpandLess /> : <ExpandMore /> : null}
    </div>
  )
}

export default SortingHeader
