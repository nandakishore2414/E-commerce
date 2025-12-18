import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { StrictMode } from "react";
import { LogginProvider } from "./Context/LogginContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LogginProvider>
      <App />
    </LogginProvider>
  </StrictMode>
);
