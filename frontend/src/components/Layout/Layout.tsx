import Head from 'next/head'
import { useLanguage } from 'hooks'
import React, { useContext } from 'react'
import MainHeader from 'components/Layout/MainHeader/MainHeader'
import classNames from 'classnames'
import styles from './Layout.module.css'
import { AppContext } from '../../context/AppContext'

type LayoutProps = {
  title?: string
  children?: React.ReactNode
}

const Layout = ({ title = 'default page', children = null }: LayoutProps) => {
  const { lang } = useLanguage()
  const { state } = useContext(AppContext)
  return (
    <div className={classNames('container', styles.container)}>
      <Head>
        <title>
          {lang.DOCUMENT_TITLE}
          {title ? ` | ${title}` : null}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>
      <header className={classNames('row', styles.header)}>{state.user.token ? <MainHeader /> : null}</header>
      <main className={classNames('row', styles.main)}>
        <div className="col s12">{children}</div>
      </main>
      <footer className={classNames('row', styles.footer)}>
        <div className="col s12 center-align grey-text text-lighten-1">
          &copy; Sergey Strigin, 2020 - {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  )
}

export default Layout
