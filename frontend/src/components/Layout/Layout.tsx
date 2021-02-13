import Head from 'next/head'
import { useLanguage } from '../../hooks/useLanguage'
import styles from './Layout.module.css'

type LayoutProps = {
  title: string
  HeaderComponent?: React.ReactNode
  children: React.ReactNode
}

const Layout = ({ title = '', HeaderComponent = null, children }: LayoutProps) => {
  const { lang } = useLanguage()
  return (
    <div className={styles.container}>
      <Head>
        <title>
          {lang.DOCUMENT_TITLE}
          {title ? ` | ${title}` : null}
        </title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>
      <header className={styles.header}>{HeaderComponent}</header>
      <main className={styles.main}>
        <div className="content">{children}</div>
      </main>
      <footer className={styles.footer}>Sergey Strigin &copy; darkauron1997@gmail.com</footer>
    </div>
  )
}

export default Layout
