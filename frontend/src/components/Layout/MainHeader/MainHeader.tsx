import classNames                                 from 'classnames'
import Link                                       from 'next/link'
import { useRouter }                              from 'next/router'
import React, { useContext, useEffect, useState } from 'react'

import { ModalWindow, PaymentForm }               from 'components'
import { useLogoutHandler }                       from 'hooks'
import styles                                     from './MainHeader.module.css'
import { AppContext }                             from '../../../context/AppContext'
import { actions }                                from '../../../store/actions'

const MainHeader = () => {
  const { state, setState }                             = useContext(AppContext)
  const router                                          = useRouter()
  const [isPaymentModalOpened, setIsPaymentModalOpened] = useState(false)
  const logoutHandler                                   = useLogoutHandler()
  const months                                          = [
    state.enums.MONTHS_JAN,
    state.enums.MONTHS_FEB,
    state.enums.MONTHS_MAR,
    state.enums.MONTHS_APR,
    state.enums.MONTHS_MAY,
    state.enums.MONTHS_JUN,
    state.enums.MONTHS_JUL,
    state.enums.MONTHS_AUG,
    state.enums.MONTHS_SEP,
    state.enums.MONTHS_OCT,
    state.enums.MONTHS_NOV,
    state.enums.MONTHS_DEC
  ]

  useEffect(() => {
    const sidenav = document.querySelector('.sidenav')
    M.Sidenav.init(sidenav)
    if (router.pathname !== '/') return
    const elems = document.querySelectorAll('.dropdown-trigger')
    M.Dropdown.init(elems)
  }, [])

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
                <a onClick={() => setState(actions.setAppChosenMonth(month))}>{months[+month - 1]}</a>
              </li>
            ))}
          </ul>
          <ul id="mobile-months" className="dropdown-content">
            {state.app.months.map(month => (
              <li key={month}>
                <a onClick={() => setState(actions.setAppChosenMonth(month))}>{months[+month - 1]}</a>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <ul className="sidenav" id="mobile-demo">
        {router.pathname === '/' ? (
          <li>
            <a className="dropdown-trigger" data-target="mobile-years">
              {state.app.chosenYear || state.enums.SELECT_YEAR}
              <i className="material-icons right">arrow_drop_down</i>
            </a>
          </li>
        ) : null}
        {router.pathname === '/' ? (
          <li>
            <a className="dropdown-trigger" data-target="mobile-months">
              {months[+state.app.chosenMonth - 1] || state.enums.SELECT_MONTH}
              <i className="material-icons right">arrow_drop_down</i>
            </a>
          </li>
        ) : null}
        <li>
          <a onClick={() => setIsPaymentModalOpened(true)}>{state.enums.ADD_BUTTON}</a>
        </li>
        <li>
          <Link href="/settings">{state.user.username}</Link>
        </li>
        <li>
          <a onClick={logoutHandler}>{state.enums.LOGOUT}</a>
        </li>
      </ul>

      <nav className={classNames(styles.container, 'grey darken-4')}>
        <div className="nav-wrapper">
          <Link href="/">
            <span className={classNames('brand-logo', 'pointer', styles.logo)}>Accounting App</span>
          </Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            {router.pathname === '/' ? (
              <li>
                <a className="dropdown-trigger" data-target="years">
                  {state.app.chosenYear || state.enums.SELECT_YEAR}
                  <i className="material-icons right">arrow_drop_down</i>
                </a>
              </li>
            ) : null}
            {router.pathname === '/' ? (
              <li>
                <a className="dropdown-trigger" data-target="months">
                  {months[+state.app.chosenMonth - 1] || state.enums.SELECT_MONTH}
                  <i className="material-icons right">arrow_drop_down</i>
                </a>
              </li>
            ) : null}
            <li>
              <a onClick={() => setIsPaymentModalOpened(true)}>{state.enums.ADD_BUTTON}</a>
            </li>
            <li>
              <Link href="/settings">{state.user.username}</Link>
            </li>
            <li>
              <a onClick={logoutHandler}>{state.enums.LOGOUT}</a>
            </li>
          </ul>
        </div>
      </nav>

      <ModalWindow
        isModalOpened={isPaymentModalOpened}
        setIsModalOpened={setIsPaymentModalOpened}
        title={state.enums.MODAL_ADD_PAYMENT}
      >
        <PaymentForm />
      </ModalWindow>
    </div>
  )
}

export default MainHeader
