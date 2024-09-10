import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { TanstackProvider } from "./providers";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TanstackProvider>
        <App />
        <ToastContainer />
      </TanstackProvider>
    </BrowserRouter>
  </StrictMode>
);
