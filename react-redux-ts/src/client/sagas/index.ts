import { all } from 'redux-saga/effects';
import { watchRegisterUser, watchLoginUser, authUser, watchLogoutUser } from './auth';
import { watchLoadPhotos, watchAddPhotoToFavorites, watchRemovePhotoFromFavorites } from './photos';

function* saga(): any {
    yield all([
        authUser(),
        watchRegisterUser(),
        watchLoginUser(),
        watchLogoutUser(),
        watchLoadPhotos(),
        watchAddPhotoToFavorites(),
        watchRemovePhotoFromFavorites()
    ]);
}

export default saga;