import { all } from 'redux-saga/effects';
import { watchRegisterUser, watchLoginUser, authUser, watchLogoutUser } from './auth';

function* saga(): any {
    yield all([
        authUser(),
        watchRegisterUser(),
        watchLoginUser(),
        watchLogoutUser()
    ]);
}

export default saga;