import React from 'react'
import { initialState } from '../store/reducers'
import { actions, ActionsTypes } from '../store/actions'

type AppContextType = {
  state: typeof initialState
  setState: React.Dispatch<ActionsTypes<typeof actions>>
}

export const AppContext = React.createContext<AppContextType>({} as AppContextType)
