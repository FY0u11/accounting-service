import { Button, Layout, Switch } from 'components'
import { useLanguage } from 'hooks'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import styles from './Settings.module.css'
import { actions } from '../../store/actions'
import { updateUser } from 'api'

const Settings = () => {
  const { lang } = useLanguage()
  const router = useRouter()
  const { state, setState } = useContext(AppContext)
  return (
    <Layout title={lang.SETTINGS}>
      <div>
        <h2>{lang.SETTINGS}</h2>
        {state.user.role === 'admin' ? (
          <>
            <p className={styles.show_all_payments}>
              {state.user.settings.showAllPayments}
              Показывать платежи от всех пользователей?{' '}
              <Switch
                yes="Да"
                no="Нет"
                checked={state.user.settings.showAllPayments || false}
                checkHandler={async () => {
                  await updateUser(
                    state.user._id,
                    { settings: JSON.stringify({ showAllPayments: !state.user.settings.showAllPayments }) },
                    state.user.token
                  )
                  setState(actions.setUserSettings({ showAllPayments: !state.user.settings.showAllPayments }))
                }}
              />
            </p>
            <p>
              <Button onClick={() => router.push('/admin')}>{lang.ADMINING}</Button>
            </p>
          </>
        ) : null}
      </div>
    </Layout>
  )
}

export default Settings
