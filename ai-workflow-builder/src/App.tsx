import React from 'react';
import { GlobalStyles, AppContainer, MainContent } from './styles/GlobalStyles';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import ExecutionLogs from './components/ExecutionLogs';
import { useWorkflow } from './hooks/useWorkflow';
import { agentSections } from './utils/agentData';
import { AgentTemplate } from './types';

const App: React.FC = () => {
  const {
    agents,
    logs,
    isExecuting,
    executingAgents,
    addAgent,
    moveAgent,
    clearCanvas,
    executeWorkflow,
    saveWorkflow,
    executionStatus
  } = useWorkflow();

  const handleDragStart = (agent: AgentTemplate) => {
    // Handle drag start if needed for visual feedback
  };

  const handleDragEnd = () => {
    // Handle drag end if needed for cleanup
  };

  const handleAgentDrop = (agent: AgentTemplate, position: { x: number; y: number }) => {
    addAgent(agent, position);
  };

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header
          onRunWorkflow={executeWorkflow}
          onSaveWorkflow={saveWorkflow}
          onClearCanvas={clearCanvas}
          isExecuting={isExecuting}
        />
        <MainContent>
          <Sidebar
            sections={agentSections}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
          <Canvas
            agents={agents}
            onAgentDrop={handleAgentDrop}
            onAgentMove={moveAgent}
            executingAgents={executingAgents}
          />
          <ExecutionLogs
            logs={logs}
            status={executionStatus}
          />
        </MainContent>
      </AppContainer>
    </>
  );
};

export default App;