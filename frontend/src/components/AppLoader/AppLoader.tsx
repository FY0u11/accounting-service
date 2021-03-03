import styles from './AppLoader.module.css'

const AppLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.lds_hourglass} />
    </div>
  )
}

export default AppLoader
