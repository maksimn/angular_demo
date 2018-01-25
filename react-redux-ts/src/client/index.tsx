import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';

import Header from './components/common/Header';
import MainContent from './components/common/MainContent';
import Security from './containers/common/Security';

import store, { history } from './store';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={ history }>
            <div>
                <Route path="*" component={ Security } />
                <MainContent />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);