export const useToken = (token: string) => {
  window.localStorage.setItem('token', token)
}
