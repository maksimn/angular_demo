import Photo from '../store/Photo';

const MAX_PHOTOS_ON_PAGE = 50;

export default class PhotoDataManager {
    private photoData: Photo[];

    constructor(photoData: Photo[]) {
        this.photoData = photoData;
        this.photoData.forEach((photo: Photo, i: number) => {
            photo.page = Math.floor(i / MAX_PHOTOS_ON_PAGE) + 1; // set page for photo
        });
    }

    get numPages(): number {
        return Math.ceil(this.photoData.length / MAX_PHOTOS_ON_PAGE);
    }

    getPhotosToRenderOnPage(page: number): Photo[] {
        return this.photoData.slice(MAX_PHOTOS_ON_PAGE * (page - 1), MAX_PHOTOS_ON_PAGE * page);
    }

    getPhoto(photoId: number): Photo | undefined {
        const photo = this.photoData.find((ph: Photo) => ph.id === photoId);

        return photo;
    }

    getPrevPhoto(photoId: number): Photo | undefined {
        if (!photoId) return undefined;

        const photoIndex = photoId - 1;
        const lastPhotoIndex = this.photoData.length - 1;
        const prevPhotoIndex = photoIndex > 0 ? photoIndex - 1 : lastPhotoIndex;

        return this.photoData[prevPhotoIndex];
    }

    getNextPhoto(photoId: number): Photo | undefined {
        if (!photoId) return undefined;

        const photoIndex = photoId - 1;
        const lastPhotoIndex = this.photoData.length - 1;
        const nextPhotoIndex = photoIndex < lastPhotoIndex ? photoIndex + 1 : 0;

        return this.photoData[nextPhotoIndex];
    }
}