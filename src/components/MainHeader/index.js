import React from 'react'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'

import MainHeaderNavigation from '../MainHeaderNavigation'

import classes from './index.module.css'

const MainHeader = ({ navigationItemsMemo, onOpenResponsiveAside }) => (
    <header className={classes.header__container}>
        <strong className={classes.strong__brand}>
            <Link to="/">
                CodeLeap Network
            </Link>
        </strong>
        <GiHamburgerMenu className={classes.svg__hamburger} onClick={onOpenResponsiveAside} />
        <div className={classes.div__navigation}>
            <MainHeaderNavigation navigationItems={navigationItemsMemo} />
        </div>
    </header>
)


export default MainHeader