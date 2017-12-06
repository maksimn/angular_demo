/// <reference types="redux" />
import { combineReducers } from 'redux';
import validationErrors from './validationErrors';
import user from './user';
import isAuthRequestPending from './isAuthRequestPending';
import { AppState } from '../store/AppState';

export default combineReducers<AppState>({
    validationErrors,
    user,
    isAuthRequestPending
});