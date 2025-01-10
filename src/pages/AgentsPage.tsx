import React, { useState } from "react";
import AgentForm from "../components/AgentForm/AgentForm";
import AgentList from "../components/AgentList/AgentList";
import { Agent } from "../types/Agent";
import { useAgentsContext } from "../context/AgentsContext";

function AgentsPage() {
  const { agents } = useAgentsContext();

  // For editing
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);

  // searchTerm local state
  const [searchTerm, setSearchTerm] = useState("");

  // When user types in the search bar, update state
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter agents by name OR email
  const filteredAgents = agents.filter((agent) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      agent.name.toLowerCase().includes(lowerSearch) ||
      agent.email.toLowerCase().includes(lowerSearch)
    );
  });

  // Logic
  const handleEditClick = (agent: Agent) => {
    setEditingAgent(agent);
  };
  const handleFormSuccess = () => {
    setEditingAgent(null);
  };
  const handleCancel = () => {
    setEditingAgent(null);
  };

  return (
    <div>
      <h1>Agents Management</h1>

      {/* Search bar */}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="search">Search Agents:</label>{" "}
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name or email..."
        />
      </div>

      {/* Agent Form (Add/Edit) */}
      <AgentForm
        editingAgent={editingAgent}
        onSuccess={handleFormSuccess}
        onCancel={handleCancel}
      />

      <hr />

      {/* Pass the filtered list and edit callback to AgentList */}
      <AgentList agents={filteredAgents} onEditClick={handleEditClick} />
    </div>
  );
}

export default AgentsPage;
