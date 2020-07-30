import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home'));
const FullTitlePage = lazy(() => import('@/pages/FullTitlePage'));

const routes = [
    {
        route: '/',
        component: () => <Home />,
        exact: 'true'
    },
    {
        route: '/anime/:id',
        component: () => <FullTitlePage />,
        exact: 'true'
    }
];

export const AppRoutes: React.FC<{}> = (props) => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    {routes.map((item) => (
                        <Route
                            key={item.route}
                            path={item.route}
                            render={item.component}
                            exact={item.exact}
                        />
                    ))}
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
};
