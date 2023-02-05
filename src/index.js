import React from 'react';
import ReactDOM from 'react-dom/client';
import { toast } from "react-hot-toast";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Utlizing React Query for fetching and caching data from API
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // 🎉 only show error toasts if we already have data in the cache
      // which indicates a failed background update
      if (query.state.data !== undefined) {
        toast.error(`Something went wrong: ${error.message}`);
      }
    },
  }),
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
  </React.StrictMode>
);

