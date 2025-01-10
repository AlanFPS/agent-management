// src/pages/AgentsPage.tsx

import React, { useState } from "react";
import AgentForm from "../components/AgentForm/AgentForm";
import AgentList from "../components/AgentList/AgentList";
import { Agent } from "../types/Agent";
import { useAgentsContext } from "../context/AgentsContext";

function AgentsPage() {
  const { agents } = useAgentsContext();

  // For controlling "Edit" mode
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);

  // For searching by name/email
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredAgents = agents.filter((agent) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      agent.name.toLowerCase().includes(lowerSearch) ||
      agent.email.toLowerCase().includes(lowerSearch)
    );
  });

  const handleEditClick = (agent: Agent) => {
    setEditingAgent(agent);
  };

  // Called by AgentForm after successful Add or Edit
  const handleFormSuccess = () => {
    setEditingAgent(null);
  };

  // If user cancels editing
  const handleCancel = () => {
    setEditingAgent(null);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Agents Management</h1>

      {/* Search Bar */}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="search">Search Agents: </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name or email..."
        />
      </div>

      {/* Form for adding/editing */}
      <AgentForm
        editingAgent={editingAgent}
        onSuccess={handleFormSuccess}
        onCancel={handleCancel}
      />

      <hr />

      {/* Filtered list of agents */}
      <AgentList agents={filteredAgents} onEditClick={handleEditClick} />
    </div>
  );
}

export default AgentsPage;
