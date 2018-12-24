import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const basename = process.env.PUBLIC_URL;

const supportsHistory = 'pushState' in window.history;

const Router = (routers) => (
    <BrowserRouter forceRefresh={!supportsHistory} basename={basename}>
        <Switch>
            {routers.map((route, i) => (
                <Route key={i} {...route} />
            ))}
        </Switch>
    </BrowserRouter>
);

export default Router;
