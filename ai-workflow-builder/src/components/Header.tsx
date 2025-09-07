import React from 'react';
import styled from 'styled-components';
import { Button } from '../styles/GlobalStyles';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
  padding: 16px 24px;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const AppTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeaderControls = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

interface HeaderProps {
  onRunWorkflow: () => void;
  onSaveWorkflow: () => void;
  onClearCanvas: () => void;
  isExecuting: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onRunWorkflow,
  onSaveWorkflow,
  onClearCanvas,
  isExecuting
}) => {
  return (
    <HeaderContainer>
      <AppTitle>AI Workflow Builder</AppTitle>
      <HeaderControls>
        <Button onClick={onRunWorkflow} disabled={isExecuting}>
          {isExecuting ? 'Running...' : 'Run Workflow'}
        </Button>
        <Button variant="secondary" onClick={onSaveWorkflow}>
          Save Workflow
        </Button>
        <Button variant="danger" onClick={onClearCanvas} disabled={isExecuting}>
          Clear Canvas
        </Button>
      </HeaderControls>
    </HeaderContainer>
  );
};

export default Header;