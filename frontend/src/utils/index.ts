import { verify } from 'jsonwebtoken'
import * as allIcons from '@material-ui/icons'

export const nF = () => {}

export const saveToken = (token: string) => {
  window.localStorage.setItem('token', token)
}

export const getTokenPayload = (token: string) => {
  const jwtSecret = process.env.NEXT_PUBLIC_SECRET
  if (!jwtSecret) {
    console.log('Missing NEXT_PUBLIC_SECRET in .env.local')
    return
  }
  return verify(token, jwtSecret) as {
    id: string
    role: 'admin' | 'user'
    username: string
  }
}

export const icons = Object.keys(allIcons).filter(icon => /Rounded/i.test(icon))
export const getIcon = iconName => {
  return allIcons[iconName].type.render
}

export const verifyPayment = (payment: string) => {
  return /^-?([1-9][0-9]{0,6})?$/.test(payment)
}

export const verifyPtypeName = (ptypeName: string) => {
  return /^(?!.*[ _][ _])(?!.*[_-][_-])(?!.*- -)(?!.*\S- )(?!.* -\S)(?![ _-])[a-zа-я0-9_ -]{0,30}$/i.test(ptypeName)
}

export const verifyUsername = (ptypeName: string) => {
  return /^[a-zа-я0-9_]{0,20}$/i.test(ptypeName)
}

export const verifyPassword = (ptypeName: string) => {
  return /^[\S]{0,30}$/i.test(ptypeName)
}
