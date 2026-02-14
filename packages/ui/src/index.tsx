import './styles/index.css';
import '@fontsource/jost/400.css';
import '@fontsource/jost/500.css';
import '@fontsource/jost/700.css';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { router } from './pages/routes';
import { StrictMode } from 'react';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
