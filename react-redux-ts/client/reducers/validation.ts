import {
    REGISTRATION_START,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR
} from '../actions/constants';
import ValidationFieldError from '../interfaces/ValidationFieldError';

const noValidationErrors: ValidationFieldError[] = [];

interface validationReducer {
    (state: ValidationFieldError[], action: any): ValidationFieldError[];
}

const validation: validationReducer = (state = noValidationErrors, action) => {
    switch (action.type) {
        case REGISTRATION_START:
            return noValidationErrors;
        case REGISTRATION_SUCCESS:
            return noValidationErrors;
        case REGISTRATION_ERROR:
            return action.validationErrors;
        default:
            return state;
    }
}

export default validation;
