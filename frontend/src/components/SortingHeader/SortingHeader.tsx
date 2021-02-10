import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { Types } from '../../types'
import styles from './SortingHeader.module.css'

type SortingHeaderProps = {
  sorting?: Types.Sorting
  setSorting?: Types.SetState<Types.Sorting>
  by?: string
  children: React.ReactNode
}

const SortingHeader = ({
  sorting = { by: '', as: 1 },
  setSorting,
  by = '',
  children
}: SortingHeaderProps) => {
  return (
    <div
      className={styles.container}
      onClick={() => (setSorting ? setSorting({ by, as: -sorting.as }) : null)}
    >
      {children}
      {sorting.by === by ? (
        sorting.as === -1 ? (
          <ExpandLess />
        ) : (
          <ExpandMore />
        )
      ) : null}
    </div>
  )
}

export default SortingHeader
