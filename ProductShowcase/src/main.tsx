import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FavoriteProvider } from "@/contexts/FavoriteContext";
import { ToastProvider } from "@/contexts/ToastContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <FavoriteProvider>
          <App />
        </FavoriteProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
);
