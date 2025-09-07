import { useState, useCallback } from 'react';
import { Agent, AgentTemplate, LogEntry, WorkflowData } from '../types';

export const useWorkflow = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 'init',
      type: 'success',
      message: 'System initialized',
      timestamp: 'Ready for workflow execution',
      details: ''
    }
  ]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executingAgents, setExecutingAgents] = useState<{ [key: string]: 'success' | 'error' | 'progress' }>({});
  const [executionId, setExecutionId] = useState(0);

  const addLogEntry = useCallback((
    type: LogEntry['type'], 
    message: string, 
    details: string = ''
  ) => {
    const newLog: LogEntry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      message,
      timestamp: new Date().toLocaleTimeString(),
      details
    };
    
    setLogs(prev => {
      const newLogs = [...prev, newLog];
      // Keep only last 50 entries
      return newLogs.length > 50 ? newLogs.slice(-50) : newLogs;
    });
  }, []);

  const addAgent = useCallback((agentTemplate: AgentTemplate, position: { x: number; y: number }) => {
    const newAgent: Agent = {
      id: `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: agentTemplate.type,
      title: agentTemplate.title,
      description: agentTemplate.description,
      position
    };
    
    setAgents(prev => [...prev, newAgent]);
  }, []);

  const moveAgent = useCallback((agentId: string, position: { x: number; y: number }) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, position }
        : agent
    ));
  }, []);

  const clearCanvas = useCallback(() => {
    if (isExecuting) {
      addLogEntry('warning', 'Cannot clear canvas', 'Workflow execution in progress');
      return;
    }

    setAgents([]);
    setExecutingAgents({});
    addLogEntry('success', 'Canvas cleared', 'All agents removed from workflow');
  }, [isExecuting, addLogEntry]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const getRandomError = () => {
    const errors = [
      'Connection timeout',
      'Invalid data format',
      'Memory allocation failed',
      'API rate limit exceeded',
      'Authentication failed',
      'Resource not found'
    ];
    return errors[Math.floor(Math.random() * errors.length)];
  };

  const executeWorkflow = useCallback(async () => {
    if (isExecuting) {
      addLogEntry('warning', 'Workflow execution already in progress', 'Please wait for current execution to complete');
      return;
    }

    if (agents.length === 0) {
      addLogEntry('error', 'No agents in workflow', 'Add agents to the canvas before executing');
      return;
    }

    setIsExecuting(true);
    const currentExecutionId = executionId + 1;
    setExecutionId(currentExecutionId);
    setExecutingAgents({});

    addLogEntry('progress', `Starting workflow execution #${currentExecutionId}`, `Processing ${agents.length} agents`);

    // Execute each agent
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      
      // Set agent as currently executing
      setExecutingAgents(prev => ({ ...prev, [agent.id]: 'progress' }));
      
      addLogEntry('progress', `Executing ${agent.title}`, agent.description);
      
      // Simulate processing time
      await delay(1000 + Math.random() * 2000);
      
      // Simulate success/failure (90% success rate)
      const success = Math.random() > 0.1;
      
      if (success) {
        setExecutingAgents(prev => ({ ...prev, [agent.id]: 'success' }));
        addLogEntry('success', `${agent.title} completed successfully`, `Processed in ${(Math.random() * 3 + 1).toFixed(2)}s`);
      } else {
        setExecutingAgents(prev => ({ ...prev, [agent.id]: 'error' }));
        addLogEntry('error', `${agent.title} failed`, `Error: ${getRandomError()}`);
      }
      
      await delay(500);
    }

    addLogEntry('success', `Workflow execution #${currentExecutionId} completed`, `All agents processed successfully`);
    setIsExecuting(false);
    
    // Clear execution status after 2 seconds
    setTimeout(() => {
      setExecutingAgents({});
    }, 2000);
  }, [agents, isExecuting, executionId, addLogEntry]);

  const saveWorkflow = useCallback(() => {
    const workflowData: WorkflowData = {
      id: Date.now(),
      name: `Workflow_${new Date().toISOString().split('T')[0]}`,
      agents,
      created: new Date().toISOString()
    };
    
    // Save to localStorage (in a real app, this would be sent to a server)
    localStorage.setItem('aiWorkflow', JSON.stringify(workflowData));
    
    addLogEntry('success', 'Workflow saved', `Saved ${agents.length} agents to local storage`);
  }, [agents, addLogEntry]);

  const getExecutionStatus = () => {
    if (isExecuting) return 'Executing workflow...';
    if (agents.length === 0) return 'Ready to execute';
    return 'Execution completed';
  };

  return {
    agents,
    logs,
    isExecuting,
    executingAgents,
    addAgent,
    moveAgent,
    clearCanvas,
    executeWorkflow,
    saveWorkflow,
    executionStatus: getExecutionStatus()
  };
};