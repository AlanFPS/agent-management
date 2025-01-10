import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Agent } from "../types/Agent";

// LocalStorage key for persistent data
const STORAGE_KEY = "agents_data";

interface AgentsContextProps {
  agents: Agent[];
  addAgent: (agent: Agent) => void;
  updateAgent: (updatedAgent: Agent) => void;
  deleteAgent: (id: string) => void;
}

// Create context
const AgentsContext = createContext<AgentsContextProps | undefined>(undefined);

export function AgentsProvider({ children }: { children: ReactNode }) {
  // Initialize state, pulling from localStorage if available
  const [agents, setAgents] = useState<Agent[]>(() => {
    const storedAgents = localStorage.getItem(STORAGE_KEY);
    return storedAgents ? JSON.parse(storedAgents) : [];
  });

  // Sync changes to localStorage whenever "agents" changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agents));
  }, [agents]);

  // CRUD actions
  const addAgent = (agent: Agent) => {
    setAgents((prev) => [...prev, agent]);
  };

  const updateAgent = (updatedAgent: Agent) => {
    setAgents((prev) =>
      prev.map((agent) => (agent.id === updatedAgent.id ? updatedAgent : agent))
    );
  };

  const deleteAgent = (id: string) => {
    setAgents((prev) => prev.filter((agent) => agent.id !== id));
  };

  const value: AgentsContextProps = {
    agents,
    addAgent,
    updateAgent,
    deleteAgent,
  };

  return (
    <AgentsContext.Provider value={value}>{children}</AgentsContext.Provider>
  );
}

// Custom hook to use AgentsContext
export function useAgentsContext() {
  const context = useContext(AgentsContext);
  if (!context) {
    throw new Error("useAgentsContext must be used within an AgentsProvider");
  }
  return context;
}
