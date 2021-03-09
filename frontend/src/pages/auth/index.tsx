import { useRouter }             from 'next/router'
import { useContext, useEffect } from 'react'

import { Button, Layout }        from 'components'
import { useLogin }              from 'hooks'
import styles                    from './Auth.module.css'
import { AppContext }            from '../../context/AppContext'

const Auth = () => {
  const { state }                           = useContext(AppContext)
  const router                              = useRouter()
  const { login, form, setForm, isLoading } = useLogin()

  useEffect(() => {
    if (state.user.token) router.push('/')
  }, [])

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
                <Button onClick={login} disabled={isLoading || !form.username || !form.password}>
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
