import React from 'react'

import classes from './index.module.css'

const Backdrop = ({ isOpen, onClose }) => (
    <div className={`${classes.div__backdrop} ${isOpen ? classes.div__backdrop__active : null}`} onClick={onClose}>

    </div>
)

export default Backdrop