import { Types } from '../../types'

const serverQuery = async (url = '/', method = 'GET', token = null, body = null) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method,
    headers: {
      Authorization: token ? 'BEARER ' + token : null,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : null
  })
  const result = await response.json()
  if ('success' in result && !result.success) throw { message: result.message }
  return result
}
export const deleteOnePaymentApi = (id: string, token: string)                      => serverQuery(`/payments/${id}`, 'DELETE', token)
export const createPaymentApi    = (payment: Types.PaymentForCreate, token: string) => serverQuery(`/payments`, 'POST', token, payment)
export const getSelfPayments     = (token: string)                                  => serverQuery(`/payments`, 'GET', token)
export const getAllPayments      = (token: string)                                  => serverQuery(`/payments?all`, 'GET', token)
export const getActivePtypes     = (token: string)                                  => serverQuery(`/ptypes`, 'GET', token)
export const getAllPtypesApi     = (token: string)                                  => serverQuery(`/ptypes?all`, 'GET', token)
export const authenticate        = (username: string, password: string)             => serverQuery(`/auth`, 'POST', null, { username, password })
export const updatePaymentApi    = (payment: Types.Payment, token: string)          => serverQuery(`/payments/${payment._id}`, 'PUT', token, payment)
export const updatePtypeApi      = (ptype: Types.PtypeToUpdate, token: string)      => serverQuery(`/ptypes/${ptype._id}`, 'PUT', token, ptype)
export const createPtypeApi      = (ptype: Types.PtypeToCreate, token: string)      => serverQuery(`/ptypes`, 'POST', token, ptype)
export const deleteOnePtypeApi   = (id: string, token: string)                      => serverQuery(`/ptypes/${id}`, 'DELETE', token)
export const getAllUsersApi      = (token: string)                                  => serverQuery('/users', 'GET', token)
export const deleteOneUserApi    = (id: string, token: string)                      => serverQuery(`/users/${id}`, 'DELETE', token)
export const createUserApi       = (user: Types.UserToCreate, token: string)        => serverQuery(`/users`, 'POST', token, user)
export const updateUserApi       = (user: Types.UserToUpdate, token: string)        => serverQuery(`/users/${user._id}`, 'PUT', token, user)
export const getSelf             = (token: string)                                  => serverQuery('/users/self', 'GET', token)
