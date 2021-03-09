import React                     from 'react'

import { actions, ActionsTypes } from '../store/actions'
import { initialState }          from '../store/reducers'

type AppContextType = {
  state   : typeof initialState
  setState: React.Dispatch<ActionsTypes<typeof actions>>
}

export const AppContext = React.createContext<AppContextType>({} as AppContextType)
