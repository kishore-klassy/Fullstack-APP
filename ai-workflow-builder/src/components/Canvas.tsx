import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Agent, AgentTemplate } from '../types';

const CanvasContainer = styled.main`
  width: 60%;
  background: radial-gradient(circle at 50% 50%, #1a1a1a, #0f0f0f);
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 50%;
  }

  @media (max-width: 768px) {
    width: 100%;
    flex: 1;
  }
`;

const CanvasArea = styled.div<{ isDragOver: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  background-color: ${props => props.isDragOver ? 'rgba(106, 17, 203, 0.1)' : 'transparent'};
  border: ${props => props.isDragOver ? '2px dashed #6a11cb' : '2px dashed transparent'};
`;

const CanvasPlaceholder = styled.div<{ hidden: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #666;
  pointer-events: none;
  transition: opacity 0.3s ease;
  opacity: ${props => props.hidden ? 0 : 1};
`;

const PlaceholderIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.3;
`;

const PlaceholderText = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const PlaceholderSubtext = styled.div`
  font-size: 14px;
  opacity: 0.7;
`;

const CanvasAgent = styled.div<{ 
  x: number; 
  y: number; 
  isDragging?: boolean;
  isExecuting?: boolean;
  executionStatus?: 'success' | 'error' | 'progress';
}>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border-radius: 12px;
  padding: 16px;
  min-width: 160px;
  cursor: move;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(106, 17, 203, 0.3);
  border: 2px solid ${props => {
    if (props.executionStatus === 'success') return '#10b981';
    if (props.executionStatus === 'error') return '#ef4444';
    if (props.executionStatus === 'progress') return '#f59e0b';
    return 'transparent';
  }};
  transform: ${props => props.isDragging ? 'rotate(5deg) scale(1.1)' : 'scale(1)'};
  z-index: ${props => props.isDragging ? 1000 : 1};

  &:hover {
    transform: ${props => props.isDragging ? 'rotate(5deg) scale(1.1)' : 'scale(1.05)'};
    box-shadow: 0 12px 35px rgba(106, 17, 203, 0.4);
    border-color: ${props => {
      if (props.executionStatus === 'success') return '#10b981';
      if (props.executionStatus === 'error') return '#ef4444';
      if (props.executionStatus === 'progress') return '#f59e0b';
      return 'rgba(255, 255, 255, 0.2)';
    }};
  }
`;

const CanvasAgentTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #ffffff;
`;

const CanvasAgentDescription = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.3;
`;

const ConnectionPoint = styled.div<{ type: 'input' | 'output'; visible: boolean }>`
  position: absolute;
  width: 12px;
  height: 12px;
  background: #ffffff;
  border-radius: 50%;
  border: 2px solid #6a11cb;
  cursor: crosshair;
  opacity: ${props => props.visible ? 1 : 0};
  transition: all 0.3s ease;
  ${props => props.type === 'input' ? `
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
  ` : `
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
  `}
`;

interface CanvasProps {
  agents: Agent[];
  onAgentDrop: (agent: AgentTemplate, position: { x: number; y: number }) => void;
  onAgentMove: (agentId: string, position: { x: number; y: number }) => void;
  executingAgents: { [key: string]: 'success' | 'error' | 'progress' };
}

const Canvas: React.FC<CanvasProps> = ({ 
  agents, 
  onAgentDrop, 
  onAgentMove, 
  executingAgents 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [draggingAgent, setDraggingAgent] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number; agentX: number; agentY: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!canvasRef.current?.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    try {
      const agentData: AgentTemplate = JSON.parse(e.dataTransfer.getData('text/plain'));
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left - 80; // Offset to center the agent
        const y = e.clientY - rect.top - 40;
        onAgentDrop(agentData, { x, y });
      }
    } catch (error) {
      console.error('Error parsing dropped agent data:', error);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (!agent?.position) return;

    setDraggingAgent(agentId);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      agentX: agent.position.x,
      agentY: agent.position.y
    });
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingAgent || !dragStart) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    const newX = dragStart.agentX + deltaX;
    const newY = dragStart.agentY + deltaY;
    
    onAgentMove(draggingAgent, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setDraggingAgent(null);
    setDragStart(null);
  };

  return (
    <CanvasContainer>
      <CanvasArea
        ref={canvasRef}
        isDragOver={isDragOver}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <CanvasPlaceholder hidden={agents.length > 0}>
          <PlaceholderIcon>🤖</PlaceholderIcon>
          <PlaceholderText>Build Your AI Workflow</PlaceholderText>
          <PlaceholderSubtext>Drag agents from the sidebar to get started</PlaceholderSubtext>
        </CanvasPlaceholder>
        
        {agents.map(agent => (
          <CanvasAgent
            key={agent.id}
            x={agent.position?.x || 0}
            y={agent.position?.y || 0}
            isDragging={draggingAgent === agent.id}
            executionStatus={executingAgents[agent.id]}
            onMouseDown={(e) => handleMouseDown(e, agent.id)}
          >
            <ConnectionPoint type="input" visible={true} />
            <CanvasAgentTitle>{agent.title}</CanvasAgentTitle>
            <CanvasAgentDescription>{agent.description}</CanvasAgentDescription>
            <ConnectionPoint type="output" visible={true} />
          </CanvasAgent>
        ))}
      </CanvasArea>
    </CanvasContainer>
  );
};

export default Canvas;