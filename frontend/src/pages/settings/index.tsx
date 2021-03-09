import { useRouter }              from 'next/router'
import React, { useContext }      from 'react'

import { updateUserApi }             from 'api'
import { Button, Layout, Switch } from 'components'
import { useApi }                 from 'hooks'
import styles                     from './Settings.module.css'
import { AppContext }             from '../../context/AppContext'
import { actions }                from '../../store/actions'

const Settings = () => {
  const { state, setState } = useContext(AppContext)
  const router              = useRouter()
  const { request }         = useApi()

  const updateUserHandler = async () => {
    try {
      await request(updateUserApi, {
        _id: state.user._id,
        settings: JSON.stringify({ ...state.user.settings, showAllPayments: !state.user.settings.showAllPayments })
      })
      setState(actions.setUserSettings({ showAllPayments: !state.user.settings.showAllPayments }))
    } catch {
      return
    }
  }

  return (
    <Layout title={state.enums.SETTINGS}>
      <div>
        <h2>{state.enums.SETTINGS}</h2>
        {state.user.role === 'admin' ? (
          <>
            <p className={styles.show_all_payments}>
              {state.user.settings.showAllPayments}
              Показывать платежи от всех пользователей?{' '}
              <Switch
                yes="Да"
                no="Нет"
                checked={state.user.settings.showAllPayments || false}
                checkHandler={updateUserHandler}
              />
            </p>
            <p>
              <Button onClick={() => router.push('/admin')}>{state.enums.ADMINING}</Button>
            </p>
          </>
        ) : null}
      </div>
    </Layout>
  )
}

export default Settings
