import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './index.module.css'

const MainHeaderNavigationItem = ({ label, to, onClick }) => (
    <li>
        {
            to
                ? <NavLink
                    exact
                    to={to}
                    className={classes.a__navigation__item}
                    activeClassName={classes.a__navigation__item__active}
                >
                    {
                        label
                    }
                </NavLink>
                : <span className={`${classes.span__navigation__item} ${onClick ? classes.span__navigation__hasclickfunction : ''}`} onClick={onClick}>
                    {label}
                </span>

        }
    </li>
)

export default MainHeaderNavigationItem