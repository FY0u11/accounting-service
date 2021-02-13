import { useContext } from 'react'
import Layout from '../components/Layout/Layout'
import SummaryTable from '../components/SummaryTable/SummaryTable'
import MainHeader from '../components/PageHeaders/MainHeader/MainHeader'
import { useLanguage } from '../hooks/useLanguage'
import React from 'react'
import { AppContext } from '../context/AppContext'

const HomePage = () => {
  const { lang } = useLanguage()
  const { token, payments } = useContext(AppContext)

  return (
    <Layout title={lang.DOCUMENT_TITLE_HOME} HeaderComponent={<MainHeader />}>
      {token && payments.length ? <SummaryTable payments={payments} /> : null}
    </Layout>
  )
}

export default HomePage
