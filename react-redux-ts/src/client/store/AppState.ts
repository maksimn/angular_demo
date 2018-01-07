import ValidationErrors from '../../app/models/ValidationErrors';
import UserView from '../../app/models/UserView';
import Photo from './Photo';

export type AuthState = {
    validationErrors: ValidationErrors;
    user: UserView | null;
    isAuthRequestPending: boolean;
};

export enum PhotosRenderMode {
    all = 'all',
    filtered = 'filtered',
    favorite = 'favorite'
}

export interface PhotosState {
    data: Photo[];
    filteredData: Photo[];
    favoriteData: Photo[];
    photosRenderMode: PhotosRenderMode;
}

export interface AppState {
    auth: AuthState;
    photos: PhotosState;
}