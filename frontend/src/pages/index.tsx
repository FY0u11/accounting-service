import { useState } from 'react'
import Layout from '../components/Layout/Layout'
import SummaryTable from '../components/SummaryTable/SummaryTable'
import MainHeader from '../components/PageHeaders/MainHeader/MainHeader'
import { usePayments } from '../hooks/usePayments'
import { useLanguage } from '../hooks/useLanguage'

const HomePage = () => {
  const [months, setMonths] = useState([])
  const [years, setYears] = useState([])
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const { payments, addPaymentHandler } = usePayments()
  const { lang } = useLanguage()

  return (
    <Layout
      title={lang.DOCUMENT_TITLE_HOME}
      HeaderComponent={
        <MainHeader
          months={months}
          years={years}
          addPaymentHandler={addPaymentHandler}
          selectMonthHandler={setSelectedMonth}
          selectYearHandler={setSelectedYear}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      }
    >
      {payments.length ? (
        <SummaryTable
          payments={payments}
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
