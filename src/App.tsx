
import React, { PureComponent } from 'react';

import Router from './route';
import './styles/main';
export interface ProviderContext {
    actions: Object;
}

class App extends PureComponent {

    render(): Object {
        return <Router />;
    }
}

export default App;
