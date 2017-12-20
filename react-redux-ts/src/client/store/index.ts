import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import reducers from '../reducers';
import { authenticateUser } from '../actions/authorization';

import saga from '../sagas';

export const history = createHistory();
const routingMiddleware = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(routingMiddleware, sagaMiddleware, thunk, logger);
const store = createStore(reducers, middleware);

sagaMiddleware.run(saga);
store.dispatch(authenticateUser());

export default store;
