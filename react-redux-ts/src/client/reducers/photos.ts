import { Reducer } from 'redux';
import { PhotosState, PhotosRenderMode } from '../store/AppState';
import {
    LOAD_PHOTOS_DATA,
    LOAD_PHOTOS_DATA_SUCCESS,
    LOAD_PHOTOS_DATA_ERROR,
    SET_PHOTOS_SEARCH_PARAM,
    RESET_PHOTOS_SEARCH_PARAM
} from '../actions/constants';

const initState: PhotosState = {
    data: [],
    favoriteData: [],
    filteredData: [],
    photosRenderMode: PhotosRenderMode.all
};

const photos: Reducer<PhotosState> = (state = initState, action) => {
    switch (action.type) {
        case LOAD_PHOTOS_DATA:
            return {
                ...state,
                data: initState.data
            };
        case LOAD_PHOTOS_DATA_SUCCESS: {
            return {
                ...state,
                data: action.payload
            };
        }
        case LOAD_PHOTOS_DATA_ERROR:
            return {
                ...state,
                data: initState.data
            };
        case SET_PHOTOS_SEARCH_PARAM: {
            const searchParam = action.payload;

            if (searchParam) {
                const filteredData = state.data.filter(photo =>
                    photo.title.toLowerCase().indexOf(searchParam) !== -1);

                return {
                    ...state,
                    photosRenderMode: PhotosRenderMode.filtered,
                    filteredData
                };
            }

            return {
                ...state,
                photosRenderMode: PhotosRenderMode.all
            };
        }
        case RESET_PHOTOS_SEARCH_PARAM: {
            return {
                ...state,
                photosRenderMode: PhotosRenderMode.all
            };
        }
        default:
            return state;
    }
};

export default photos;