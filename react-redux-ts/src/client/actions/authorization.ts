import {
    REGISTRATION_START, REGISTRATION_SUCCESS, REGISTRATION_ERROR,
    LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR,
    LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_ERROR,
    AUTH_START, AUTH_SUCCESS, AUTH_ERROR
} from './constants';
import UserRegistrationInput from '../../app/models/UserRegistrationInput';
import UserDataInput from '../../app/models/UserDataInput';
import UserView from '../../app/models/UserView';
import ValidationErrors from '../../app/models/ValidationErrors';

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
        validationErrors: ValidationErrors
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
        validationErrors: ValidationErrors
    },
    LOGOUT_START: { type: typeof LOGOUT_START },
    LOGOUT_SUCCESS: { type: typeof LOGOUT_SUCCESS },
    LOGOUT_ERROR: { type: typeof LOGOUT_ERROR },
    AUTH_START: {
        type: typeof AUTH_START
    },
    AUTH_SUCCESS: {
        type: typeof AUTH_SUCCESS,
        user: UserView
    },
    AUTH_ERROR: {
        type: typeof AUTH_ERROR
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
    registrationError: (validationErrors: ValidationErrors): AuthActions[typeof REGISTRATION_ERROR] => ({
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
    loginError: (validationErrors: ValidationErrors): AuthActions[typeof LOGIN_ERROR] => ({
        type: LOGIN_ERROR,
        validationErrors
    }),
    logoutStart: (): AuthActions[typeof LOGOUT_START] => ({ type: LOGOUT_START }),
    logoutSuccess: (): AuthActions[typeof LOGOUT_SUCCESS] => ({ type: LOGOUT_SUCCESS }),
    logoutError: (): AuthActions[typeof LOGOUT_ERROR] => ({ type: LOGOUT_ERROR }),
    authStart: (): AuthActions[typeof AUTH_START] => ({ type: AUTH_START }),
    authSuccess: (user: UserView): AuthActions[typeof AUTH_SUCCESS] => ({
        type: AUTH_SUCCESS,
        user
    }),
    authError: (): AuthActions[typeof AUTH_ERROR] => ({ type: AUTH_ERROR })
};
