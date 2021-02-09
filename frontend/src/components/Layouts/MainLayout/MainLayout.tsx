import Head from 'next/head'
import Header from '../../Header/Header'
import styles from './MainLayout.module.css'

interface ILayoutProps {
  title?: string
  children: React.ReactNode
  months: Array<string>
  years: Array<string>
  selectMonthHandler: (value: string) => void
  selectYearHandler: (value: string) => void
  addPaymentHandler: (value: string) => void
}

const Layout = ({
  title = '',
  addPaymentHandler,
  months,
  years,
  selectMonthHandler,
  selectYearHandler,
  children
}: ILayoutProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>App{title ? ` | ${title}` : null}</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header className={styles.header}>
        <Header
          addPaymentHandler={addPaymentHandler}
          months={months}
          years={years}
          selectYearHandler={selectYearHandler}
          selectMonthHandler={selectMonthHandler}
        />
      </header>
      <main className={styles.main}>
        <div className="content">{children}</div>
      </main>
      <footer className={styles.footer}>footer</footer>
    </div>
  )
}

export default Layout
