import {
    REGISTRATION_START,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from '../actions/constants';
import ValidationFieldError from '../../app/validate/ValidationFieldError';
import { AnyAction } from 'redux';

const noValidationErrors: ValidationFieldError[] = [];

const validationErrors: 
    (state: ValidationFieldError[], action: AnyAction) => ValidationFieldError[] = 
            (state = noValidationErrors, action) => {
    switch (action.type) {
        case REGISTRATION_START:
            return noValidationErrors;
        case REGISTRATION_SUCCESS:
            return noValidationErrors;
        case REGISTRATION_ERROR:
            return action.validationErrors;
        case LOGIN_START:
            return noValidationErrors;
        case LOGIN_SUCCESS:
            return noValidationErrors;
        case LOGIN_ERROR:
            return action.validationErrors;
        default:
            return state;
    }
}

export default validationErrors;
