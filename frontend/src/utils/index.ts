import { verify }    from 'jsonwebtoken'
import * as allIcons from '@material-ui/icons'

export const icons           = Object.keys(allIcons).filter(icon => /Rounded/i.test(icon))
export const nF              = (...args: unknown[]) => {}
export const saveToken       = (token: string)      => window.localStorage.setItem('token', token)
export const getIcon         = iconName             => allIcons[iconName].type.render
export const verifyPayment   = (payment: string)    => /^-?([1-9][0-9]{0,6})?$/.test(payment)
export const verifyPtypeName = (ptypeName: string)  => /^(?!.*[ _][ _])(?!.*[_-][_-])(?!.*- -)(?!.*\S- )(?!.* -\S)(?![ _-])[a-zа-я0-9_ -]{0,30}$/i.test(ptypeName)
export const verifyUsername  = (ptypeName: string)  => /^[a-zа-я0-9_]{0,20}$/i.test(ptypeName)
export const verifyPassword  = (ptypeName: string)  => /^[\S]{0,30}$/i.test(ptypeName)
export const getTokenPayload = (token: string)      => {
  const jwtSecret = process.env.NEXT_PUBLIC_SECRET
  if (!jwtSecret) return console.log('Missing NEXT_PUBLIC_SECRET in .env.local')
  return verify(token, jwtSecret) as { id: string }
}
