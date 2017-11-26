/// <reference types="axios" />
import axios from 'axios';

import {
    REGISTRATION_START,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR
} from './constants';
import UserRegistrationInput from '../../app/models/UserRegistrationInput';
import ValidationFieldError from '../../app/validate/ValidationFieldError';

export type Actions = {
    REGISTRATION_START: {
        type: typeof REGISTRATION_START,
        payload: UserRegistrationInput
    },
    REGISTRATION_SUCCESS: {
        type: typeof REGISTRATION_SUCCESS,
        username: string
    },
    REGISTRATION_ERROR: {
        type: typeof REGISTRATION_ERROR,
        validationErrors: ValidationFieldError[]
    }
};

export const actionCreators = {
    registrationStart: (registerData: UserRegistrationInput): Actions[typeof REGISTRATION_START] => ({
        type: REGISTRATION_START,
        payload: registerData
    }),
    registrationSuccess: (username: string): Actions[typeof REGISTRATION_SUCCESS] => ({
        type: REGISTRATION_SUCCESS,
        username
    }),
    registrationError: (validationErrors: ValidationFieldError[]): Actions[typeof REGISTRATION_ERROR] => ({
        type: REGISTRATION_ERROR,
        validationErrors
    })
};

export const submitRegistrationData = (registrationData: UserRegistrationInput) => {
    return (dispatch: any) => {
        dispatch(actionCreators.registrationStart(registrationData));
        axios.post('/register', registrationData).then(response => {
            const {name} = response.data;
            dispatch(actionCreators.registrationSuccess(name));
            alert(`Пользователь ${name} успешно зарегистрирован.`);
        }).catch(error => {
            const validationErrors = <ValidationFieldError[]> error.response.data.validationErrors;
            dispatch(actionCreators.registrationError(validationErrors));
        });
    };
};