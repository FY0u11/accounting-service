namespace types {
  export type Payment = {
    type: 'cash' | 'bank' | 'card' | 'kaspi'
    value: number
    date: Date
  }
}
