import { LOAD_PHOTOS_DATA, LOAD_PHOTOS_DATA_SUCCESS, LOAD_PHOTOS_DATA_ERROR,
    SET_PHOTOS_SEARCH_PARAM, UPDATE_PHOTOS_STATE, ADD_PHOTO_TO_FAVORITES,
    SET_FAVORITE_PHOTOS, REMOVE_PHOTO_FROM_FAVORITES, SET_PHOTOS_RENDER_MODE } from './constants';
import Photo from '../store/Photo';
import { PhotosRenderMode } from '../store/AppState';

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
    UPDATE_PHOTOS_STATE: {
        type: typeof UPDATE_PHOTOS_STATE;
    };
    ADD_PHOTO_TO_FAVORITES: {
        type: typeof ADD_PHOTO_TO_FAVORITES;
        photo: Photo;
    };
    SET_FAVORITE_PHOTOS: {
        type: typeof SET_FAVORITE_PHOTOS;
        favoritePhotos: Photo[];
    };
    REMOVE_PHOTO_FROM_FAVORITES: {
        type: typeof REMOVE_PHOTO_FROM_FAVORITES;
        photo: Photo;
    };
    SET_PHOTOS_RENDER_MODE: {
        type: typeof SET_PHOTOS_RENDER_MODE;
        renderMode: PhotosRenderMode;
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
    updatePhotosState: (): PhotoActions[typeof UPDATE_PHOTOS_STATE] => ({
        type: UPDATE_PHOTOS_STATE
    }),
    addPhotoToFavorites: (photo: Photo): PhotoActions[typeof ADD_PHOTO_TO_FAVORITES] => ({
        type: ADD_PHOTO_TO_FAVORITES,
        photo
    }),
    setFavoritePhotos: (favoritePhotos: Photo[]): PhotoActions[typeof SET_FAVORITE_PHOTOS] => ({
        type: SET_FAVORITE_PHOTOS,
        favoritePhotos
    }),
    removePhotoFromFavorites: (photo: Photo): PhotoActions[typeof REMOVE_PHOTO_FROM_FAVORITES] => ({
        type: REMOVE_PHOTO_FROM_FAVORITES,
        photo
    }),
    setPhotosRenderMode: (renderMode: PhotosRenderMode): PhotoActions[typeof SET_PHOTOS_RENDER_MODE] => ({
        type: SET_PHOTOS_RENDER_MODE,
        renderMode
    })
};