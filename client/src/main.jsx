import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { Toaster } from 'react-hot-toast';
const qc = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={qc}>
    <App />
     <Toaster position="top-right" />
  </QueryClientProvider>,
);
