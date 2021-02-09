import Head from 'next/head'
import { useState } from 'react'
import ModalWindow from '../../ModalWindow/ModalWindow'
import PaymentForm from '../../PaymentForm/PaymentForm'
import styles from './DetailsLayout.module.css'

const DetailsLayout = ({ title = '', addPaymentHandler, children }) => {
  const [isModalOpened, setIsModalOpened] = useState(false)
  return (
    <div className={styles.container}>
      <Head>
        <title>App{title ? ` | ${title}` : null}</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header className={styles.header}>
        <button onClick={() => setIsModalOpened(true)}>Добавить</button>

        {isModalOpened ? (
          <ModalWindow
            setIsModalOpened={setIsModalOpened}
            title="Добавить оплату"
          >
            <PaymentForm
              addPaymentHandler={addPaymentHandler}
              setIsModalOpened={setIsModalOpened}
            />
          </ModalWindow>
        ) : null}
      </header>
      <main className={styles.main}>
        <div className="content">{children}</div>
      </main>
      <footer className={styles.footer}>footer</footer>
    </div>
  )
}

export default DetailsLayout
