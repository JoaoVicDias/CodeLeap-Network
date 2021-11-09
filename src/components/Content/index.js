import React from 'react'

import classes from './index.module.css'

const Content = ({ children }) => (
    <main className={classes.main__content__container}>
        {
            children
        }
    </main>
)


export default Content