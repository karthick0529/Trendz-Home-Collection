import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { store } from './redux/Store';
import { Toaster } from 'react-hot-toast';
import AppContextProvider from './context/AppContext';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a QueryClient instance
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppContextProvider>
        <BrowserRouter>
            <Provider store={store}>
                {/* Wrap your app with QueryClientProvider */}
                <QueryClientProvider client={queryClient}>
                    <App />
                    <Toaster />
                </QueryClientProvider>
            </Provider>
        </BrowserRouter>
    </AppContextProvider>
);
