import { LOGIN_SUCCESS } from '../actions/constants';
import { AuthActions } from '../actions/authorization';
import UserView from '../../app/models/UserView';

const notAuthorized: UserView = null;

const user: (state: UserView, action: AuthActions[keyof AuthActions]) => UserView = 
        (state = notAuthorized, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.user;
        default:
            return state;
    }
}

export default user;