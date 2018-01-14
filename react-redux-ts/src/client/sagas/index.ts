import { all } from 'redux-saga/effects';
import { watchRegisterUser, watchLoginUser, authUser, watchLogoutUser } from './auth';
import { watchLoadPhotos, watchAddPhotoToFavorites } from './photos';

function* saga(): any {
    yield all([
        authUser(),
        watchRegisterUser(),
        watchLoginUser(),
        watchLogoutUser(),
        watchLoadPhotos(),
        watchAddPhotoToFavorites()
    ]);
}

export default saga;