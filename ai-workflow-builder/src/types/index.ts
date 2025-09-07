export interface Agent {
  id: string;
  type: string;
  title: string;
  description: string;
  position?: { x: number; y: number };
}

export interface AgentTemplate {
  type: string;
  title: string;
  description: string;
}

export interface LogEntry {
  id: string;
  type: 'success' | 'error' | 'progress' | 'warning';
  message: string;
  timestamp: string;
  details?: string;
}

export interface WorkflowData {
  id: number;
  name: string;
  agents: Agent[];
  created: string;
}

export interface SectionData {
  id: string;
  title: string;
  agents: AgentTemplate[];
  collapsed: boolean;
}