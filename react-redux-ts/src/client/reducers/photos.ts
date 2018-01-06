import { Reducer } from 'redux';
import { PhotosState } from '../store/AppState';
import {
    LOAD_PHOTOS_DATA,
    LOAD_PHOTOS_DATA_SUCCESS,
    LOAD_PHOTOS_DATA_ERROR
} from '../actions/constants';
import Photo from '../store/Photo';
import { MAX_PHOTOS_ON_PAGE } from '../constants';

const initState: PhotosState = {
    data: []
};

function setPageForPhoto(photoData: Photo[]) {
    photoData.forEach((photo: Photo, i: number) => {
        photo.page = Math.floor(i / MAX_PHOTOS_ON_PAGE) + 1;
    });

    return photoData;
}

const photos: Reducer<PhotosState> = (state = initState, action) => {
    switch (action.type) {
        case LOAD_PHOTOS_DATA:
            return {
                ...state,
                data: initState.data
            };
        case LOAD_PHOTOS_DATA_SUCCESS: {
            const photoData = action.payload;

            return {
                ...state,
                data: setPageForPhoto(photoData)
            };
        }
        case LOAD_PHOTOS_DATA_ERROR:
            return {
                ...state,
                data: initState.data
            };
        default:
            return state;
    }
};

export default photos;