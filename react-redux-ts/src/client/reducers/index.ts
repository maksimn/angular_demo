import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import photos from './photos';
import { AppState } from '../store/AppState';

export default combineReducers<AppState>({
    auth,
    photos,
    router: routerReducer
});