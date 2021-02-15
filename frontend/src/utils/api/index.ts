import { Types } from '../../types'

export const deletePayment = async (id: string, token: string) => {
  try {
    const response = await fetch(`http://localhost:3030/${id}`, {
      method: 'delete',
      headers: {
        Authorization: 'BEARER ' + token
      }
    })
    return await response.json()
  } catch (e) {
    console.log(e.message)
  }
}

export const addPayment = async (payment: Types.PaymentForCreate, token: string) => {
  try {
    const response = await fetch('http://localhost:3030', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'BEARER ' + token
      },
      body: JSON.stringify(payment)
    })
    return await response.json()
  } catch (e) {
    console.log(e.message)
  }
}

export const getPayments = async (token: string) => {
  try {
    const response = await fetch('http://localhost:3030', {
      headers: {
        Authorization: 'BEARER ' + token
      }
    })
    return await response.json()
  } catch (e) {
    console.log(e.message)
  }
}

export const authenticate = async (username: string, password: string) => {
  try {
    const response = await fetch('http://localhost:3030/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    return await response.json()
  } catch (e) {
    console.log(e.message)
  }
}

export const editPayment = async (id: string, payment: Types.PaymentForCreate, token: string) => {
  try {
    const response = await fetch('http://localhost:3030/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'BEARER ' + token
      },
      body: JSON.stringify(payment)
    })
    return await response.json()
  } catch (e) {
    console.log(e.message)
  }
}
