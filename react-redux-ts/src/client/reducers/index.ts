import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import { AppState } from '../store/AppState';

export default combineReducers<AppState>({
    auth,
    router: routerReducer
});