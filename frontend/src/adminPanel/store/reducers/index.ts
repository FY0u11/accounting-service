import { actions, ActionsTypes } from '../actions'
import { Types }                 from '../../../types'

export const initialState: Types.AdminState = {
  users    : [],
  ptypes   : [],
  isLoading: true
}

export const reducer = (state: Types.AdminState = initialState, action: ActionsTypes<typeof actions>): Types.AdminState => {
  switch (action.type) {
    case 'ADMIN_SET_USERS': return { ...state, users: action.users }
    case 'ADMIN_SET_PTYPES': return { ...state, ptypes: action.ptypes }
    case 'ADMIN_SET_IS_LOADING': return { ...state, isLoading: action.isLoading }
    default: return state
  }
}
