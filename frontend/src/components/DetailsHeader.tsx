import { Button, PageHeader } from 'components'
import { useRouter } from 'next/router'
import { useLanguage } from '../hooks/useLanguage'

const DetailsHeader = () => {
  const router = useRouter()
  const { lang } = useLanguage()

  return (
    <PageHeader>
      <Button onClick={() => router.push('/')}>{lang.BACK}</Button>
    </PageHeader>
  )
}

export default DetailsHeader
