import { PhotosState, PhotosRenderMode } from '../store/AppState';

export default function PhotoDataFactory(photosState: PhotosState) {
    switch (photosState.photosRenderMode) {
        case PhotosRenderMode.all:
            return photosState.data;
        case PhotosRenderMode.favorite:
            return photosState.favoriteData;
        case PhotosRenderMode.filtered:
            return photosState.filteredData;
        default:
            return photosState.data;
    }
}