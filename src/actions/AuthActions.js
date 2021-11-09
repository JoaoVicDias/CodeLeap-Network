import * as actionTypes from './ActionTypes'

export const authSuccess = (userName) => ({
    type: actionTypes.AUTH_LOGIN,
    userName: userName,
    logged: true
})

export const authLogout = () => ({
    type: actionTypes.AUTH_LOGOUT,
    userName: '',
    logged: false
})


export const login = (userName) => (
    (dispatch) => {
        dispatch(authSuccess(userName))
        localStorage.setItem('userName', userName)
    }
)

export const logout = () => (
    (dispatch) => {
        dispatch(authLogout())
        localStorage.removeItem('userName')
    }
)

export const onTrySignin = () => (
    (dispatch) => {
        const userName = localStorage.getItem('userName')
        if (userName) {
            dispatch(login(userName))
        } else {
            dispatch(logout())
        }
    }
)