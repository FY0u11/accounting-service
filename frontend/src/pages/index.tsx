import { useContext, useState } from 'react'
import Layout from '../components/Layout/Layout'
import SummaryTable from '../components/SummaryTable/SummaryTable'
import MainHeader from '../components/PageHeaders/MainHeader/MainHeader'
import { useLanguage } from '../hooks/useLanguage'
import React from 'react'
import { AppContext } from '../context/AppContext'
import { usePayments } from '../hooks/usePayments'

const HomePage = () => {
  const [months, setMonths] = useState([] as string[])
  const [years, setYears] = useState([] as string[])
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const { lang } = useLanguage()
  const { token, payments } = useContext(AppContext)
  usePayments('all')

  return (
    <Layout
      title={lang.DOCUMENT_TITLE_HOME}
      HeaderComponent={
        <MainHeader
          months={months}
          years={years}
          selectMonthHandler={setSelectedMonth}
          selectYearHandler={setSelectedYear}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      }
    >
      {token && payments.length ? (
        <SummaryTable
          setMonths={setMonths}
          setYears={setYears}
          setSelectedMonth={setSelectedMonth}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      ) : null}
    </Layout>
  )
}

export default HomePage
