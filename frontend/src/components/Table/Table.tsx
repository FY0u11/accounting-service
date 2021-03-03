import styles from './Table.module.css'
import React from 'react'
import classNames from 'classnames'

type TableProps = {
  trHover?: boolean
  theadId?: string
  tbodyId?: string
  thead: React.ReactNode
  tbody: React.ReactNode
}

const Table = ({ trHover = false, thead, tbody, theadId = '', tbodyId = '' }: TableProps) => {
  return (
    <table className={styles.table}>
      <thead id={theadId} className={styles.thead}>
        {thead}
      </thead>
      <tbody
        id={tbodyId}
        className={classNames({
          [styles.tbody]: true,
          [styles.tr_hover]: trHover
        })}
      >
        {tbody}
      </tbody>
    </table>
  )
}

export default Table
