import React, { useState, useMemo, useCallback, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

import DefaultForm from '../../components/DefaultForm'
import PostListItems from '../../components/PostsListItems'
import ModalEditPost from '../../components/ModalEditPost'
import ConfirmModal from '../../components/ConfirmModal'
import Filter from '../../components/Filter'

import ValidationFunction from '../../utils/ValidationFunction'

import * as actionsTypes from '../../actions/index'

import classes from './index.module.css'

const PostPage = ({ posts, onFetchPostDataHandler, onCreatePostHandler, userName, onEditPostHandler, onDeletePostHandler, loading, totalPosts }) => {

    let timeoutFilter = undefined
    const perPage = 10
    const pageCount = Math.ceil(totalPosts / perPage)
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
    const [modalToConfirmDeleteIsOpen, setModalToConfirmDeleteIsOpen] = useState(false)
    const [postIdToDelete, setPostIdToDelete] = useState('')
    const [linkToFetchData, setLinkToFetchData] = useState('https://dev.codeleap.co.uk/careers/?')
    const [queryParams, setQueryParams] = useState({
        paginationQueryParams: '',
        filterQueryParams: ''

    })
    const [currentPage, setCurrentPage] = useState(0)
    const [postForm, setPostForm] = useState({
        createpostForm: {
            title: {
                value: '',
                labelText: 'Title',
                inputType: 'text',
                name: 'title',
                placeHolder: 'Hello world',
                onChange: (event) => onChangeInputHandler(event, 'createpostForm'),
                isValid: false,
                isTouched: false,
                validationRules: {
                    required: true,
                }
            },
            content: {
                value: '',
                labelText: 'Content',
                inputType: 'textarea',
                name: 'content',
                placeHolder: 'Content here',
                onChange: (event) => onChangeInputHandler(event, 'createpostForm'),
                isValid: false,
                isTouched: false,
                validationRules: {
                    required: true,
                }
            },
        },
        editPostForm: {
            id: {
                value: '',
                isValid: false,
            },
            title: {
                value: '',
                labelText: 'Title',
                inputType: 'text',
                name: 'title',
                placeHolder: 'Hello world',
                onChange: (event) => onChangeInputHandler(event, 'editPostForm'),
                isValid: false,
                isTouched: false,
                validationRules: {
                    required: true,
                }
            },
            content: {
                value: '',
                labelText: 'Content',
                inputType: 'textarea',
                name: 'content',
                placeHolder: 'Content here',
                onChange: (event) => onChangeInputHandler(event, 'editPostForm'),
                isValid: false,
                isTouched: false,
                validationRules: {
                    required: true,
                }
            }
        }
    })

    const onClearInputsHandler = useCallback((objectKey) => {
        setPostForm((prevState) => {
            let newState = prevState

            for (let key in prevState[objectKey]) {
                newState = {
                    ...newState,
                    [objectKey]: {
                        ...newState[objectKey],
                        [key]: {
                            ...newState[objectKey][key],
                            value: '',
                            isValid: false,
                            isTouched: false,
                        }
                    }
                }
            }

            return newState
        })
    }, [])

    const onCloseEditModal = useCallback((event) => {
        if (event.target.id === 'backdrop') {
            setModalEditIsOpen(false)
            onClearInputsHandler('editPostForm')
        }
    }, [onClearInputsHandler])

    const onCloseConfirmToDeleteModal = useCallback((event) => {
        if (event.target.id === 'backdrop') {
            setModalToConfirmDeleteIsOpen(false)
            setPostIdToDelete('')
        }
    }, [])

    const onSubmitToCreatePostHandler = useCallback((event) => {
        event.preventDefault()

        if (!userName) return toast.error('You need to signup first!')

        const newPost = {
            username: `${userName.split('')[0].toUpperCase()}${userName.slice(1, userName.lenght)}`,
            title: postForm['createpostForm'].title.value.trim(),
            content: postForm['createpostForm'].content.value.trim()
        }
        setCurrentPage(0)
        onCreatePostHandler(newPost, 'https://dev.codeleap.co.uk/careers/?')
        onClearInputsHandler('createpostForm')
    }, [onCreatePostHandler, userName, onClearInputsHandler, postForm])

    const onSubmitToEditPostHandler = useCallback((event) => {
        event.preventDefault()

        onEditPostHandler({
            id: postForm.editPostForm.id.value,
            data: {
                title: postForm.editPostForm.title.value.trim(),
                content: postForm.editPostForm.content.value.trim()
            }
        }, linkToFetchData)

        onClearInputsHandler('editPostForm')
        setModalEditIsOpen(false)
    }, [onEditPostHandler, onClearInputsHandler, postForm, linkToFetchData])

    const createPostFormSettingsMemo = useMemo(() => {
        let formInputsConfig = []

        for (let key in postForm['createpostForm']) {
            formInputsConfig.push({
                key: key,
                config: {
                    ...postForm['createpostForm'][key]
                }
            })
        }

        const shouldDisabledButton = !formInputsConfig.every((inputType) => inputType.config.isValid)

        return {
            title: "What's on your mind?",
            formData: formInputsConfig,
            actionButtonLabel: 'create',
            shouldDisabledButton,
            onSubmit: (event) => onSubmitToCreatePostHandler(event)
        }
    }, [postForm, onSubmitToCreatePostHandler])

    const editcreatePostFormSettingsMemo = useMemo(() => {
        let formInputsConfig = []

        for (let key in postForm['editPostForm']) {
            formInputsConfig.push({
                key: key,
                config: {
                    ...postForm['editPostForm'][key]
                }
            })
        }

        const shouldDisabledButton = !formInputsConfig.every((inputType) => inputType.config.isValid)

        return {
            title: "Edit item",
            formData: formInputsConfig,
            actionButtonLabel: 'save',
            shouldDisabledButton,
            onSubmit: (event) => onSubmitToEditPostHandler(event)
        }
    }, [postForm, onSubmitToEditPostHandler])

    const onChangeInputHandler = useCallback((event, objectKey) => {

        return setPostForm((prevState) => ({
            ...prevState,
            [objectKey]: {
                ...prevState[objectKey],
                [event.target.name]: {
                    ...prevState[objectKey][event.target.name],
                    value: event.target.value,
                    isTouched: true,
                    isValid: ValidationFunction(event.target.value, prevState[objectKey][event.target.name].validationRules)
                }
            }
        })
        )
    }, [])

    const onOpenEditPostModal = useCallback((data) => {
        setPostForm((prevState) => {
            let newState = prevState

            for (let key in prevState['editPostForm']) {
                newState = {
                    ...newState,
                    'editPostForm': {
                        ...newState['editPostForm'],
                        [key]: {
                            ...newState['editPostForm'][key],
                            value: data[key],
                            isValid: true,
                            isTouched: true,
                        }
                    }
                }
            }

            return newState
        })
        setModalEditIsOpen(true)
    }, [])

    const onOpenConfirmModalToDeleteHandler = useCallback((id) => {
        setModalToConfirmDeleteIsOpen(true)
        setPostIdToDelete(id)
    }, [])

    const onSubmitToDeletePostHandler = useCallback((event) => {
        event.preventDefault()

        onDeletePostHandler(postIdToDelete, linkToFetchData)

        setPostIdToDelete('')
        setModalToConfirmDeleteIsOpen(false)
    }, [onDeletePostHandler, postIdToDelete, linkToFetchData])

    const filterConfigs = useMemo(() => [
        { label: 'Filter by username:', filterName: 'username' },
    ], [])

    const onChangeFilterHandler = useCallback((event, filterName) => {
        clearTimeout(timeoutFilter)

        // eslint-disable-next-line react-hooks/exhaustive-deps
        timeoutFilter = setTimeout(() => {
            if (event.target.value.trim().length > 0) {
                setQueryParams(({
                    paginationQueryParams: '',
                    filterQueryParams: `&${filterName}=${event.target.value.trim()}`
                }))
            } else {
                setQueryParams(({
                    paginationQueryParams: '',
                    filterQueryParams: ''
                }))
            }
            setCurrentPage(0)
        }, 500)
    }, [])

    const handlePageClick = useCallback(({ selected: selectedPage }) => {
        const offset = selectedPage * perPage;
        setCurrentPage(selectedPage);
        setQueryParams((prevState) => ({
            ...prevState,
            paginationQueryParams: `limit=${perPage}${offset > 0 ? `&offset=${offset}` : ''}`,
        }))
    }, [])

    useEffect(() => {
        setLinkToFetchData(`https://dev.codeleap.co.uk/careers/?${queryParams.paginationQueryParams}${queryParams.filterQueryParams}`)
    }, [queryParams])

    useEffect(() => {
        onFetchPostDataHandler(linkToFetchData)
    }, [onFetchPostDataHandler, linkToFetchData])

    return (
        <div className={classes.div__postpage__container}>
            <ModalEditPost
                isOpen={modalEditIsOpen}
                onClose={onCloseEditModal}
                editPostForm={editcreatePostFormSettingsMemo}
            />
            <ConfirmModal
                title="Are you shure you want to delete this item?"
                isOpen={modalToConfirmDeleteIsOpen}
                onClose={onCloseConfirmToDeleteModal}
                onCancel={(event) => { event.preventDefault(); setModalToConfirmDeleteIsOpen(false); setPostIdToDelete('') }}
                onConfirm={(event) => onSubmitToDeletePostHandler(event)}
            />
            <DefaultForm {...createPostFormSettingsMemo} />
            <Filter filterConfigs={filterConfigs} onFilterHandler={onChangeFilterHandler} />
            {
                loading
                    ? <h2 className={classes.h2__loading__message}> Loading... </h2>
                    : <PostListItems
                        postList={posts}
                        userName={userName}
                        editHandler={onOpenEditPostModal}
                        deleteHanlder={onOpenConfirmModalToDeleteHandler}
                    />
            }

            {
                posts.length === 0 && !loading ? <h2 className={classes.h2__notfound__message}> No posts were found! </h2> : null
            }

            <ReactPaginate
                pageRangeDisplayed={3}
                breakLabel="..."
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={classes.pagination__container}
                previousLinkClassName={classes.pagination__link}
                nextLinkClassName={classes.pagination__link}
                disabledClassName={classes.pagination__link__disabled}
                activeClassName={classes.pagination__link__active}
                pageClassName={classes.pagination__pages}
                forcePage={pageCount > 0 ? currentPage : undefined}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts.posts,
        userName: state.auth.userName,
        loading: state.posts.loading,
        totalPosts: state.posts.totalPosts
    }
}

const mapDispacthToProps = (dispatch) => {
    return {
        onFetchPostDataHandler: (linkToFetchData) => dispatch(actionsTypes.onFetchPostDataHandler(linkToFetchData)),
        onCreatePostHandler: (data, linkToFetchData) => dispatch(actionsTypes.onCreatePostHandler(data, linkToFetchData)),
        onEditPostHandler: (data, linkToFetchData) => dispatch(actionsTypes.onEditPostHandler(data, linkToFetchData)),
        onDeletePostHandler: (id, linkToFetchData) => dispatch(actionsTypes.onDeletePostHandler(id, linkToFetchData))
    }
}

export default connect(mapStateToProps, mapDispacthToProps)(PostPage)
