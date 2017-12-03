import ValidationFieldError from '../../app/validate/ValidationFieldError';
import UserView from '../../app/models/UserView';

export interface AppState {
    validationErrors: ValidationFieldError[];
    user: UserView;
}