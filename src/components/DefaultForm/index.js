import React from 'react'

import InputTypeForm from '../InputTypeForm'

import classes from './index.module.css'

const DefaultForm = ({ formData, title, actionButtonLabel, shouldDisabledButton, onSubmit }) => (
    <form className={classes.form__defaultform__container} onSubmit={onSubmit}>
        <h4 className={classes.h4__defaultform__title}> {title} </h4>
        {
            formData.map((formInfo) => (
                <InputTypeForm key={formInfo.key} {...formInfo.config} />
            ))
        }
        <div className={classes.div__btnform__container}>
            <button
                type="submit"
                className={classes.btn__defaultform}
                disabled={shouldDisabledButton}> {actionButtonLabel} </button>
        </div>
    </form>
)


export default DefaultForm