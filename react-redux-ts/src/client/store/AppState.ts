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
    data: Photo[]; // array sorted by id ascending
    filteredData: Photo[]; // array sorted by id ascending
    favoriteData: Photo[]; // array sorted by id ascending
    photosRenderMode: PhotosRenderMode;
    searchParam: string;
}

export interface AppState {
    auth: AuthState;
    photos: PhotosState;
}