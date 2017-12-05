import { LOGIN_SUCCESS, LOGOUT_START } from '../actions/constants';
import UserView from '../../app/models/UserView';
import { Reducer } from 'redux';

const notAuthorized = null;

const user: Reducer<UserView | null> = (state = notAuthorized, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.user;
        case LOGOUT_START:
            return notAuthorized;
        default:
            return state;
    }
};

export default user;