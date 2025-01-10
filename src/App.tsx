// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AgentsProvider } from "./context/AgentsContext";
import AgentsPage from "./pages/AgentsPage";
// import AgentDetailsPage from "./pages/AgentDetailsPage";

function App() {
  return (
    <AgentsProvider>
      <Routes>
        <Route path="/" element={<AgentsPage />} />
        {/* <Route path="/agents/:id" element={<AgentDetailsPage />} /> */}
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </AgentsProvider>
  );
}

export default App;
