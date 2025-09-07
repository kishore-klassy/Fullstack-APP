import React, { useState } from 'react';
import styled from 'styled-components';
import { SectionData, AgentTemplate } from '../types';

const SidebarContainer = styled.aside`
  width: 20%;
  background: linear-gradient(180deg, #1a1a1a, #0f0f0f);
  border-right: 1px solid #333;
  overflow-y: auto;
  padding: 20px;

  @media (max-width: 1024px) {
    width: 25%;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const SidebarSection = styled.div`
  margin-bottom: 24px;
`;

const SectionHeader = styled.div<{ collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #333;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #6a11cb;
  }
`;

const SectionTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const CollapseIcon = styled.span<{ collapsed: boolean }>`
  transition: transform 0.3s ease;
  transform: ${props => props.collapsed ? 'rotate(-90deg)' : 'rotate(0deg)'};
`;

const AgentList = styled.div<{ collapsed: boolean }>`
  display: ${props => props.collapsed ? 'none' : 'flex'};
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease;
`;

const AgentCard = styled.div<{ isDragging?: boolean }>`
  background: linear-gradient(135deg, #2a2a2a, #1f1f1f);
  border-radius: 12px;
  padding: 16px;
  cursor: grab;
  transition: all 0.3s ease;
  border: 1px solid #333;
  position: relative;
  overflow: hidden;
  opacity: ${props => props.isDragging ? 0.5 : 1};
  transform: ${props => props.isDragging ? 'rotate(5deg)' : 'none'};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(106, 17, 203, 0.2);
    border-color: #6a11cb;
  }

  &:active {
    cursor: grabbing;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const AgentTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #ffffff;
`;

const AgentDescription = styled.div`
  font-size: 12px;
  color: #aaaaaa;
  line-height: 1.4;
`;

interface SidebarProps {
  sections: SectionData[];
  onDragStart: (agent: AgentTemplate) => void;
  onDragEnd: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sections: initialSections, onDragStart, onDragEnd }) => {
  const [sections, setSections] = useState<SectionData[]>(initialSections);
  const [draggedAgent, setDraggedAgent] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, collapsed: !section.collapsed }
        : section
    ));
  };

  const handleDragStart = (e: React.DragEvent, agent: AgentTemplate) => {
    const agentId = `${agent.type}_${Date.now()}`;
    setDraggedAgent(agentId);
    
    e.dataTransfer.setData('text/plain', JSON.stringify(agent));
    onDragStart(agent);
  };

  const handleDragEnd = () => {
    setDraggedAgent(null);
    onDragEnd();
  };

  return (
    <SidebarContainer>
      {sections.map(section => (
        <SidebarSection key={section.id}>
          <SectionHeader 
            collapsed={section.collapsed}
            onClick={() => toggleSection(section.id)}
          >
            <SectionTitle>{section.title}</SectionTitle>
            <CollapseIcon collapsed={section.collapsed}>▼</CollapseIcon>
          </SectionHeader>
          <AgentList collapsed={section.collapsed}>
            {section.agents.map((agent, index) => {
              const agentId = `${agent.type}_${index}`;
              return (
                <AgentCard
                  key={agentId}
                  draggable
                  isDragging={draggedAgent === agentId}
                  onDragStart={(e) => handleDragStart(e, agent)}
                  onDragEnd={handleDragEnd}
                >
                  <AgentTitle>{agent.title}</AgentTitle>
                  <AgentDescription>{agent.description}</AgentDescription>
                </AgentCard>
              );
            })}
          </AgentList>
        </SidebarSection>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;