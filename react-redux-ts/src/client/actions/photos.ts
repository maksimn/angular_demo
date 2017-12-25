import { LOAD_PHOTOS_DATA, LOAD_PHOTOS_DATA_SUCCESS, LOAD_PHOTOS_DATA_ERROR } from './constants';
import Photo from '../store/Photo';

export interface PhotoActions {
    LOAD_PHOTOS_DATA: {
        type: typeof LOAD_PHOTOS_DATA
    };
    LOAD_PHOTOS_DATA_SUCCESS: {
        type: typeof LOAD_PHOTOS_DATA_SUCCESS;
        payload: Photo[]
    };
    LOAD_PHOTOS_DATA_ERROR: {
        type: typeof LOAD_PHOTOS_DATA_ERROR;
    };
}

export const photoActionCreators = {
    loadPhotos: (): PhotoActions[typeof LOAD_PHOTOS_DATA] => ({ type: LOAD_PHOTOS_DATA }),
    loadPhotosSuccess: (photosData: Photo[]): PhotoActions[typeof LOAD_PHOTOS_DATA_SUCCESS] => ({
        type: LOAD_PHOTOS_DATA_SUCCESS,
        payload: photosData
    }),
    loadPhotosError: (): PhotoActions[typeof LOAD_PHOTOS_DATA_ERROR] => ({
        type: LOAD_PHOTOS_DATA_ERROR
    })
};