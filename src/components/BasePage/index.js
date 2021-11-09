import React from 'react'

import Content from '../Content'
import MainHeader from '../MainHeader'
import SideDrawer from '../SideDrawer'
import Backdrop from '../Backdrop'

import classes from './index.module.css'

const BasePage = ({ navigationItemsMemo, onOpenResponsiveAside, isOpenReponsiveAside, onCloseResponsiveAside, children }) => (
    <div className={classes.div__basepage__container}>
        <Backdrop
            isOpen={isOpenReponsiveAside}
            onClose={onCloseResponsiveAside} />
        <SideDrawer
            navigationItemsMemo={navigationItemsMemo}
            isOpen={isOpenReponsiveAside}
            onClose={onCloseResponsiveAside}
        />
        <MainHeader navigationItemsMemo={navigationItemsMemo} onOpenResponsiveAside={onOpenResponsiveAside} />
        <Content>
            {
                children
            }
        </Content>
    </div>
)


export default BasePage