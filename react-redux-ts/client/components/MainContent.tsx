import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import IndexView from './views/IndexView';
import ErrorView from './views/ErrorView';

const MainContent = () => (
    <main>
        <Switch>
            <Route exact path='/' component={IndexView}/>
            <Route path='*' component={ErrorView}/>
        </Switch>
    </main>
);

export default MainContent;