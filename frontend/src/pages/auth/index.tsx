import { useRouter } from 'next/router'
import { MouseEvent, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useToken } from '../../hooks/useToken'
import { decode } from 'jsonwebtoken'
import styles from './Auth.module.css'
import { Button, Layout } from 'components'

const Auth = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setToken, user, setUser } = useContext(AppContext)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  const loginHandler = async (e: MouseEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3030/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const result = await response.json()
      if (!result.token) return
      useToken(result.token)
      setToken(result.token)

      const decodedToken = decode(result.token)
      if (decodedToken && typeof decodedToken !== 'string') {
        const user = { id: decodedToken.id, username: decodedToken.username }
        setUser(user)
      }

      router.push('/')
    } catch (e) {
      console.log(e.message)
    }
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
