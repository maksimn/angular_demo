import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import UserLogin from './containers/common/UserLogin';
import MainContent from './components/common/MainContent';

import store, { history } from './store';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={ history }>
            <MainContent />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={ history }>
            <UserLogin />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('userLogin')
);