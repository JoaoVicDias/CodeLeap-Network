import React from 'react'
import TimeAgo from 'react-timeago'
import { MdDeleteForever } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'

import classes from './index.module.css'

const PostItem = ({ id, title, username, created_datetime, content, loggedUserName, editHandler, deleteHanlder }) => (
    <article className={classes.article__postitem__container}>
        <div className={classes.div__postitem__header}>
            <h2 className={classes.h2__postitem__title}> {title} </h2>
            {
                loggedUserName.toUpperCase() === username.toUpperCase() ?
                    <div className={classes.div__postitem__actions__container}>
                        <MdDeleteForever onClick={() => deleteHanlder(id)} />
                        <BiEdit onClick={() => editHandler({ id, title, content, username })} />
                    </div>
                    : null
            }
        </div>
        <div className={classes.div__postitem__main}>
            <div className={classes.div__postitem__informations}>
                <strong className={classes.strong__postitem__username}> @{username} </strong>
                <small className={classes.small__postitem__created_at}> <TimeAgo date={new Date(created_datetime)} /></small>
            </div>
            <p className={classes.p__postitem__content}>
                {content}
            </p>
        </div>
    </article>
)

export default PostItem