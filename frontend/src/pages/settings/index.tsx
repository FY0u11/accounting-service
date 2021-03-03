import { Button, Layout } from 'components'
import { useLanguage } from 'hooks'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const Settings = () => {
  const { lang } = useLanguage()
  const router = useRouter()
  const { state } = useContext(AppContext)
  return (
    <Layout title={lang.SETTINGS}>
      <div>
        <h2>{lang.SETTINGS}</h2>
        {state.user.role === 'admin' ? (
          <p>
            <Button onClick={() => router.push('/admin')}>{lang.ADMINING}</Button>
          </p>
        ) : null}
      </div>
    </Layout>
  )
}

export default Settings
