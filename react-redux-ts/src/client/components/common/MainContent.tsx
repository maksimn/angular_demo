import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from '../../containers/pages/Index';
import ErrorView from '../pages/ErrorView';

import RegisterForm from '../../containers/auth/RegisterForm';
import LoginForm from '../../containers/auth/LoginForm';
import Photos from '../../containers/photos/Photos';
import Profile from '../../containers/pages/Profile';
import FavoritePhotos from '../../containers/photos/FavoritePhotos';

const MainContent = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Index}/>
            <Route exact path="/register" component={RegisterForm} />
            <Route exact path="/login" component={LoginForm} />

            <Route exact path="/photos" component={Photos} />
            <Route exact path="/photos/favorites" component={ FavoritePhotos } />
            <Route exact path="/photos/favorites/photoId/:photoId" component={ FavoritePhotos } />
            <Route exact path="/photos/searching/:searchParam" component={Photos} />
            <Route exact path="/photos/searching/:searchParam/:page" component={Photos} />
            <Route exact path="/photos/searching/:searchParam/:page/photoId/:photoId" component={Photos} />
            <Route exact path="/photos/:page" component={Photos} />
            <Route exact path="/photos/:page/photoId/:photoId" component={Photos} />
            <Route exact path="/profile" component={Profile} />

            <Route path="*" component={ErrorView}/>
        </Switch>
    </main>
);

export default MainContent;