import { Reducer } from 'redux';
import { AuthState } from '../store/AppState';
import {
    AUTH_SUCCESS,
    AUTH_START,
    AUTH_ERROR,
    REGISTRATION_START,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_START
} from '../actions/constants';

const initState: AuthState = {
    isAuthRequestPending: false,
    user: null,
    validationErrors: {
        errors: []
    }
};

const auth: Reducer<AuthState> = (state = initState, action) => {
    switch (action.type) {
        case AUTH_START:
            return {
                ...state,
                isAuthRequestPending: true
            };
        case AUTH_SUCCESS:
            return {
                ...state,
                user: action.user,
                isAuthRequestPending: false
            };
        case AUTH_ERROR:
            return {
                ...state,
                isAuthRequestPending: false
            };
        case REGISTRATION_START:
            return {
                ...state,
                validationErrors: initState.validationErrors
            };
        case REGISTRATION_SUCCESS:
            return {
                ...state,
                validationErrors: initState.validationErrors
            };
        case REGISTRATION_ERROR:
            return {
                ...state,
                validationErrors: action.validationErrors
            };
        case LOGIN_START:
            return {
                ...state,
                validationErrors: initState.validationErrors
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                validationErrors: initState.validationErrors
            };
        case LOGIN_ERROR:
            return {
                ...state,
                validationErrors: action.validationErrors
            };
        case LOGOUT_START:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
};

export default auth;
