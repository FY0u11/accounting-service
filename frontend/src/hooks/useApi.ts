import { useContext } from 'react'

import { AppContext } from '../context/AppContext'
import { Types }      from '../types'

export const useApi   = (defaultState: Types.State = null) => {
  const state         = useContext(AppContext).state ?? defaultState
  const request       = async (callback, ...params) => {
    let response
    try {
      response = await callback(...params, state.user?.token)
    } catch (e) {
      M.toast({ html: state.enums[e.message] ?? `No such error in enums "${e.message}"`, classes: 'red darken-1' })
      throw {}
    }
    if (response.message) {
      M.toast({ html: state.enums[response.message] ?? `No such message in enums "${response.message}"` })
    }
    return response.data ? response.data : null
  }
  return { request }
}
