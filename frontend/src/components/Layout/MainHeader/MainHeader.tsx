import { useLanguage, useLogoutHandler } from 'hooks'
import { AppContext } from '../../../context/AppContext'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { ModalWindow, PaymentForm } from 'components'
import { actions } from '../../../store/actions'
import { useRouter } from 'next/router'
import styles from './MainHeader.module.css'
import classNames from 'classnames'

const MainHeader = () => {
  const { lang } = useLanguage()
  const { state, setState } = useContext(AppContext)
  const logoutHandler = useLogoutHandler()
  const [isPaymentModalOpened, setIsPaymentModalOpened] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const sidenav = document.querySelector('.sidenav')
    M.Sidenav.init(sidenav)
    if (router.pathname !== '/') return
    const elems = document.querySelectorAll('.dropdown-trigger')
    M.Dropdown.init(elems)
  }, [])

  const months = [
    lang.MONTHS_JAN,
    lang.MONTHS_FEB,
    lang.MONTHS_MAR,
    lang.MONTHS_APR,
    lang.MONTHS_MAY,
    lang.MONTHS_JUN,
    lang.MONTHS_JUL,
    lang.MONTHS_AUG,
    lang.MONTHS_SEP,
    lang.MONTHS_OCT,
    lang.MONTHS_NOV,
    lang.MONTHS_DEC
  ]

  return (
    <div className="col s12">
      {router.pathname === '/' ? (
        <>
          <ul id="years" className="dropdown-content">
            {state.app.years.map(year => (
              <li key={year}>
                <a onClick={() => setState(actions.setAppChosenYear(year))}>{year}</a>
              </li>
            ))}
          </ul>
          <ul id="mobile-years" className="dropdown-content">
            {state.app.years.map(year => (
              <li key={year}>
                <a onClick={() => setState(actions.setAppChosenYear(year))}>{year}</a>
              </li>
            ))}
          </ul>
          <ul id="months" className="dropdown-content">
            {state.app.months.map(month => (
              <li key={month}>
                <a onClick={() => setState(actions.setAppChosenMonth(month))}>{months[month - 1]}</a>
              </li>
            ))}
          </ul>
          <ul id="mobile-months" className="dropdown-content">
            {state.app.months.map(month => (
              <li key={month}>
                <a onClick={() => setState(actions.setAppChosenMonth(month))}>{months[month - 1]}</a>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <ul className="sidenav" id="mobile-demo">
        {router.pathname === '/' ? (
          <li>
            <a className="dropdown-trigger" data-target="mobile-years">
              {state.app.chosenYear || lang.SELECT_YEAR}
              <i className="material-icons right">arrow_drop_down</i>
            </a>
          </li>
        ) : null}
        {router.pathname === '/' ? (
          <li>
            <a className="dropdown-trigger" data-target="mobile-months">
              {months[+state.app.chosenMonth - 1] || lang.SELECT_MONTH}
              <i className="material-icons right">arrow_drop_down</i>
            </a>
          </li>
        ) : null}
        <li>
          <a onClick={() => setIsPaymentModalOpened(true)}>{lang.ADD_BUTTON}</a>
        </li>
        <li>
          <Link href="/settings">{state.user.username}</Link>
        </li>
        <li>
          <a onClick={logoutHandler}>{lang.LOGOUT}</a>
        </li>
      </ul>

      <nav className={classNames(styles.container, 'grey darken-4')}>
        <div className="nav-wrapper">
          <Link href="/">
            <span className="brand-logo pointer">Accounting App</span>
          </Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            {router.pathname === '/' ? (
              <li>
                <a className="dropdown-trigger" data-target="years">
                  {state.app.chosenYear || lang.SELECT_YEAR}
                  <i className="material-icons right">arrow_drop_down</i>
                </a>
              </li>
            ) : null}
            {router.pathname === '/' ? (
              <li>
                <a className="dropdown-trigger" data-target="months">
                  {months[+state.app.chosenMonth - 1] || lang.SELECT_MONTH}
                  <i className="material-icons right">arrow_drop_down</i>
                </a>
              </li>
            ) : null}
            <li>
              <a onClick={() => setIsPaymentModalOpened(true)}>{lang.ADD_BUTTON}</a>
            </li>
            <li>
              <Link href="/settings">{state.user.username}</Link>
            </li>
            <li>
              <a onClick={logoutHandler}>{lang.LOGOUT}</a>
            </li>
          </ul>
        </div>
      </nav>

      <ModalWindow
        isModalOpened={isPaymentModalOpened}
        setIsModalOpened={setIsPaymentModalOpened}
        title={lang.MODAL_ADD_PAYMENT}
      >
        <PaymentForm />
      </ModalWindow>
    </div>
  )
}

export default MainHeader
