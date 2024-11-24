import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App";
import './styles/output.css';
import { BreadcrumbProvider } from "./contexts/BreadcrumbContext";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BreadcrumbProvider>
          <App />
        </BreadcrumbProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
