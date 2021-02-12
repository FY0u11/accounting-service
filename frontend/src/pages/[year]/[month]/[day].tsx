import DetailsTable from '../../../components/DetailsTable/DetailsTable'
import DetailsLayout from '../../../components/Layout/Layout'
import DetailsHeader from '../../../components/PageHeaders/DetailsHeader/DetailsHeader'
import { useLanguage } from '../../../hooks/useLanguage'
import React, { useContext } from 'react'
import { AppContext } from '../../../context/AppContext'

const DayDetails = () => {
  const { lang } = useLanguage()
  const { user } = useContext(AppContext)

  return (
    <>
      {user ? (
        <DetailsLayout
          title={lang.DOCUMENT_TITLE_DETAILS}
          HeaderComponent={<DetailsHeader />}
        >
          <DetailsTable />
        </DetailsLayout>
      ) : null}
    </>
  )
}

export default DayDetails
