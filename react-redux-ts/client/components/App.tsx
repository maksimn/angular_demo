import * as React from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import MainContent from './MainContent';
import Security from '../containers/Security';

const App = () => (
    <div>
        <Route path="*" component={ Security } />
        <Route path="*" component={ Header } />
        <MainContent />
    </div>
);

export default App;