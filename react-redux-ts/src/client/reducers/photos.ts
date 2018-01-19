import { Reducer } from 'redux';
import { PhotosState, PhotosRenderMode } from '../store/AppState';
import {
    LOAD_PHOTOS_DATA,
    LOAD_PHOTOS_DATA_SUCCESS,
    LOAD_PHOTOS_DATA_ERROR,
    SET_PHOTOS_SEARCH_PARAM,
    UPDATE_PHOTOS_STATE,
    ADD_PHOTO_TO_FAVORITES,
    SET_FAVORITE_PHOTOS,
    REMOVE_PHOTO_FROM_FAVORITES,
    SET_PHOTOS_RENDER_MODE
} from '../actions/constants';
import Photo from '../store/Photo';
import photoBinarySearch from '../utils/photoBinarySearch';

const initState: PhotosState = {
    isDataLoading: false,
    isDataLoaded: false,
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
                data: initState.data,
                isDataLoading: true,
                isDataLoaded: false
            };
        case LOAD_PHOTOS_DATA_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                isDataLoading: false,
                isDataLoaded: true
            };
        }
        case LOAD_PHOTOS_DATA_ERROR:
            return {
                ...state,
                data: initState.data,
                isDataLoading: false,
                isDataLoaded: false
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

            return state;
        }
        case ADD_PHOTO_TO_FAVORITES: {
            // favoriteData array must be in sorted order.
            const { photo } = action;
            const { favoriteData } = state;

            const findIndexToInsert = (photoId: number, photos: Photo[]): number => {
                const { length } = photos;

                for (let i = 0; i < length; i++) {
                    if (photos[i].id > photoId) {
                        return i;
                    }
                }

                return length;
            };

            const indexToInsert = findIndexToInsert(photo.id, favoriteData);
            const beginPhotos = favoriteData.slice(0, indexToInsert);
            const endPhotos = favoriteData.slice(indexToInsert, favoriteData.length);

            return {
                ...state,
                favoriteData: [...beginPhotos, photo, ...endPhotos]
            };
        }
        case REMOVE_PHOTO_FROM_FAVORITES: {
            const { photo } = action;
            const { favoriteData } = state;

            const index = photoBinarySearch(photo.id, favoriteData, 0, favoriteData.length - 1);
            const beginPhotos = favoriteData.slice(0, index);
            const endPhotos = favoriteData.slice(index + 1, favoriteData.length);

            return {
                ...state,
                favoriteData: [...beginPhotos, ...endPhotos]
            };
        }
        case SET_FAVORITE_PHOTOS:
            return {
                ...state,
                favoriteData: action.favoritePhotos
            };
        case SET_PHOTOS_RENDER_MODE:
            return {
                ...state,
                photosRenderMode: action.renderMode
            };
        default:
            return state;
    }
};

export default photos;