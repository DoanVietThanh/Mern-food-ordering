import React from "react";

import Auth0ProviderNavigate from "./auth/Auth0ProviderNavigate.tsx";
import AppRoutes from "./routes/AppRoutes.tsx";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderNavigate>
          <AppRoutes />
        </Auth0ProviderNavigate>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
