import React from 'react'

import classes from './index.module.css'

const Modal = ({ isOpen, onClose, children }) => (
    <div
        className={`${classes.div__modal__container} ${isOpen ? classes.div__modal__container__open : ''}`}
        onClick={(event) => onClose(event)}
        id="backdrop"
    >
        {children}
    </div>
)

export default Modal