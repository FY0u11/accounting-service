import { useEffect, useState } from 'react'
import Layout from '../components/Layouts/MainLayout/MainLayout'
import SummaryTable from '../components/SummaryTable/SummaryTable'

const HomePage = () => {
  const [payments, setPayments] = useState([])
  const [months, setMonths] = useState([])
  const [years, setYears] = useState([])
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  const selectMonthHandler = month => {
    setSelectedMonth(month)
  }

  const selectYearHandler = year => {
    setSelectedYear(year)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch('http://localhost:3030')
        const payments = await response.json()
        setPayments(payments)
      } catch (e) {
        console.log(e.message)
      }
    })()
  }, [])

  const addPaymentHandler = async payment => {
    try {
      await fetch('http://localhost:3030', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payment)
      })
      setPayments([...payments, payment])
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <Layout
      title="Home Page"
      months={months}
      selectMonthHandler={selectMonthHandler}
      selectYearHandler={selectYearHandler}
      years={years}
      addPaymentHandler={addPaymentHandler}
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
