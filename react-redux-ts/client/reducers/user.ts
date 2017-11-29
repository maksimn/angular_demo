import { LOGIN_SUCCESS } from '../actions/constants';
import { AnyAction } from 'redux';
import UserView from '../../app/models/UserView';

const notAuthorized = null;

const user: (state: UserView | null, action: AnyAction) => UserView | null = 
        (state = notAuthorized, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.user;
        default:
            return state;
    }
}

export default user;