import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'

import Routes from "./Routes";
import BasePage from './components/BasePage';

import * as actionsTypes from './actions/index'

import 'react-toastify/dist/ReactToastify.css'

const App = ({ onTryAutoSignup, isLogged, userName, logoutDispatch }) => {

  const [responsiveAsideIsOpen, setResponsiveAsideIsOpen] = useState(false)

  const navigationItemsMemo = useMemo(() => [
    { label: 'All posts', to: '/posts' },
    { label: 'Signup', to: '/signup', show: !isLogged },
    { label: `Hi ${`${userName.split('')[0]?.toUpperCase()}${userName.slice(1, userName.lenght)}`}`, show: isLogged },
    { label: 'Log out', show: isLogged, onClick: logoutDispatch },
  ], [isLogged, userName, logoutDispatch])

  const onOpenResponsiveAside = useCallback(() => {
    setResponsiveAsideIsOpen(true)
  }, [])

  const onCloseResponsiveAside = useCallback(() => {
    setResponsiveAsideIsOpen(false)
  }, [])

  useEffect(() => {
    onTryAutoSignup()
  }, [onTryAutoSignup])

  return (
    <div className="App">
      <BasePage
        navigationItemsMemo={navigationItemsMemo}
        isOpenReponsiveAside={responsiveAsideIsOpen}
        onOpenResponsiveAside={onOpenResponsiveAside}
        onCloseResponsiveAside={onCloseResponsiveAside}
      >
        <Routes />
      </BasePage>
      <ToastContainer position="top-center" />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
    userName: state.auth.userName
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actionsTypes.onTrySignin()),
    logoutDispatch: () => dispatch(actionsTypes.logout())
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(App)