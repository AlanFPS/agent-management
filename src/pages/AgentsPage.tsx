import React, { useState } from "react";
import AgentForm from "../components/AgentForm/AgentForm";
import AgentList from "../components/AgentList/AgentList";
import { Agent } from "../types/Agent";
import { useAgentsContext } from "../context/AgentsContext";

function AgentsPage() {
  const { agents } = useAgentsContext();

  // For editing
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);

  // For search
  const [searchTerm, setSearchTerm] = useState("");

  // When user types in the search bar
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter the agents by name or email
  const filteredAgents = agents.filter((agent) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      agent.name.toLowerCase().includes(lowerSearch) ||
      agent.email.toLowerCase().includes(lowerSearch)
    );
  });

  // Edit logic
  const handleEditClick = (agent: Agent) => {
    setEditingAgent(agent);
  };

  // Called by AgentForm upon success (add/update)
  const handleFormSuccess = () => {
    setEditingAgent(null);
  };

  // Called if the user cancels editing
  const handleCancel = () => {
    setEditingAgent(null);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Agents Management</h1>

      {/* Search Bar */}
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

      {/* Agent List */}
      <AgentList agents={filteredAgents} onEditClick={handleEditClick} />
    </div>
  );
}

export default AgentsPage;
