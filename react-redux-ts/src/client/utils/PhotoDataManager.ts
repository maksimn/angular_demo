import Photo from '../store/Photo';
import { PhotosState, PhotosRenderMode } from '../store/AppState';
import photoBinarySearch from './photoBinarySearch';

const MAX_PHOTOS_ON_PAGE = 50;

interface GetThumbnailLinkHref {
    (page: number, photoId: number, searchParam?: string): string;
}

const getGetThumbnailLinkHrefAllPhotosMode: GetThumbnailLinkHref =
        (page: number, photoId: number, searchParam?: string) => {
    return `/photos/${page}/photoId/${photoId}`;
};

const getGetThumbnailLinkHrefFilteredMode: GetThumbnailLinkHref =
        (page: number, photoId: number, searchParam?: string) => {
    return `/photos/searching/${searchParam}/${page}/photoId/${photoId}`;
};

const getGetThumbnailLinkHrefFavoritePhotos: GetThumbnailLinkHref =
        (page: number, photoId: number, searchParam?: string) => {
    return `/photos/favorites/photoId/${photoId}`;
};

const getThumbnailLinkHrefFactory = (renderMode: PhotosRenderMode) => {
    if (renderMode === PhotosRenderMode.all) {
        return getGetThumbnailLinkHrefAllPhotosMode;
    } else if (renderMode === PhotosRenderMode.filtered) {
        return getGetThumbnailLinkHrefFilteredMode;
    } else if (renderMode === PhotosRenderMode.favorite) {
        return getGetThumbnailLinkHrefFavoritePhotos;
    }

    throw new Error('Not implemented render mode.');
};

export default class PhotoDataManager {
    private photoData: Photo[];
    private currentPhotoIndex: number = -1;
    private photosState: PhotosState;

    constructor(photosState: PhotosState) {
        this.photosState = photosState;
        this.photoData = this.photoDataFactory(photosState);

        const getThumbnailLinkHref = getThumbnailLinkHrefFactory(photosState.photosRenderMode);

        this.photoData.forEach((photo: Photo, i: number) => {
            const page = Math.floor(i / MAX_PHOTOS_ON_PAGE) + 1;
            const photoId = photo.id;
            const { searchParam } = photosState;
            const appUrlToPhoto = getThumbnailLinkHref(page, photoId, searchParam);

            photo.appUrlToPhoto = appUrlToPhoto;
        });
    }

    private photoDataFactory(photosState: PhotosState) {
        switch (photosState.photosRenderMode) {
            case PhotosRenderMode.all:
                return photosState.data;
            case PhotosRenderMode.favorite:
                return photosState.favoriteData;
            case PhotosRenderMode.filtered:
                return photosState.filteredData;
            default:
                return [];
        }
    }

    get numPages(): number {
        return Math.ceil(this.photoData.length / MAX_PHOTOS_ON_PAGE);
    }

    getPhotosToRenderOnPage(page?: number): Photo[] {
        // no pagination for favorite photos
        if (this.photosState.photosRenderMode === PhotosRenderMode.favorite) {
            return this.photoData;
        }

        const nPage = page ? page : 1;

        return this.photoData.slice(MAX_PHOTOS_ON_PAGE * (nPage - 1), MAX_PHOTOS_ON_PAGE * nPage);
    }

    getPhoto(photoId: number): Photo | undefined {
        this.currentPhotoIndex = photoBinarySearch(photoId, this.photoData, 0, this.photoData.length - 1);

        return this.currentPhotoIndex > -1 ? this.photoData[this.currentPhotoIndex] : undefined;
    }

    getPrevPhoto(): Photo | undefined {
        if (this.currentPhotoIndex === -1) {
            return undefined;
        }

        const lastPhotoIndex = this.photoData.length - 1;
        const prevPhotoIndex = this.currentPhotoIndex > 0 ? this.currentPhotoIndex - 1 : lastPhotoIndex;

        return this.photoData[prevPhotoIndex];
    }

    getNextPhoto(): Photo | undefined {
        if (this.currentPhotoIndex === -1) {
            return undefined;
        }

        const lastPhotoIndex = this.photoData.length - 1;
        const nextPhotoIndex = this.currentPhotoIndex < lastPhotoIndex ? this.currentPhotoIndex + 1 : 0;

        return this.photoData[nextPhotoIndex];
    }
}