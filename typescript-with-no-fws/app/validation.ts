import UserDataInput from './models/UserDataInput';
import UserRegistrationInput from './models/UserRegistrationInput';
import ValidationFieldError from './validate/ValidationFieldError';
const validator = require('validator');

function validateRegistrationData (registrationData: UserRegistrationInput) : ValidationFieldError[] {
    let {username, password, confirmPassword} = registrationData;
    const validationErrors: ValidationFieldError[] = [];

    if (!validator.isAlpha(username)) {
        validationErrors.push({
            field: 'username',
            errorMessage: 'Имя пользователя может содержать только латинские символы'
        });
    }
    if (!validator.isLength(username, { min: 2, max: 30 })) {
        validationErrors.push({
            field: 'username',
            errorMessage: 'Имя пользователя не должно содержать менее 2 и более 30 символов'
        });
    }
    if (!validator.isAlphanumeric(password)) {
        validationErrors.push({
            field: 'password',
            errorMessage: 'Пароль может содержать только латинские символы или числа'
        });
    }
    if (!validator.isLength(password, { min: 4, max: 25 })) {
        validationErrors.push({
            field: 'password',
            errorMessage: 'Пароль должен содержать не менее 4 и не более 25 символов'
        });
    }
    if (password != confirmPassword) {
        validationErrors.push({
            field: 'confirmPassword',
            errorMessage: 'Пароль и его повтор должны совпадать'
        });
    }

    return validationErrors;
};

const validateLoginData = (loginData: UserDataInput) : ValidationFieldError[] => {
    let {username, password} = loginData;
    const validationErrors: ValidationFieldError[] = [];

    username = validator.trim(username);
    password = validator.trim(password);

    if (validator.isEmpty(username)) {
        validationErrors.push({
            field: 'username',
            errorMessage: `Имя пользователя должно быть задано`
        });             
    }
    if (validator.isEmpty(password)) {
        validationErrors.push({
            field: 'password',
            errorMessage: `Пароль должен быть задан`
        });
    }

    return validationErrors;
};

export {validateLoginData, validateRegistrationData};