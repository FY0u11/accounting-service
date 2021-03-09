import React, { useContext } from 'react'

import { Layout }            from 'components'
import { AppContext }        from '../context/AppContext'

const NotFound = () => {
  const { state } = useContext(AppContext)

  return (
    <Layout title={state.enums.DOCUMENT_TITLE_NOT_FOUND}>
      <h4>{state.enums.NOT_FOUND}</h4>
    </Layout>
  )
}

export default NotFound
