import * as actionTypes from '../actions/ActionTypes'

const initialState = {
    posts: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POSTS_START: 
            return {
                ...state,
                loading: true
            }

        case actionTypes.FETCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.posts,
                loading: false
            }

        default:
            return state
    }
}


export default reducer