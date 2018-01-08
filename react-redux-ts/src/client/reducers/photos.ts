import { Reducer } from 'redux';
import { PhotosState, PhotosRenderMode } from '../store/AppState';
import {
    LOAD_PHOTOS_DATA,
    LOAD_PHOTOS_DATA_SUCCESS,
    LOAD_PHOTOS_DATA_ERROR,
    SET_PHOTOS_SEARCH_PARAM,
    UPDATE_PHOTOS_STATE
} from '../actions/constants';

const initState: PhotosState = {
    data: [],
    favoriteData: [],
    filteredData: [],
    photosRenderMode: PhotosRenderMode.all,
    searchParam: ''
};

const getFilteredData = (state: PhotosState) => {
    return state.data.filter(photo =>
        photo.title.toLowerCase().indexOf(state.searchParam) !== -1);
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
                    filteredData,
                    photosRenderMode: PhotosRenderMode.filtered,
                    searchParam
                };
            }

            return {
                ...state,
                photosRenderMode: PhotosRenderMode.all,
                searchParam
            };
        }
        case UPDATE_PHOTOS_STATE: {
            return {
                ...state,
                filteredData: getFilteredData(state)
            };
        }
        default:
            return state;
    }
};

export default photos;