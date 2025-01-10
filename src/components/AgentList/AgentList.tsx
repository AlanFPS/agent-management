import React from "react";
import { Agent } from "../../types/Agent";
import { useAgentsContext } from "../../context/AgentsContext";
import { Link } from "react-router-dom";

interface AgentListProps {
  agents: Agent[];
  onEditClick: (agent: Agent) => void;
}

function AgentList({ agents, onEditClick }: AgentListProps) {
  const { deleteAgent } = useAgentsContext();

  if (agents.length === 0) {
    return <p>No agents found. Try adding one or adjust your search.</p>;
  }

  const handleDelete = async (id: string) => {
    await deleteAgent(id);
  };

  return (
    <div>
      <h2>Agent List</h2>
      <ul>
        {agents.map((agent) => (
          <li key={agent.id} style={{ marginBottom: "0.5rem" }}>
            <strong>{agent.name}</strong> — {agent.email} — {agent.status}
            {" | "}
            <button onClick={() => handleDelete(agent.id)}>Delete</button>
            {" | "}
            <button onClick={() => onEditClick(agent)}>Edit</button>
            {" | "}
            <Link to={`/agents/${agent.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AgentList;
