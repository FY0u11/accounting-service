namespace Types {
  export type Payment = {
    type: 'cash' | 'bank' | 'card' | 'kaspi'
    value: number
    date: Date
  }
  export type User = {
    username: string
    password: string
    _id: string
  }
  export type UserToken = {
    id: string
  }
}
