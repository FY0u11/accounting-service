import React from 'react'
import { Types } from '../types'

type AppContextType = {
  payments: Types.Payment[]
  setPayments: Types.SetState<Types.Payment[]>
  token: string
  setToken: Types.SetState<string>
  user: Types.User | null
  setUser: Types.SetState<Types.User | null>
} // todo move this to Types.ts

export const AppContext = React.createContext<AppContextType>(
  {} as AppContextType
)
