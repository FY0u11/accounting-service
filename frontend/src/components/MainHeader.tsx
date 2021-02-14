import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useLanguage } from '../hooks/useLanguage'
import { CustomSelect, PageHeader } from 'components'

const MainHeader = () => {
  const { lang } = useLanguage()
  const { setSelectedYear, setSelectedMonth, years, months, selectedYear, selectedMonth } = useContext(AppContext)

  return (
    <PageHeader>
      <CustomSelect
        title={lang.SELECT_YEAR}
        onChangeHandler={setSelectedYear}
        values={years}
        selectedValue={selectedYear}
      />
      <CustomSelect
        title={lang.SELECT_MONTH}
        onChangeHandler={setSelectedMonth}
        values={months}
        selectedValue={selectedMonth}
        isForMonths={true}
      />
    </PageHeader>
  )
}

export default MainHeader
