import React from 'react';
import App from '@/App';
import { render } from 'react-dom';
import './tailwind.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
// Create a client
const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools />
  </QueryClientProvider>,
  document.getElementById('root')
);
