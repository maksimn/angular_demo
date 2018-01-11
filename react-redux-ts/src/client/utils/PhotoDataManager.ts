import Photo from '../store/Photo';

const MAX_PHOTOS_ON_PAGE = 50;

export default class PhotoDataManager {
    private photoData: Photo[];
    private currentPhotoIndex: number = -1;

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
        this.currentPhotoIndex = this.photoData.findIndex((ph: Photo) => ph.id === photoId);

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