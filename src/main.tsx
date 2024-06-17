import React from 'react'
import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            gcTime: 300_000, //5minutes
            staleTime: 10 * 1000, //10 seconds
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App/>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    </React.StrictMode>,
)
