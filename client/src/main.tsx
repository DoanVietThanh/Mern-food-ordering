import React from "react";

import Auth0ProviderNavigate from "./auth/Auth0ProviderNavigate.tsx";
import AppRoutes from "./routes/AppRoutes.tsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderNavigate>
        <AppRoutes />
      </Auth0ProviderNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
