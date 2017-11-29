import { LOGIN_SUCCESS } from '../actions/constants';
import UserView from '../../app/models/UserView';
import { Reducer } from 'redux';

const notAuthorized = null;

const user: Reducer<UserView | null> = (state = notAuthorized, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.user;
        default:
            return state;
    }
}

export default user;