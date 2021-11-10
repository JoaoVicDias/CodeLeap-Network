import React from 'react'

import PostItem from '../PostItem'

import classes from './index.module.css'

const PostsListItems = ({ postList, userName, editHandler, deleteHanlder }) => (
    <section className={classes.section__postlist}>
        {
            postList.map((post) => (
                <PostItem
                    key={post.id}
                    loggedUserName={userName}
                    editHandler={editHandler}
                    deleteHanlder={deleteHanlder}
                    {...post}
                />
            ))
        }
    </section>
)


export default PostsListItems