import { Layout } from 'components'
import { useLanguage } from '../hooks/useLanguage'
import React from 'react'

const NotFound = () => {
  const { lang } = useLanguage()
  return <Layout title={lang.DOCUMENT_TITLE_NOT_FOUND}>{lang.NOT_FOUND}</Layout>
}

export default NotFound
