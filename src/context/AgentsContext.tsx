import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { Agent } from "../types/Agent";

const STORAGE_KEY = "agents_data";

interface AgentsContextProps {
  agents: Agent[];
  addAgent: (agent: Agent) => boolean;
  updateAgent: (updatedAgent: Agent) => boolean;
  deleteAgent: (id: string) => void;
  findAgentById: (id: string) => Agent | undefined;
}

const AgentsContext = createContext<AgentsContextProps | undefined>(undefined);

export function AgentsProvider({ children }: { children: ReactNode }) {
  // Load initial data from localStorage
  const [agents, setAgents] = useState<Agent[]>(() => {
    const storedAgents = localStorage.getItem(STORAGE_KEY);
    return storedAgents ? JSON.parse(storedAgents) : [];
  });

  // Whenever agents changes, save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agents));
  }, [agents]);

  // Prevent adding duplicate agents by email
  const addAgent = (agent: Agent) => {
    const emailExists = agents.some(
      (existing) => existing.email.toLowerCase() === agent.email.toLowerCase()
    );
    if (emailExists) {
      return false; // Indicate failure
    }
    setAgents((prev) => [...prev, agent]);
    return true; // Indicate success
  };

  // Update an existing agent by ID, optionally checking for duplicates if needed
  const updateAgent = (updatedAgent: Agent) => {
    // If you'd like to enforce unique emails on update as well, check here:
    const emailExists = agents.some(
      (a) =>
        a.id !== updatedAgent.id &&
        a.email.toLowerCase() === updatedAgent.email.toLowerCase()
    );
    if (emailExists) {
      return false;
    }
    setAgents((prev) =>
      prev.map((agent) => (agent.id === updatedAgent.id ? updatedAgent : agent))
    );
    return true;
  };

  // Remove an agent from the list
  const deleteAgent = (id: string) => {
    setAgents((prev) => prev.filter((agent) => agent.id !== id));
  };

  // Find an agent by ID (used in the details page)
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

// Custom hook to consume the context
export function useAgentsContext() {
  const context = useContext(AgentsContext);
  if (!context) {
    throw new Error("useAgentsContext must be used within an AgentsProvider");
  }
  return context;
}
