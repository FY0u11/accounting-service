import { Layout } from 'components'
import { useLanguage } from 'hooks'
import React from 'react'

const NotFound = () => {
  const { lang } = useLanguage()
  return (
    <Layout title={lang.DOCUMENT_TITLE_NOT_FOUND}>
      <h4>{lang.NOT_FOUND}</h4>
    </Layout>
  )
}

export default NotFound
