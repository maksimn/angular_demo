import ValidationErrors from '../../app/models/ValidationErrors';
import UserView from '../../app/models/UserView';
import Photo from './Photo';

export type AuthState = {
    validationErrors: ValidationErrors;
    user: UserView | null;
    isAuthRequestPending: boolean;
};

export interface PhotosState {
    data: Photo[];
}

export interface AppState {
    auth: AuthState;
    photos: PhotosState;
}