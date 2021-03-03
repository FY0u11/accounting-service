import { actions, ActionsTypes } from '../actions'
import { Types } from '../../types'

export const initialState = {
  user: {
    id: '',
    socket: null,
    username: '',
    role: 'user',
    token: ''
  } as Types.User,
  payments: [] as Types.Payment[],
  ptypes: [] as Types.Ptype[],
  app: {
    months: [],
    years: [],
    chosenMonth: '',
    chosenYear: '',
    summarySorting: { by: 'day', as: 1 } as Types.Sorting,
    detailsSorting: { by: 'time', as: 1 } as Types.Sorting
  },
  isLoading: true
}

export const reducer = (state = initialState, action: ActionsTypes<typeof actions>): typeof initialState => {
  console.log('ACTION', action)
  switch (action.type) {
    case 'SET_APP_MONTHS':
      return { ...state, app: { ...state.app, months: action.months } }
    case 'SET_APP_YEARS':
      return { ...state, app: { ...state.app, years: action.years } }
    case 'SET_APP_CHOSEN_MONTH':
      return { ...state, app: { ...state.app, chosenMonth: action.month } }
    case 'SET_APP_CHOSEN_YEAR':
      return { ...state, app: { ...state.app, chosenYear: action.year } }
    case 'SET_PAYMENTS':
      return { ...state, payments: action.payments }
    case 'SET_APP_SUMMARY_SORTING':
      return { ...state, app: { ...state.app, summarySorting: action.summarySorting } }
    case 'SET_APP_DETAILS_SORTING':
      return { ...state, app: { ...state.app, detailsSorting: action.detailsSorting } }
    case 'SET_USER':
      return { ...state, user: action.user }
    case 'SET_USER_TOKEN':
      return { ...state, user: { ...state.user, token: action.token } }
    case 'CLEAR_STATE': {
      state.user.socket.close()
      return initialState
    }
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.isLoading }
    case 'SET_PTYPES':
      return { ...state, ptypes: action.ptypes }
    default:
      return state
  }
}
