/// <reference types="redux" />
import { combineReducers } from 'redux';
import validationErrors from './validationErrors';
import { AppState } from '../store/AppState';

export default combineReducers<AppState>({
    validationErrors
});