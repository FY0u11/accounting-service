import { Types } from '../../types'

const serverQuery = async (url = '/', method = 'GET', token = null, body = null) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method,
      headers: {
        Authorization: token ? 'BEARER ' + token : null,
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : null
    })
    return await response.json()
  } catch (e) {
    console.log(e.message)
  }
}

export const deleteOnePayment = async (id: string, token: string) => {
  return await serverQuery(`/payments/${id}`, 'DELETE', token)
}

export const createPayment = async (payment: Types.PaymentForCreate, token: string) => {
  return await serverQuery(`/payments`, 'POST', token, payment)
}

export const getAllPayments = async (token: string) => {
  return await serverQuery(`/payments`, 'GET', token)
}

export const getActivePtypes = async (token: string) => {
  return await serverQuery(`/ptypes`, 'GET', token)
}

export const getAllPtypes = async (token: string) => {
  return await serverQuery(`/ptypes?all`, 'GET', token)
}

export const authenticate = async (username: string, password: string) => {
  return await serverQuery(`/auth`, 'POST', null, { username, password })
}

export const updatePayment = async (id: string, payment: Types.PaymentForCreate, token: string) => {
  return await serverQuery(`/payments/${id}`, 'PUT', token, payment)
}

export const updatePtype = async (id: string, ptype: Types.PtypeToUpdate, token: string) => {
  return await serverQuery(`/ptypes/${id}`, 'PUT', token, ptype)
}

export const createPtype = async (ptype: Types.PtypeToCreate, token: string) => {
  return await serverQuery(`/ptypes`, 'POST', token, ptype)
}

export const deleteOnePtype = async (id: string, token: string) => {
  return await serverQuery(`/ptypes/${id}`, 'DELETE', token)
}

export const getAllUsers = async (token: string) => {
  return await serverQuery('/users', 'GET', token)
}

export const deleteOneUser = async (id: string, token: string) => {
  return await serverQuery(`/users/${id}`, 'DELETE', token)
}

export const createUser = async (user: Types.UserToCreate, token: string) => {
  return await serverQuery(`/users`, 'POST', token, user)
}

export const updateUser = async (id: string, user: Types.UserToUpdate, token: string) => {
  return await serverQuery(`/users/${id}`, 'PUT', token, user)
}
