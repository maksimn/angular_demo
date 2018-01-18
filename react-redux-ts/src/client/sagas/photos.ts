import { call, put, takeEvery, take, select } from 'redux-saga/effects';
import * as Cookies from 'js-cookie';
import { loadPhotoData } from '../api/photos';
import { photoActionCreators } from '../actions/photos';
import { LOAD_PHOTOS_DATA, ADD_PHOTO_TO_FAVORITES, REMOVE_PHOTO_FROM_FAVORITES } from '../actions/constants';
import Photo from '../store/Photo';
import { AppState } from '../store/AppState';

function getFavoritePhotos(favoritePhotoIds: number[], photos: Photo[]): Photo[] {
    const favoritePhotos = [];

    for (let i = 0, j = 0; i < favoritePhotoIds.length && j < photos.length;  j++) {
        if (photos[j].id === favoritePhotoIds[i]) {
            favoritePhotos.push(photos[j]);
            i++;
        }
    }

    return favoritePhotos;
}

export function* loadPhotos() {
    try {
        const photos: Photo[] = yield call(loadPhotoData);
        const favoritePhotoIds = <number[]> Cookies.getJSON('favoritePhotos');
        const favoritePhotos = getFavoritePhotos(favoritePhotoIds, photos);

        yield put(photoActionCreators.loadPhotosSuccess(photos));
        yield put(photoActionCreators.updatePhotosState());
        yield put(photoActionCreators.setFavoritePhotos(favoritePhotos));
    } catch {
        yield put(photoActionCreators.loadPhotosError());
    }
}

export function* watchLoadPhotos(): any {
    yield takeEvery(LOAD_PHOTOS_DATA, loadPhotos);
}

function setCookieForFavoritePhotos(favoritePhotos: Photo[]) {
    const favoritePhotoIds = favoritePhotos.map((p: Photo) => (p.id));

    Cookies.set('favoritePhotos', favoritePhotoIds, { expires: 14 });
}

export function* watchAddPhotoToFavorites(): any {
    while (true) {
        yield take(ADD_PHOTO_TO_FAVORITES);

        const favoritePhotos = yield select((state: AppState) => state.photos.favoriteData);

        setCookieForFavoritePhotos(favoritePhotos);
    }
}

export function* watchRemovePhotoFromFavorites(): any {
    while (true) {
        yield take(REMOVE_PHOTO_FROM_FAVORITES);

        const favoritePhotos = yield select((state: AppState) => state.photos.favoriteData);

        setCookieForFavoritePhotos(favoritePhotos);
    }
}