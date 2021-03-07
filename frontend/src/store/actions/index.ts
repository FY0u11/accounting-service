import { Types } from '../../types'

const setAppMonths = (months: string[]) => ({ type: 'SET_APP_MONTHS', months } as const)
const setAppYears = (years: string[]) => ({ type: 'SET_APP_YEARS', years } as const)
const setAppChosenMonth = (month: string) => ({ type: 'SET_APP_CHOSEN_MONTH', month } as const)
const setAppChosenYear = (year: string) => ({ type: 'SET_APP_CHOSEN_YEAR', year } as const)
const setPayments = (payments: Types.Payment[]) => ({ type: 'SET_PAYMENTS', payments } as const)
const setAppSummarySorting = (summarySorting: Types.Sorting) =>
  ({ type: 'SET_APP_SUMMARY_SORTING', summarySorting } as const)
const setAppDetailsSorting = (detailsSorting: Types.Sorting) =>
  ({ type: 'SET_APP_DETAILS_SORTING', detailsSorting } as const)
const setUser = (user: Types.User) => ({ type: 'SET_USER', user } as const)
const setUserToken = (token: string) => ({ type: 'SET_USER_TOKEN', token } as const)
const clearState = () => ({ type: 'CLEAR_STATE' } as const)
const setIsLoading = (isLoading: boolean) => ({ type: 'SET_IS_LOADING', isLoading } as const)
const setPtypes = (ptypes: Types.Ptype[]) => ({ type: 'SET_PTYPES', ptypes } as const)
const setUserSettings = (settings: Types.UserSettings) => ({ type: 'SET_USER_SETTINGS', settings } as const)

export const actions = {
  setAppMonths,
  setAppYears,
  setAppChosenMonth,
  setAppChosenYear,
  setPayments,
  setAppSummarySorting,
  setAppDetailsSorting,
  setUser,
  setUserToken,
  clearState,
  setIsLoading,
  setPtypes,
  setUserSettings
}

export type ActionsTypes<T> = T extends { [key: string]: (...args: unknown[]) => infer U } ? U : never
