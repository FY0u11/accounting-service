import React                     from 'react'

import { actions, ActionsTypes } from '../store/actions'
import { initialState }          from '../store/reducers'

type AdminContextType = {
  adminState   : typeof initialState
  setAdminState: React.Dispatch<ActionsTypes<typeof actions>>
}

export const AdminContext = React.createContext<AdminContextType>({} as AdminContextType)
