import { call, put, take } from 'redux-saga/effects';
import { loadPhotoData } from '../api/photos';
import { photoActionCreators } from '../actions/photos';
import { LOAD_PHOTOS_DATA } from '../actions/constants';

export function* loadPhotos() {
    try {
        const photos = yield call(loadPhotoData);
        yield put(photoActionCreators.loadPhotosSuccess(photos));
    } catch {
        yield put(photoActionCreators.loadPhotosError());
    }
}

export function* watchLoadPhotos(): any {
    while (true) {
        yield take(LOAD_PHOTOS_DATA);
        yield loadPhotos();
    }
}