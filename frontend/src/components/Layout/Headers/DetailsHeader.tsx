import { Button } from 'components'
import { useRouter } from 'next/router'
import { useLanguage } from 'hooks'
import RootHeader from 'components/Layout/Headers/RootHeader/RootHeader'

const DetailsHeader = () => {
  const router = useRouter()
  const { lang } = useLanguage()

  return (
    <RootHeader>
      <Button onClick={() => router.push('/')}>{lang.BACK}</Button>
    </RootHeader>
  )
}

export default DetailsHeader
