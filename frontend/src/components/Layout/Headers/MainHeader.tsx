import { useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import { useLanguage } from 'hooks'
import { CustomSelect } from 'components'
import RootHeader from 'components/Layout/Headers/RootHeader/RootHeader'

const MainHeader = () => {
  const { lang } = useLanguage()
  const { setSelectedYear, setSelectedMonth, years, months, selectedYear, selectedMonth } = useContext(AppContext)

  return (
    <RootHeader>
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
    </RootHeader>
  )
}

export default MainHeader
