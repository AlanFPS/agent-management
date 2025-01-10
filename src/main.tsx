import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AgentsProvider } from "./context/AgentsContext";
import "./index.css"; // optional global styles

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AgentsProvider>
      <App />
    </AgentsProvider>
  </React.StrictMode>
);
