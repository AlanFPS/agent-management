// src/components/AgentList.tsx
import React from "react";
import { useAgentsContext } from "../../context/AgentsContext";
import { Agent } from "../../types/Agent";

interface AgentListProps {
  onEditClick: (agent: Agent) => void;
}

function AgentList({ onEditClick }: AgentListProps) {
  const { agents, deleteAgent } = useAgentsContext();

  if (agents.length === 0) {
    return <p>No agents found. Please add one above!</p>;
  }

  return (
    <div>
      <h2>Agent List</h2>
      <ul>
        {agents.map((agent) => (
          <li key={agent.id}>
            <strong>{agent.name}</strong> — {agent.email} — {agent.status}{" "}
            <button onClick={() => deleteAgent(agent.id)}>Delete</button>{" "}
            <button onClick={() => onEditClick(agent)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AgentList;
