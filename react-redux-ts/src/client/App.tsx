import * as React from 'react';
import { Route } from 'react-router-dom';

import Header from './components/common/Header';
import MainContent from './components/common/MainContent';
import Security from './containers/common/Security';

const App = () => (
    <div>
        <Route path="*" component={ Security } />
        <Route path="*" component={ Header } />
        <MainContent />
    </div>
);

export default App;