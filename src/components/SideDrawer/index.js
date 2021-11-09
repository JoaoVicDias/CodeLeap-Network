import React from 'react'

import MainHeaderNavigation from '../MainHeaderNavigation'

import classes from './index.module.css'

const SideDrawer = ({ isOpen, navigationItemsMemo }) => (
    <aside className={`${classes.aside__sidedrawer} ${isOpen ? classes.aside__sidedrawer__active : null}`}>
        <MainHeaderNavigation navigationItems={navigationItemsMemo}/>
    </aside>
)

export default SideDrawer