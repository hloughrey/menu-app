import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider, QueryClient } from 'react-query';

import App from './App';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import { BasketProvider, MenuProvider } from './context';

const queryClient = new QueryClient();

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <MenuProvider>
            <BasketProvider>
                <App />
            </BasketProvider>
        </MenuProvider>
    </QueryClientProvider>,
    document.getElementById('root')
);
