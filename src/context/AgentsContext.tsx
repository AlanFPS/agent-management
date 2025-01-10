import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { Agent } from "../types/Agent";

const API_URL = "http://localhost:3000/agents";

interface AgentsContextProps {
  agents: Agent[];
  addAgent: (agent: Agent) => Promise<boolean>;
  updateAgent: (agent: Agent) => Promise<boolean>;
  deleteAgent: (id: string) => Promise<void>;
  findAgentById: (id: string) => Agent | undefined;
}

const AgentsContext = createContext<AgentsContextProps | undefined>(undefined);

export function AgentsProvider({ children }: { children: ReactNode }) {
  // Local state to store the agents fetched from our JSON server
  const [agents, setAgents] = useState<Agent[]>([]);

  // Fetch the agents from JSON Server on mount
  useEffect(() => {
    // GET /agents
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch agents");
        }
        return res.json();
      })
      .then((data: Agent[]) => {
        setAgents(data);
      })
      .catch((error) => {
        // In a real app, handle error states more gracefully
        console.error(error);
      });
  }, []);

  // POST /agents
  const addAgent = async (agent: Agent) => {
    // Check for duplicate emails before sending to server
    const emailExists = agents.some(
      (a) => a.email.toLowerCase() === agent.email.toLowerCase()
    );
    if (emailExists) {
      return false;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agent),
      });
      if (!response.ok) {
        return false;
      }
      // Server responds with the newly created agent object
      const createdAgent: Agent = await response.json();
      setAgents((prev) => [...prev, createdAgent]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // PUT /agents/:id
  const updateAgent = async (updatedAgent: Agent) => {
    // Check for duplicates (excluding the agent being updated)
    const emailExists = agents.some(
      (a) =>
        a.id !== updatedAgent.id &&
        a.email.toLowerCase() === updatedAgent.email.toLowerCase()
    );
    if (emailExists) {
      return false;
    }

    try {
      const response = await fetch(`${API_URL}/${updatedAgent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAgent),
      });
      if (!response.ok) {
        return false;
      }
      // Replace the agent in local state if server update is successful
      setAgents((prev) =>
        prev.map((agent) =>
          agent.id === updatedAgent.id ? updatedAgent : agent
        )
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // DELETE /agents/:id
  const deleteAgent = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete agent");
      }
      // Remove agent from local state
      setAgents((prev) => prev.filter((agent) => agent.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Locate a single agent in local state by ID (used in details page)
  const findAgentById = (id: string) => {
    return agents.find((agent) => agent.id === id);
  };

  const value: AgentsContextProps = {
    agents,
    addAgent,
    updateAgent,
    deleteAgent,
    findAgentById,
  };

  return (
    <AgentsContext.Provider value={value}>{children}</AgentsContext.Provider>
  );
}

export function useAgentsContext() {
  const context = useContext(AgentsContext);
  if (!context) {
    throw new Error("useAgentsContext must be used within an AgentsProvider");
  }
  return context;
}
