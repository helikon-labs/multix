import { createBrowserRouter } from 'react-router';
import { About, Creation, Home, Overview, Settings } from './index';
import React from 'react';
import App from '../App';
import ErrorFallback from '../components/ErrorFallback/ErrorFallback';
import Import from './Import/Import';

interface Route {
    path: string;
    element: React.ReactNode;
    name: string;
    isDisplayWhenNoWallet: boolean;
}

export const MENU_ROUTES: Route[] = [
    {
        path: '/',
        element: <Home />,
        name: 'Home',
        isDisplayWhenNoWallet: true,
    },
    {
        path: 'create',
        element: <Creation />,
        name: 'New Multisig',
        isDisplayWhenNoWallet: false,
    },
    {
        path: 'settings',
        element: <Settings />,
        name: 'Settings',
        isDisplayWhenNoWallet: true,
    },
    {
        path: 'overview',
        element: <Overview />,
        name: 'Overview',
        isDisplayWhenNoWallet: true,
    },
    {
        path: 'about',
        element: <About />,
        name: 'About',
        isDisplayWhenNoWallet: true,
    },
];

export const HIDDEN_ROUTES: Route[] = [
    {
        path: 'migrate',
        element: <Import />,
        name: 'Import',
        isDisplayWhenNoWallet: true,
    },
    {
        path: 'import',
        element: <Import />,
        name: 'Import',
        isDisplayWhenNoWallet: true,
    },
];

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorFallback />,
        children: MENU_ROUTES.concat(HIDDEN_ROUTES),
    },
]);
