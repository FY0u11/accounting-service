import {Types} from '../../../types'

const setUsers = (users: Types.User[]) => ({ type: 'ADMIN_SET_USERS', users } as const)
const setPtypes = (ptypes: Types.Ptype[]) => ({ type: 'ADMIN_SET_PTYPES', ptypes } as const)
const setIsLoading = (isLoading: boolean) => ({ type: 'ADMIN_SET_IS_LOADING', isLoading } as const)

export const actions = {
  setUsers,
  setPtypes,
  setIsLoading
}

export type ActionsTypes<T> = T extends { [key: string]: (...args: unknown[]) => infer U } ? U : never
