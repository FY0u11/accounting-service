import { useContext, useEffect, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import React from 'react'
import { AppContext } from '../context/AppContext'
import moment from 'moment'
import { Layout, MainHeader, SummaryTable } from 'components'

const HomePage = () => {
  const { lang } = useLanguage()
  const {
    token,
    payments,
    setMonths,
    setYears,
    setSelectedYear,
    setSelectedMonth,
    selectedYear,
    selectedMonth
  } = useContext(AppContext)
  const [selectedPayments, setSelectedPayments] = useState([])

  const getYearMonths = (year: string): [string, string[]] => {
    const monthsSet = new Set(
      payments
        .filter(p => moment(p.time).isSame(moment(year, 'YYYY'), 'year'))
        .map(p => new Date(p.time).getMonth() + 1)
    )
    const months = Array.from(monthsSet)
    const lastMonth = Math.max(...months) + ''
    return [lastMonth, months.map(v => v + '')]
  }

  const setPayments = () => {
    setSelectedPayments(
      payments.filter(p => {
        return moment(p.time).isSame(moment(`${selectedYear}.${selectedMonth}`, 'YYYY.MM'), 'month')
      })
    )
  }

  const sort = (arr: string[]) => arr.sort((a, b) => +a - +b)

  useEffect(() => {
    if (!payments.length) return
    const yearsSet = new Set(payments.map(p => new Date(p.time).getFullYear()))
    const years = Array.from(yearsSet)
    const lastYear = Math.max(...years) + ''
    if (selectedYear && selectedMonth && years.includes(+selectedYear)) {
      setPayments()
      return
    }
    setSelectedYear(lastYear)
    setYears(sort(years.map(v => '' + v)))
  }, [payments])

  useEffect(() => {
    if (!selectedYear) return
    const [lastMonth, months] = getYearMonths(selectedYear)
    const monthToSelect = selectedMonth ? (months.includes(selectedMonth) ? selectedMonth : lastMonth) : lastMonth
    monthToSelect === selectedMonth ? setPayments() : setSelectedMonth(monthToSelect)
    setMonths(sort(months))
  }, [selectedYear])

  useEffect(() => {
    if (!selectedMonth) return
    setPayments()
  }, [selectedMonth])

  return (
    <Layout title={lang.DOCUMENT_TITLE_HOME} HeaderComponent={<MainHeader />}>
      {token && selectedPayments.length ? <SummaryTable payments={selectedPayments} /> : null}
    </Layout>
  )
}

export default HomePage
