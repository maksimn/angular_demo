import { LOAD_PHOTOS_DATA, LOAD_PHOTOS_DATA_SUCCESS, LOAD_PHOTOS_DATA_ERROR,
    SET_PHOTOS_SEARCH_PARAM, RESET_PHOTOS_SEARCH_PARAM } from './constants';
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
    SET_PHOTOS_SEARCH_PARAM: {
        type: typeof SET_PHOTOS_SEARCH_PARAM;
        payload: string;
    };
    RESET_PHOTOS_SEARCH_PARAM: {
        type: typeof RESET_PHOTOS_SEARCH_PARAM;
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
    }),
    setPhotosSearchParam: (searchParam: string): PhotoActions[typeof SET_PHOTOS_SEARCH_PARAM] => ({
        type: SET_PHOTOS_SEARCH_PARAM,
        payload: searchParam
    }),
    resetPhotosSearchParam: (): PhotoActions[typeof RESET_PHOTOS_SEARCH_PARAM] => ({
        type: RESET_PHOTOS_SEARCH_PARAM
    })
};