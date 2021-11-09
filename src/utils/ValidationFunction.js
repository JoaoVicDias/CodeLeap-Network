const ValidationFunction = (value, validationRules) => {
    let isValid = true


    if(validationRules.required) {
        isValid = value.trim().length > 0 && isValid
    }

    if(validationRules.withoutSpecialCharacter) {
        isValid = !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value) && isValid
    }

    return isValid
}

export default ValidationFunction