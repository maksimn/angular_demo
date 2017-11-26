/// <reference types="axios" />
import axios from 'axios';
import {
    REGISTRATION_START,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR
} from './constants';
import UserRegistrationInput from '../../app/models/UserRegistrationInput';
import ValidationFieldError from '../../app/validate/ValidationFieldError';

export type AuthActions = {
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

export const authActionCreators = {
    registrationStart: (registerData: UserRegistrationInput): AuthActions[typeof REGISTRATION_START] => ({
        type: REGISTRATION_START,
        payload: registerData
    }),
    registrationSuccess: (username: string): AuthActions[typeof REGISTRATION_SUCCESS] => ({
        type: REGISTRATION_SUCCESS,
        username
    }),
    registrationError: (validationErrors: ValidationFieldError[]): AuthActions[typeof REGISTRATION_ERROR] => ({
        type: REGISTRATION_ERROR,
        validationErrors
    })
};

export const submitRegistrationData = (registrationData: UserRegistrationInput,
                                       redirectCallback: () => void) => {
    return (dispatch: any) => {
        dispatch(authActionCreators.registrationStart(registrationData));
        axios.post('/register', registrationData).then(response => {
            const {name} = response.data;
            dispatch(authActionCreators.registrationSuccess(name));
            alert(`Пользователь ${name} успешно зарегистрирован.`);
            redirectCallback();
        }).catch(error => {
            const validationErrors = <ValidationFieldError[]> error.response.data.validationErrors;
            dispatch(authActionCreators.registrationError(validationErrors));
        });
    };
};