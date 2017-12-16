import ValidationErrors from '../../app/models/ValidationErrors';
import UserView from '../../app/models/UserView';

export type AuthState = {
    validationErrors: ValidationErrors;
    user: UserView | null;
    isAuthRequestPending: boolean;
};

export interface AppState {
    auth: AuthState;
}