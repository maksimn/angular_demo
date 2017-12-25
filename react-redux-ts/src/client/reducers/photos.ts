import { Reducer } from 'redux';
import { PhotosState } from '../store/AppState';
import {
    LOAD_PHOTOS_DATA,
    LOAD_PHOTOS_DATA_SUCCESS,
    LOAD_PHOTOS_DATA_ERROR
} from '../actions/constants';

const initState: PhotosState = {
    data: []
};

const photos: Reducer<PhotosState> = (state = initState, action) => {
    switch (action.type) {
        case LOAD_PHOTOS_DATA:
            return {
                ...state,
                data: initState.data
            };
        case LOAD_PHOTOS_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
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