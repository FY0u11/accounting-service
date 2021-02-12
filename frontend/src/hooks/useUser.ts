import { NextRouter } from 'next/router'

export const useUser = async (router: NextRouter) => {
  if (process.browser) {
    const token = window.localStorage.getItem('token')

    if (!token) {
      router.push('/auth')
      return
    }

    const response = await fetch('http://localhost:3030/token', {
      method: 'get',
      headers: {
        Authorization: token
      }
    })

    const result = await response.json()
    return result
  }
}
