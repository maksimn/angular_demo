import ValidationFieldError from '../../app/validate/ValidationFieldError';
import UserView from '../../app/models/UserView';

export type AuthState = {
    validationErrors: ValidationFieldError[];
    user: UserView | null;
    isAuthRequestPending: boolean;
};

export interface AppState {
    auth: AuthState;
}