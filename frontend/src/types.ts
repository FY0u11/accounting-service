import { Dispatch, SetStateAction } from 'react'
import { Socket } from 'socket.io-client'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Types {
  export type Ptype = {
    _id?: string
    name: string
    isActive?: boolean
    payments: [string]
    sort: number
    icon: string
  }
  export type PtypeToUpdate = {
    _id?: string
    name?: string
    isActive?: boolean
    sort?: number
    icon?: string
  }
  export type PtypeToCreate = {
    name: string
    isActive?: boolean
  }
  export type Payment = {
    _id: string
    time: string
    value: number
    ptype: Ptype
    user?: {
      username: string
    }
  }
  export type PaymentForCreate = {
    ptype: string
    value: number
  }
  export type SetState<T> = Dispatch<SetStateAction<T>>
  export type Sorting = {
    by: string
    as: number
  }
  export type SummaryPayment = {
    day: number
    total: number
    [key: string]: unknown
  }
  export type User = {
    id: string
    role: 'admin' | 'user'
    username: string
    socket: Socket
    token: string
  }
}
