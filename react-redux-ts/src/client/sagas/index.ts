import { all } from 'redux-saga/effects';
import { watchRegisterUser, watchLoginUser } from './auth';

function* saga(): any {
    yield all([
        watchRegisterUser(),
        watchLoginUser()
    ]);
}

export default saga;