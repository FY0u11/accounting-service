import React from 'react'
import { Types } from '../types'

type AppContextType = {
  payments: Types.Payment[]
  setPayments: Types.SetState<Types.Payment[]>
  token: string
  setToken: Types.SetState<string>
  user: Types.User | null
  setUser: Types.SetState<Types.User | null>
  months: string[]
  setMonths: Types.SetState<string[]>
  years: string[]
  setYears: Types.SetState<string[]>
  selectedMonth: string
  setSelectedMonth: Types.SetState<string>
  selectedYear: string
  setSelectedYear: Types.SetState<string>
  summarySorting: Types.Sorting
  setSummarySorting: Types.SetState<Types.Sorting>
  detailsSorting: Types.Sorting
  setDetailsSorting: Types.SetState<Types.Sorting>
}

export const AppContext = React.createContext<AppContextType>({} as AppContextType)
