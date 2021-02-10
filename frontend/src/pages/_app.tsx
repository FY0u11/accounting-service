import NProgress from 'nprogress'
import Router from 'next/router'
import '../styles/default.css'
import 'nprogress/nprogress.css'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App
