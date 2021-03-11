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
        <Layout title={state.enums.AUTHORIZATION}>
          <div className={styles.wrapper}>
            <form className={styles.container}>
              <h2>{state.enums.AUTHORIZATION}</h2>
              <label htmlFor="username">
                <span>{state.enums.INPUT_USERNAME}:</span>
                <input
                  type="text"
                  id="username"
                  placeholder={state.enums.USERNAME}
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                />
              </label>
              <label htmlFor="password">
                <span>{state.enums.INPUT_PASSWORD}:</span>
                <input
                  type="password"
                  id="password"
                  placeholder={state.enums.PASSWORD}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
              </label>
              <div>
                <Button onClick={login} disabled={isLoading || !form.username || !form.password}>
                  {state.enums.LOGIN}
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
