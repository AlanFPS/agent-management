import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useAgentsContext } from "../../context/AgentsContext";
import { Agent } from "../../types/Agent";

interface AgentFormProps {
  editingAgent: Agent | null;
  onSuccess: () => void; // Called after successful add/update
  onCancel: () => void; // Called when user cancels editing
}

function AgentForm({ editingAgent, onSuccess, onCancel }: AgentFormProps) {
  const { addAgent, updateAgent } = useAgentsContext();

  // Local form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [error, setError] = useState("");

  // Whenever editingAgent changes, update form fields with its data (if any)
  useEffect(() => {
    if (editingAgent) {
      setName(editingAgent.name);
      setEmail(editingAgent.email);
      setStatus(editingAgent.status);
      setError("");
    } else {
      // Clear form for "Add" mode
      setName("");
      setEmail("");
      setStatus("Active");
      setError("");
    }
  }, [editingAgent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (editingAgent) {
      // Attempt to update existing agent
      const updated: Agent = {
        ...editingAgent,
        name,
        email,
        status,
      };
      const success = updateAgent(updated);
      if (!success) {
        setError("Duplicate email found. Please use a different email.");
        return;
      }
    } else {
      // Attempt to add new agent
      const newAgent: Agent = {
        id: uuid(),
        name,
        email,
        status,
      };
      const success = addAgent(newAgent);
      if (!success) {
        setError("Duplicate email found. Please use a different email.");
        return;
      }
    }

    // If successful, notify parent and clear editing
    onSuccess();
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h2>{editingAgent ? "Edit Agent" : "Add Agent"}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label htmlFor="agentName">Name: </label>
          <input
            id="agentName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label htmlFor="agentEmail">Email: </label>
          <input
            id="agentEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label htmlFor="agentStatus">Status: </label>
          <select
            id="agentStatus"
            value={status}
            onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button type="submit" style={{ marginRight: "1rem" }}>
          {editingAgent ? "Update Agent" : "Add Agent"}
        </button>

        {editingAgent && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default AgentForm;
