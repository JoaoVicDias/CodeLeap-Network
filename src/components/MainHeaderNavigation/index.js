import React from 'react'

import MainHeaderNavigationItem from '../MainHeaderNavigationItem/index'

import classes from './index.module.css'

const MainHeaderNavigation = ({ navigationItems }) => (
        <nav className={classes.nav__headernavigations__container}>
            <ul className={classes.ul__navigation__items}>
                {
                    navigationItems.map((navigationItem) => {
                        if (navigationItem?.show === false) return null
                        return <MainHeaderNavigationItem key={navigationItem.label} {...navigationItem} />
                    })
                }
            </ul>
        </nav>
    )

export default MainHeaderNavigation