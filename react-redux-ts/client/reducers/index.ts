import { combineReducers } from 'redux';
import auth from './auth';
import { AppState } from '../store/AppState';

export default combineReducers<AppState>({
    auth
});