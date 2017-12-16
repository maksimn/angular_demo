/// <reference types="validator" />
import * as validator from 'validator';
import UserDataInput from './models/UserDataInput';
import UserRegistrationInput from './models/UserRegistrationInput';
import ValidationErrors from './models/ValidationErrors';

function validateRegistrationData (registrationData: UserRegistrationInput): ValidationErrors {
    let {username, password, confirmPassword} = registrationData;
    const validationErrors: ValidationErrors = {
        errors: []
    },
    { errors } = validationErrors;

    if (!validator.isAlpha(username)) {
        errors.push('Имя пользователя может содержать только латинские символы');
    }
    if (!validator.isLength(username, { min: 2, max: 30 })) {
        errors.push('Имя пользователя не должно содержать менее 2 и более 30 символов');
    }
    if (!validator.isAlphanumeric(password)) {
        errors.push('Пароль может содержать только латинские символы или числа');
    }
    if (!validator.isLength(password, { min: 4, max: 25 })) {
        errors.push('Пароль должен содержать не менее 4 и не более 25 символов');
    }
    if (password !== confirmPassword) {
        errors.push('Пароль и его повтор должны совпадать');
    }

    return validationErrors;
}

const validateLoginData = (loginData: UserDataInput): ValidationErrors => {
    let {username, password} = loginData;
    const validationErrors: ValidationErrors = {
        errors: []
    },
    { errors } = validationErrors;

    username = validator.trim(username);
    password = validator.trim(password);

    if (validator.isEmpty(username)) {
        errors.push(`Имя пользователя должно быть задано`);
    }
    if (validator.isEmpty(password)) {
        errors.push(`Пароль должен быть задан`);
    }

    return validationErrors;
};

export { validateLoginData, validateRegistrationData };