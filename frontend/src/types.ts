import { Dispatch, SetStateAction } from 'react'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Types {
  export type UsePaymentsTypes = 'all' | 'day'
  export type PaymentTypes = 'cash' | 'bank' | 'card' | 'kaspi'
  export type Payment = {
    _id: string
    time: string
    type: PaymentTypes
    value: number
  }
  export type PaymentForCreate = {
    type: PaymentTypes
    value: number
  }
  export type SetState<T> = Dispatch<SetStateAction<T>>
  export type Sorting = {
    by: string
    as: number
  }
  export type SummaryPayment = {
    day: number
    month: number
    cash: number
    card: number
    bank: number
    kaspi: number
    total: number
  }
}
