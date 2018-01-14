import { Reducer } from 'redux';
import { PhotosState, PhotosRenderMode } from '../store/AppState';
import {
    LOAD_PHOTOS_DATA,
    LOAD_PHOTOS_DATA_SUCCESS,
    LOAD_PHOTOS_DATA_ERROR,
    SET_PHOTOS_SEARCH_PARAM,
    UPDATE_PHOTOS_STATE,
    ADD_PHOTO_TO_FAVORITES
} from '../actions/constants';

const initState: PhotosState = {
    data: [],
    favoriteData: [],
    filteredData: [],
    photosRenderMode: PhotosRenderMode.all,
    searchParam: ''
};

const getFilteredData = (state: PhotosState) => {
    return state.data.filter(photo => photo.title.toLowerCase().indexOf(state.searchParam) !== -1);
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
            return {
                ...state,
                searchParam: action.payload
            };
        }
        case UPDATE_PHOTOS_STATE: {
            if (state.searchParam) {
                return {
                    ...state,
                    filteredData: getFilteredData(state),
                    photosRenderMode: PhotosRenderMode.filtered
                };
            }

            return {
                ...state,
                photosRenderMode: PhotosRenderMode.all
            };
        }
        case ADD_PHOTO_TO_FAVORITES: {
            return {
                ...state
            };
        }
        default:
            return state;
    }
};

export default photos;