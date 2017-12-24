import { all } from 'redux-saga/effects';
import { watchRegisterUser, watchLoginUser, authUser } from './auth';

function* saga(): any {
    yield all([
        authUser(),
        watchRegisterUser(),
        watchLoginUser()
    ]);
}

export default saga;