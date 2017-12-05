import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import IndexView from './IndexView';
import ErrorView from './ErrorView';

import RegisterForm from '../containers/RegisterForm';
import LoginForm from '../containers/LoginForm';
import Photos from '../containers/Photos';
import Profile from '../containers/Profile';

const MainContent = () => (
    <main>
        <Switch>
            <Route exact path="/" component={IndexView}/>
            <Route exact path="/register" component={RegisterForm} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/photos" component={Photos} />
            <Route exact path="/profile" component={Profile} />
            <Route path="*" component={ErrorView}/>
        </Switch>
    </main>
);

export default MainContent;