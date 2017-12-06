import { AUTH_SUCCESS, AUTH_START, AUTH_ERROR } from '../actions/constants';
import { Reducer } from 'redux';

const isAuthRequestPending: Reducer<boolean> = (state = false, action) => {
    switch (action.type) {
        case AUTH_START:
            return true;
        case AUTH_SUCCESS:
            return false;
        case AUTH_ERROR:
            return false;
        default:
            return state;
    }
};

export default isAuthRequestPending;