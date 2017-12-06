import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from '../reducers';
import { authenticateUser } from '../actions/authorization';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

store.dispatch(authenticateUser());

export default store;
