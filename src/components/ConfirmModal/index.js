import React from 'react'

import Modal from '../Modal'

import classes from './index.module.css'

const ConfirmModal = ({ isOpen, onClose, title, onCancel, onConfirm }) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <form className={classes.form__confirmmodal__container}>
            <h4 className={classes.h4__confirmmodal__title}>
                {title}
            </h4>
            <div className={classes.div__confirmmodal__buttons}>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onConfirm}>OK</button>
            </div>
        </form>
    </Modal>
)


export default ConfirmModal