// src/pages/AgentsPage.tsx
import React, { useState } from "react";
import AgentForm from "../components/AgentForm/AgentForm";
import AgentList from "../components/AgentList/AgentList";
import { Agent } from "../types/Agent";

function AgentsPage() {
  // Track which agent is being edited, if any
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);

  // When user clicks "Edit" in the list, set the editing agent
  const handleEditClick = (agent: Agent) => {
    setEditingAgent(agent);
  };

  // When the form is successfully submitted in edit mode, reset
  const handleFormSuccess = () => {
    setEditingAgent(null);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingAgent(null);
  };

  return (
    <div>
      <h1>Agents Management</h1>

      {/* 
        Pass editingAgent to AgentForm. If editingAgent is null, 
        the form will act as an "Add" form. Otherwise, it will pre-fill for "Edit".
      */}
      <AgentForm
        editingAgent={editingAgent}
        onSuccess={handleFormSuccess}
        onCancel={handleCancel}
      />

      <hr />

      {/* 
        AgentList receives a callback to handle "Edit" button clicks
      */}
      <AgentList onEditClick={handleEditClick} />
    </div>
  );
}

export default AgentsPage;
