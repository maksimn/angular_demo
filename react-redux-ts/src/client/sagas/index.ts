import { all } from 'redux-saga/effects';
import { watchRegisterUser, watchLoginUser, authUser, watchLogoutUser } from './auth';
import { watchLoadPhotos } from './photos';

function* saga(): any {
    yield all([
        authUser(),
        watchRegisterUser(),
        watchLoginUser(),
        watchLogoutUser(),
        watchLoadPhotos()
    ]);
}

export default saga;