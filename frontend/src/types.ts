import { Dispatch, SetStateAction } from 'react'
import { Socket }                   from 'socket.io-client'

import ru                           from './localization/ru'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Types {
  export type Ptype = {
    _id?            : string
    name            : string
    isActive?       : boolean
    payments        : [string]
    sort            : number
    icon            : string
  }
  export type PtypeToUpdate = {
    _id?            : string
    name?           : string
    isActive?       : boolean
    sort?           : number
    icon?           : string
  }
  export type PtypeToCreate = {
    name            : string
    isActive?       : boolean
  }
  export type Payment = {
    _id             : string
    time            : string
    value           : number
    ptype           : Ptype
    user?           : {
      username      : string
    }
  }
  export type PaymentForCreate = {
    ptype           : string
    value           : number
  }
  export type SetState<T> = Dispatch<SetStateAction<T>>
  export type Sorting = {
    by              : string
    as              : number
  }
  export type SummaryPayment = {
    day             : string
    total           : number
    [key            : string]: unknown
  }
  export type User = {
    _id             : string
    role            : 'admin' | 'user'
    username        : string
    socket          : Socket
    token           : string
    settings        : UserSettings
  }
  export type UserToCreate = {
    username        : string
    password        : string
  }
  export type UserToUpdate = {
    _id?            : string
    username?       : string
    password?       : string
    role?           : 'admin' | 'user'
    settings?       : string
  }
  export type UserSettings = {
    showAllPayments?: boolean
  }
  export type Enums = typeof ru
  export type State = {
    user            : User
    payments        : Payment[]
    ptypes          : Ptype[]
    app             : {
      months        : string[]
      years         : string[]
      chosenMonth   : string
      chosenYear    : string
      summarySorting: Sorting
      detailsSorting: Sorting
    }
    isLoading       : boolean
    enums           : Enums
  }
  export type AdminUser = {
    _id?            : string
    role?           : 'admin' | 'user'
    username?       : string
    password?       : string
  }
  export type AdminPtype = {
    _id?            : string
    payments?       : string[]
    name?           : string
    icon?           : string
    sort?           : number
  }
  export type AdminState = {
    users           : AdminUser[]
    ptypes          : Ptype[]
    isLoading       : boolean
  }
}
