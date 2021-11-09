import * as actionTypes from './ActionTypes'

export const fetchPostsStart = () => {
    return {
        type: actionTypes.FETCH_POSTS_START
        }
}

export const fetchPostsSuccess = (data) => {
    return {
        type: actionTypes.FETCH_POSTS_SUCCESS,
        posts: data
    }
}

const onSortArrayByDate = (data) => (
    data.sort((itemA, itemB) => (
        new Date(itemB.created_at) - new Date(itemA.created_at)
    ))
)

export const onFetchPostDataHandler = () => (
    (dispatch) => {
        dispatch(fetchPostsStart())
        const postData = JSON.parse(localStorage.getItem('postsData')) || []
        dispatch(fetchPostsSuccess(onSortArrayByDate(postData)))
    }
)

export const onCreatePostHandler = (data) => (
    (dispatch) => {
        const postData = JSON.parse(localStorage.getItem('postsData')) || []
        postData.push(data)
        localStorage.setItem('postsData', JSON.stringify(postData))
        dispatch(onFetchPostDataHandler())
    }
)

export const onEditPostHandler = (postEditData) => (
    (dispatch) => {
        const postData = JSON.parse(localStorage.getItem('postsData'))
        const newPostData = postData.filter((post) => post.id !== postEditData.id)
        newPostData.push(postEditData)
        localStorage.setItem('postsData', JSON.stringify(newPostData))
        dispatch(onFetchPostDataHandler())
    }
)

export const onDeletePostHandler = (id) => (
    (dispatch) => {
        const postData = JSON.parse(localStorage.getItem('postsData'))
        const newPostData = postData.filter((post) => post.id !== id)
        localStorage.setItem('postsData', JSON.stringify(newPostData))
        dispatch(onFetchPostDataHandler())
    }
)