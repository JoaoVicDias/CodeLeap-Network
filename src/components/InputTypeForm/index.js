import React, { useMemo } from 'react'

import classes from './index.module.css'

const InputTypeForm = ({ labelText, inputType, onChange, placeHolder, value, name, isValid, isTouched }) => {

    const inputTypeFormContainerMemo = useMemo(() => {
        switch (inputType) {
            case 'text':
                return (
                    <div className={classes.div__inputtypeform__container}>
                        <label className={classes.label__inputtypeform}> {labelText} </label>
                        <input
                            type={inputType}
                            className={`${classes.input__inputtypeform__text} ${isTouched && !isValid ? classes.input__inputtypeformerror__text : ''}`}
                            onChange={onChange}
                            placeholder={placeHolder}
                            value={value}
                            name={name}
                        />
                    </div>
                )


            case 'textarea':
                return (
                    <div className={classes.div__inputtypeform__container}>
                        <label className={classes.label__inputtypeform}> {labelText} </label>
                        <textarea
                            className={`${classes.input__inputtypeform__text} ${isTouched && !isValid ? classes.input__inputtypeformerror__text : ''}`}
                            onChange={onChange}
                            placeholder={placeHolder}
                            value={value}
                            name={name}
                        />
                    </div>
                )


            default:
                return null
        }
    }, [inputType, isTouched, isValid, labelText, name, onChange, placeHolder, value])


    return inputTypeFormContainerMemo

}

export default InputTypeForm