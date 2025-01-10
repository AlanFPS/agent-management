import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAgentsContext } from "../context/AgentsContext";

function AgentDetailsPage() {
  const { id } = useParams();
  const { findAgentById } = useAgentsContext();

  // Find agent in local state
  const agent = id ? findAgentById(id) : undefined;

  if (!agent) {
    return (
      <div style={{ padding: "1rem" }}>
        <h2>Agent Not Found</h2>
        <Link to="/">Back to Agents</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Agent Details</h2>
      <p>
        <strong>Name:</strong> {agent.name}
      </p>
      <p>
        <strong>Email:</strong> {agent.email}
      </p>
      <p>
        <strong>Status:</strong> {agent.status}
      </p>
      <Link to="/">Back to Agents</Link>
    </div>
  );
}

export default AgentDetailsPage;
