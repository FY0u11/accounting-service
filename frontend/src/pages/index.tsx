import moment                              from 'moment'
import React, {
  useContext,
  useEffect,
  useState
}                                          from 'react'

import { Layout }                          from 'components'
import { SummaryTableContainer }           from 'containers'
import { AppContext }                      from '../context/AppContext'
import { actions }                         from '../store/actions'

const HomePage = () => {
  const { state, setState }                     = useContext(AppContext)
  const [selectedPayments, setSelectedPayments] = useState([])

  const getYearMonths = (year: string): [string, string[]] => {
    if (!state.payments.length) return ['', []]
    const monthsSet = new Set(
      state.payments
        .filter(p => moment(p.time).isSame(moment(year, 'YYYY'), 'year'))
        .map(p => new Date(p.time).getMonth() + 1)
    )
    const months = Array.from(monthsSet)
    const lastMonth = Math.max(...months) + ''
    return [lastMonth, months.map(v => v + '')]
  }

  const setPayments = () => {
    if (!state.payments.length) return
    setSelectedPayments(
      state.payments.filter(p => {
        return moment(p.time).isSame(moment(`${state.app.chosenYear}.${state.app.chosenMonth}`, 'YYYY.MM'), 'month')
      })
    )
  }

  const sort = (arr: string[]) => arr.sort((a, b) => +a - +b)

  useEffect(() => {
    if (!state.payments.length) return
    const yearsSet = new Set(state.payments.map(p => new Date(p.time).getFullYear()))
    const years = Array.from(yearsSet)
    const lastYear = Math.max(...years) + ''
    if (state.app.chosenYear && state.app.chosenMonth && years.includes(+state.app.chosenYear)) {
      setPayments()
      return
    }
    setState(actions.setAppChosenYear(lastYear))
    setState(actions.setAppYears(sort(years.map(v => '' + v))))
  }, [state.payments])

  useEffect(() => {
    if (!state.app.chosenYear) return
    const [lastMonth, months] = getYearMonths(state.app.chosenYear)
    const monthToSelect = state.app.chosenMonth
      ? months.includes(state.app.chosenMonth)
        ? state.app.chosenMonth
        : lastMonth
      : lastMonth
    monthToSelect === state.app.chosenMonth ? setPayments() : setState(actions.setAppChosenMonth(monthToSelect))
    setState(actions.setAppMonths(sort(months)))
  }, [state.app.chosenYear])

  useEffect(() => {
    if (!state.app.chosenMonth) return
    setPayments()
  }, [state.app.chosenMonth])

  return (
    <Layout title={state.enums.DOCUMENT_TITLE_HOME}>
      <SummaryTableContainer payments={selectedPayments} />
    </Layout>
  )
}

export default HomePage
