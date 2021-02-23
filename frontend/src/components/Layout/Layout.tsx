import Head from 'next/head'
import { useLanguage } from 'hooks'
import styles from './Layout.module.css'
import React from 'react'
import DetailsHeader from 'components/Layout/Headers/DetailsHeader'
import MainHeader from 'components/Layout/Headers/MainHeader'

type LayoutProps = {
  title?: string
  header?: 'main' | 'details' | null
  children?: React.ReactNode
}

const Layout = ({ title = 'default page', header = null, children = null }: LayoutProps) => {
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
      <header className={styles.header}>
        {header ? header === 'main' ? <MainHeader /> : header === 'details' ? <DetailsHeader /> : null : null}
      </header>
      <main className={styles.main}>
        <div className="content">{children}</div>
      </main>
      <footer className={styles.footer}>&copy; Sergey Strigin, 2020 - {new Date().getFullYear()}</footer>
    </div>
  )
}

export default Layout
