import React, { useState, useMemo, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

import DefaultForm from '../../components/DefaultForm'

import ValidationFunction from '../../utils/ValidationFunction'

import * as actionsTypes from '../../actions/index'

import classes from './index.module.css'

const Signup = ({ onLogin, isLogged }) => {

    const [signupForm, setSignupForm] = useState({
        userName: {
            value: '',
            labelText: 'Please enter your username',
            inputType: 'text',
            name: 'userName',
            placeHolder: 'John doe',
            onChange: (event) => onChangeInputHandler(event),
            isValid: false,
            isTouched: false,
            validationRules: {
                required: true,
                withoutSpecialCharacter: true
            }
        }
    })

    const onSubmitHandler = useCallback((event) => {
        event.preventDefault()

        onLogin(signupForm.userName.value.trim())
        toast.success(`Welcome ${signupForm.userName.value}!`)
    }, [onLogin, signupForm])

    const signupFormSettingsMemo = useMemo(() => {
        let formInputsConfig = []

        for (let key in signupForm) {
            formInputsConfig.push({
                key: key,
                config: {
                    ...signupForm[key]
                }
            })
        }

        const shouldDisabledButton = !formInputsConfig.every((inputType) => inputType.config.isValid)

        return {
            title: 'Welcome to CodeLeap network',
            formData: formInputsConfig,
            actionButtonLabel: 'enter',
            shouldDisabledButton,
            onSubmit: (event) => onSubmitHandler(event)
        }
    }, [signupForm, onSubmitHandler])


    const onChangeInputHandler = useCallback((event) => {
        return setSignupForm((prevState) => ({
            ...prevState,
            [event.target.name]: {
                ...prevState[event.target.name],
                value: event.target.value,
                isTouched: true,
                isValid: ValidationFunction(event.target.value, prevState[event.target.name].validationRules)
            }
        })
        )
    }, [])

    return (
        <div className={classes.div__signup__container}>
            {isLogged && <Redirect to='/posts' />}
            <div className={classes.div__signup__form}>
                <DefaultForm {...signupFormSettingsMemo} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.auth.isLogged
    }
}

const mapDispathToProps = dispath => {
    return {
        onLogin: (userName) => dispath(actionsTypes.login(userName))
    }
}

export default connect(mapStateToProps, mapDispathToProps)(Signup)
