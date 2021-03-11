import { useRouter }              from 'next/router'
import React, { useContext }      from 'react'

import { updateUserApi }             from 'api'
import { Button, CustomSelect, Layout, Switch } from 'components'
import { useApi }                 from 'hooks'
import styles                     from './Settings.module.css'
import { AppContext }             from '../../context/AppContext'
import { actions }                from '../../store/actions'

const Settings = () => {
  const { state, setState } = useContext(AppContext)
  const router              = useRouter()
  const { request }         = useApi()

  const updateUserHandler = async (type: 'lang' | 'sap', value?: unknown) => {
    try {
      let settings = {}
      if (type === 'sap' ) {
        settings = { ...state.user.settings, showAllPayments: !state.user.settings.showAllPayments }
      } else if (type === 'lang') {
        settings = { ...state.user.settings, lang: value }
      }
      await request(updateUserApi, {
        _id: state.user._id,
        settings: JSON.stringify(settings)
      })
      setState(actions.setUserSettings(settings))
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
              {state.enums.SHOW_ALL_PAYMENTS}{' '}
              <Switch
                yes={state.enums.YES}
                no={state.enums.NO}
                checked={state.user.settings.showAllPayments || false}
                checkHandler={() => updateUserHandler('sap')}
              />
            </p>
            <p>
              <Button onClick={() => router.push('/admin')}>{state.enums.ADMINING}</Button>
            </p>
          </>
        ) : null}
        <div className={styles.lang}>
          <p>{state.enums.CHANGE_LANGUAGE}:</p>
          <div className={styles.lang_select}>
            <CustomSelect
              values={['English', 'Русский']}
              title={state.enums.SELECT_LANGUAGE}
              selectedValue={state.user.settings.lang ?? 'Русский'}
              onChangeHandler={lang => updateUserHandler('lang', lang)}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Settings
