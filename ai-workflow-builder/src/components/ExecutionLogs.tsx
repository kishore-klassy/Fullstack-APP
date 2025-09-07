import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { LogEntry } from '../types';

const LogsContainer = styled.aside`
  width: 20%;
  background: linear-gradient(180deg, #1a1a1a, #0f0f0f);
  border-left: 1px solid #333;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    width: 25%;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const ExecutionHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #333;
`;

const ExecutionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ExecutionStatus = styled.div`
  font-size: 12px;
  color: #aaaaaa;
`;

const LogsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const LogEntryContainer = styled.div<{ type: 'success' | 'error' | 'progress' | 'warning' }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  border-left: 3px solid ${props => {
    switch (props.type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'progress': return '#f59e0b';
      case 'warning': return '#f59e0b';
      default: return 'transparent';
    }
  }};
  animation: slideIn 0.3s ease;
`;

const LogStatus = styled.div<{ type: 'success' | 'error' | 'progress' | 'warning' }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
  background: ${props => {
    switch (props.type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'progress': return '#f59e0b';
      case 'warning': return '#f59e0b';
      default: return '#666';
    }
  }};
  box-shadow: ${props => {
    switch (props.type) {
      case 'success': return '0 0 10px rgba(16, 185, 129, 0.5)';
      case 'error': return '0 0 10px rgba(239, 68, 68, 0.5)';
      case 'progress': return '0 0 10px rgba(245, 158, 11, 0.5)';
      case 'warning': return '0 0 10px rgba(245, 158, 11, 0.5)';
      default: return 'none';
    }
  }};
  animation: ${props => props.type === 'progress' ? 'pulse 2s infinite' : 'none'};
`;

const LogContent = styled.div`
  flex: 1;
`;

const LogMessage = styled.div`
  font-size: 13px;
  color: #ffffff;
  margin-bottom: 4px;
  font-weight: 500;
`;

const LogTimestamp = styled.div`
  font-size: 11px;
  color: #888888;
`;

const LogDetails = styled.div`
  font-size: 12px;
  color: #cccccc;
  margin-top: 4px;
  line-height: 1.4;
`;

interface ExecutionLogsProps {
  logs: LogEntry[];
  status: string;
}

const ExecutionLogs: React.FC<ExecutionLogsProps> = ({ logs, status }) => {
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <LogsContainer>
      <ExecutionHeader>
        <ExecutionTitle>Execution Flow</ExecutionTitle>
        <ExecutionStatus>{status}</ExecutionStatus>
      </ExecutionHeader>
      <LogsList>
        {logs.map(log => (
          <LogEntryContainer key={log.id} type={log.type}>
            <LogStatus type={log.type} />
            <LogContent>
              <LogMessage>{log.message}</LogMessage>
              <LogTimestamp>{log.timestamp}</LogTimestamp>
              {log.details && <LogDetails>{log.details}</LogDetails>}
            </LogContent>
          </LogEntryContainer>
        ))}
        <div ref={logsEndRef} />
      </LogsList>
    </LogsContainer>
  );
};

export default ExecutionLogs;