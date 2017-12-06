import * as React from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import MainContent from './MainContent';

const App = () => (
    <div>
        <Route path="*" component={ Header } />
        <MainContent />
    </div>
);

export default App;