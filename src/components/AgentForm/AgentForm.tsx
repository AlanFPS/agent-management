// src/components/AgentForm.tsx
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

  // Whenever editingAgent changes, update form fields with its data (if any)
  useEffect(() => {
    if (editingAgent) {
      setName(editingAgent.name);
      setEmail(editingAgent.email);
      setStatus(editingAgent.status);
    } else {
      // Clear form for "Add" mode
      setName("");
      setEmail("");
      setStatus("Active");
    }
  }, [editingAgent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingAgent) {
      // "Edit" mode
      const updated: Agent = {
        ...editingAgent,
        name,
        email,
        status,
      };
      updateAgent(updated);
    } else {
      // "Add" mode
      const newAgent: Agent = {
        id: uuid(),
        name,
        email,
        status,
      };
      addAgent(newAgent);
    }

    // Let the parent component know we're done
    onSuccess();
  };

  return (
    <div>
      <h2>{editingAgent ? "Edit Agent" : "Add Agent"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="agentName">Name</label>
          <input
            id="agentName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="agentEmail">Email</label>
          <input
            id="agentEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="agentStatus">Status</label>
          <select
            id="agentStatus"
            value={status}
            onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button type="submit">
          {editingAgent ? "Update Agent" : "Add Agent"}
        </button>

        {/* Show Cancel button only in Edit mode */}
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
