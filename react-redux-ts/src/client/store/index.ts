import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import reducers from '../reducers';

import saga from '../sagas';

const preloadedState = window.__PRELOADED_STATE__;

export const history = createHistory();

const routingMiddleware = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(routingMiddleware, sagaMiddleware, logger);
const store = createStore(reducers, preloadedState, middleware);

sagaMiddleware.run(saga);

export default store;
