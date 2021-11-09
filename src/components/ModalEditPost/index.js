import React from 'react'
import DefaultForm from '../DefaultForm'

import Modal from '../Modal'

import classes from './index.module.css'

const ModalEditPost = ({ isOpen, onClose, editPostForm }) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className={classes.div__modaleditpost__container}>
            <DefaultForm {...editPostForm} />
        </div>
    </Modal>
)

export default ModalEditPost