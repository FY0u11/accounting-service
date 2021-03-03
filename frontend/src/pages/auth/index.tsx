import { useRouter } from 'next/router'
import { MouseEvent, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import styles from './Auth.module.css'
import { Button, Layout } from 'components'
import { saveToken } from 'utils'
import { authenticate } from 'api'
import { actions } from '../../store/actions'
import { useLanguage } from 'hooks'

const Auth = () => {
  const [form, setForm] = useState({ username: '', password: '' })
  const { state, setState } = useContext(AppContext)
  const { lang } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (state.user.token) router.push('/')
  }, [])

  const loginHandler = async (e: MouseEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const result = await authenticate(form.username, form.password)
    if (result.success) {
      saveToken(result.data)
      setState(actions.setUserToken(result.data))
      router.push('/')
    } else {
      M.toast({ html: lang[result.message] })
      setForm({ username: '', password: '' })
    }
    setIsLoading(false)
  }

  return (
    <>
      {!state.user.token ? (
        <Layout title="Авторизация">
          <div className={styles.wrapper}>
            <form className={styles.container}>
              <h2>Авторизация</h2>
              <label htmlFor="username">
                <span>Введите имя пользователя:</span>
                <input
                  type="text"
                  id="username"
                  placeholder="Имя пользователя"
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                />
              </label>
              <label htmlFor="password">
                <span>Введите пароль:</span>
                <input
                  type="password"
                  id="password"
                  placeholder="Пароль"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
              </label>
              <div>
                <Button onClick={loginHandler} disabled={isLoading}>
                  Войти
                </Button>
              </div>
            </form>
          </div>
        </Layout>
      ) : null}
    </>
  )
}

export default Auth
