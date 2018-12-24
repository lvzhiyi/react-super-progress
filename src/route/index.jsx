import getWebRoute from './web';

import Progress from '../pages';

const routes = [
    {
        path: '/',
        component: Progress
    },
];

const Router = () => {
    return getWebRoute(routes);
};

export default Router;
