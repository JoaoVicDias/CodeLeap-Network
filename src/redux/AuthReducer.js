import * as actionTypes from '../actions/ActionTypes'

const initialState = {
    isLogged: false,
    userName: ''
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_LOGIN:
            return {
                isLogged: action.logged,
                userName: action.userName
            }
        case actionTypes.AUTH_LOGOUT:
        return {
            isLogged: action.logged,
            userName: action.userName
        }

        default: 
        return state
    }
}       


export default reducer