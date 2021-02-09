import { ExpandLess, ExpandMore } from '@material-ui/icons'
import styles from './SortingHeader.module.css'

const SortingHeader = ({ sorting, setSorting, by, children }) => {
  return (
    <div
      className={styles.container}
      onClick={() => setSorting({ by, as: -sorting.as })}
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
