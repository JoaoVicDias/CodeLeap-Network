import React, { useState, useMemo, useCallback, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { connect } from 'react-redux'
import { v4 } from 'uuid'
import { toast } from 'react-toastify'

import DefaultForm from '../../components/DefaultForm'
import PostListItems from '../../components/PostsListItems'
import ModalEditPost from '../../components/ModalEditPost'
import ConfirmModal from '../../components/ConfirmModal'
import Filter from '../../components/Filter'

import ValidationFunction from '../../utils/ValidationFunction'

import * as actionsTypes from '../../actions/index'

import classes from './index.module.css'

const PostPage = ({ posts, onFetchPostDataHandler, onCreatePostHandler, userName, onEditPostHandler, onDeletePostHandler, loading }) => {

    const perPage = 4
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
    const [modalToConfirmDeleteIsOpen, setModalToConfirmDeleteIsOpen] = useState(false)
    const [postIdToDelete, setPostIdToDelete] = useState('')
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
            },
            postUserName: {
                value: '',
                isValid: false
            },
            created_at: {
                value: '',
                isValid: false,
            }
        }
    })
    const [filter, setFilter] = useState({})
    const [filteredData, setFilteredData] = useState([])
    const pageCount = Math.ceil(filteredData.length / perPage)
    const [currentPageData, setCurrentPageData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [offset, setOffset] = useState(0)

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
        }
    }, [])

    const onCloseConfirmToDeleteModal = useCallback((event) => {
        if (event.target.id === 'backdrop') {
            setModalToConfirmDeleteIsOpen(false)
        }
    }, [])

    const onSubmitToCreatePostHandler = useCallback((event) => {
        event.preventDefault()

        if (!userName) return toast.error('You need to signup first!')

        const newPost = {
            id: v4(),
            postUserName: `${userName.split('')[0].toUpperCase()}${userName.slice(1, userName.lenght)}`,
            title: postForm['createpostForm'].title.value.trim(),
            content: postForm['createpostForm'].content.value.trim(),
            created_at: new Date().toISOString()
        }

        onCreatePostHandler(newPost)
        onClearInputsHandler('createpostForm')
        setCurrentPage(0)
        toast.success('Post created successfully!')
    }, [onCreatePostHandler, userName, onClearInputsHandler, postForm])

    const onSubmitToEditPostHandler = useCallback((event) => {
        event.preventDefault()

        onEditPostHandler({
            id: postForm.editPostForm.id.value,
            title: postForm.editPostForm.title.value.trim(),
            content: postForm.editPostForm.content.value.trim(),
            postUserName: `${postForm.editPostForm.postUserName.value.split('')[0].toUpperCase()}${postForm.editPostForm.postUserName.value.slice(1, postForm.editPostForm.postUserName.value.lenght)}`,
            created_at: postForm.editPostForm.created_at.value,
        })

        onClearInputsHandler('editPostForm')
        setModalEditIsOpen(false)
        toast.success('Post edited successfully!')
    }, [onEditPostHandler, onClearInputsHandler, postForm])

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

        onDeletePostHandler(postIdToDelete)

        toast.success('Post successfully deleted')
        setPostIdToDelete('')
        setModalToConfirmDeleteIsOpen(false)
    }, [onDeletePostHandler, postIdToDelete])

    const handlePageClick = useCallback(({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    }, [])

    const onSetFilterHandler = useCallback((event, filterName) => {
        setFilter((prevState) => ({
            ...prevState,
            [filterName]: event.target.value.trim()
        }))
    }, [])

    const onFilterHandler = useCallback(() => {
        setFilteredData(
            Object.entries(filter).reduce((post, [key, value]) => {
                return post.filter((post) => post[key].toLowerCase().trim().includes(value.toLowerCase()))
            }, posts)
        )

        setCurrentPage(0)
    }, [filter, posts])

    const filterConfigs = useMemo(() => [
        { label: 'Filter by title:', filterName: 'title' },
        { label: 'Filter by username:', filterName: 'postUserName' },
    ], [])

    useEffect(() => {
        onFetchPostDataHandler()
    }, [onFetchPostDataHandler])

    useEffect(() => {
        setFilteredData(posts)
    }, [posts])

    useEffect(() => {
        onFilterHandler()
    }, [filter, onFilterHandler])

    useEffect(() => {
        setOffset(currentPage * perPage)
    }, [currentPage])

    useEffect(() => {
        setCurrentPageData(filteredData.slice(offset, offset + perPage))
    }, [offset, filteredData])

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
                onCancel={(event) => { event.preventDefault(); setModalToConfirmDeleteIsOpen(false) }}
                onConfirm={(event) => onSubmitToDeletePostHandler(event)}
            />
            <DefaultForm {...createPostFormSettingsMemo} />
            <Filter filterConfigs={filterConfigs} onFilterHandler={onSetFilterHandler} />
            {
                loading ? <h2 className={classes.h2__loading__message}> Loading... </h2> : null
            }
            {
                currentPageData.length === 0 && !loading ? <h2 className={classes.h2__notfound__message}> No posts were found! </h2> : null
            }
            <PostListItems
                postList={currentPageData}
                userName={userName}
                editHandler={onOpenEditPostModal}
                deleteHanlder={onOpenConfirmModalToDeleteHandler}
            />
            {
                currentPageData.length === 0 && !loading
                    ? null
                    : <ReactPaginate
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
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts.posts,
        userName: state.auth.userName,
        loading: state.posts.loading
    }
}

const mapDispacthToProps = (dispatch) => {
    return {
        onFetchPostDataHandler: () => dispatch(actionsTypes.onFetchPostDataHandler()),
        onCreatePostHandler: (data) => dispatch(actionsTypes.onCreatePostHandler(data)),
        onEditPostHandler: (data) => dispatch(actionsTypes.onEditPostHandler(data)),
        onDeletePostHandler: (id) => dispatch(actionsTypes.onDeletePostHandler(id))
    }
}

export default connect(mapStateToProps, mapDispacthToProps)(PostPage)
