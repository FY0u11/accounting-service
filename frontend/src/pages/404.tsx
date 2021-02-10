import Layout from '../components/Layout/Layout'
import { useLanguage } from '../hooks/useLanguage'

const NotFound = () => {
  const { lang } = useLanguage()
  return <Layout title={lang.DOCUMENT_TITLE_NOT_FOUND}>{lang.NOT_FOUND}</Layout>
}

export default NotFound
