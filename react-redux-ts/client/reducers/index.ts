/// <reference types="redux" />
import { combineReducers } from 'redux';
import validationErrors from './validationErrors';
import user from './user';
import { AppState } from '../store/AppState';

export default combineReducers<AppState>({
    validationErrors,
    user
});