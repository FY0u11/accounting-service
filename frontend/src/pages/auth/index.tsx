import { useRouter } from 'next/router'
import { MouseEvent, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import styles from './Auth.module.css'
import { Button, Layout } from 'components'
import { saveToken } from 'utils'
import { authenticate } from 'api'

const Auth = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setToken, user } = useContext(AppContext)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  const loginHandler = async (e: MouseEvent) => {
    e.preventDefault()
    const result = await authenticate(username, password)
    if (!result.token) return
    saveToken(result.token)
    setToken(result.token)
    router.push('/')
  }

  return (
    <>
      {!user ? (
        <Layout title="Авторизация">
          <div className={styles.wrapper}>
            <form className={styles.container}>
              <h1 className={styles.header}>Авторизация</h1>
              <label htmlFor="username">
                <span>Введите имя пользователя:</span>
                <input
                  type="text"
                  id="username"
                  placeholder="Имя пользователя"
                  defaultValue={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </label>
              <label htmlFor="password">
                <span>Введите пароль:</span>
                <input
                  type="password"
                  id="password"
                  placeholder="Пароль"
                  defaultValue={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </label>
              <div className={styles.buttons}>
                <Button onClick={loginHandler}>Войти</Button>
              </div>
            </form>
          </div>
        </Layout>
      ) : null}
    </>
  )
}

export default Auth
