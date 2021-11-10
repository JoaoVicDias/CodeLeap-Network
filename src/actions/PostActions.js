import { toast } from 'react-toastify'
import axios from 'axios'

import CodeLeapApiLink from '../services/CodeLeapApiLink'
import * as actionTypes from './ActionTypes'


const onSortArrayByDate = (data) => (
    data.sort((itemA, itemB) => (
        new Date(itemB.created_datetime) - new Date(itemA.created_datetime)
    ))
)

export const fetchPostsStart = () => {
    return {
        type: actionTypes.FETCH_POSTS_START
    }
}

export const fetchPostsSuccess = (data) => {
    return {
        type: actionTypes.FETCH_POSTS_SUCCESS,
        posts: onSortArrayByDate(data.results),
        totalPosts: data.count
    }
}

export const fetchPostsFailed = () => {
    return {
        type: actionTypes.FETCH_POSTS_FAILED
    }
}

export const onFetchPostDataHandler = (linkToFetchData) => (
    async (dispatch) => {
        dispatch(fetchPostsStart())
        try {
            const postData = await axios.get(linkToFetchData)
            dispatch(fetchPostsSuccess(postData.data))
        } catch (error) {
            console.log(error)
            dispatch(fetchPostsFailed())
            toast.error('Something went wrong, try again later!')
        }
    }
)

export const onCreatePostHandler = (data, linkToFetchData) => (
    async (dispatch) => {
        try {
            await CodeLeapApiLink.post('/', data)
            dispatch(onFetchPostDataHandler(linkToFetchData))
            toast.success('Post created successfully!')
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong while creating a new post, try again later!')
        }
    }
)

export const onEditPostHandler = (postEditData, linkToFetchData) => (
    async (dispatch) => {
        const { id, data } = postEditData
        
        try {
            await CodeLeapApiLink.patch(`/${id}/`, data)
            dispatch(onFetchPostDataHandler(linkToFetchData))
            toast.success('Post edited successfully!')
        } catch (error) {
            console.log(error)
            toast.error('something went wrong while editing a new post, try again later!')
        }
    }
)

export const onDeletePostHandler = (id, linkToFetchData) => (
    async (dispatch) => {
        try {
            await CodeLeapApiLink.delete(`/${id}/`)
            dispatch(onFetchPostDataHandler(linkToFetchData))
            toast.success('Post deleted successfully!')
        } catch(error) {
            console.log(error)
            toast.error('something went wrong while deleting a new post, try again later!')
        }
    }
)