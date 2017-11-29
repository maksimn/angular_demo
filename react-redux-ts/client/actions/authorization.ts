/// <reference types="axios" />
import axios from 'axios';
import {
    REGISTRATION_START,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from './constants';
import UserRegistrationInput from '../../app/models/UserRegistrationInput';
import UserDataInput from '../../app/models/UserDataInput';
import UserView from '../../app/models/UserView';
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
    },
    LOGIN_START: {
        type: typeof LOGIN_START,
        payload: UserDataInput
    },
    LOGIN_SUCCESS: {
        type: typeof LOGIN_SUCCESS,
        user: UserView
    },
    LOGIN_ERROR: {
        type: typeof LOGIN_ERROR,
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
    }),

    loginStart: (loginData: UserDataInput): AuthActions[typeof LOGIN_START] => ({
        type: LOGIN_START,
        payload: loginData
    }),
    loginSuccess: (user: UserView): AuthActions[typeof LOGIN_SUCCESS] => ({
        type: LOGIN_SUCCESS,
        user
    }),
    loginError: (validationErrors: ValidationFieldError[]): AuthActions[typeof LOGIN_ERROR] => ({
        type: LOGIN_ERROR,
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



export const login = (loginData: UserDataInput) => {
    return (dispatch: any) => {
        dispatch(authActionCreators.loginStart(loginData));
        axios.post('/login', loginData).then(response => {
            const user = <UserView> response.data;
            user.token = response.headers['x-auth'];
            dispatch(authActionCreators.loginSuccess(user));
        }).catch(error => {
            const validationErrors = <ValidationFieldError[]> error.response.data.validationErrors;
            dispatch(authActionCreators.loginError(validationErrors));
        });
    }
};