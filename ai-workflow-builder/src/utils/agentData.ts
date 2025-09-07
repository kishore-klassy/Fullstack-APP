import { SectionData } from '../types';

export const agentSections: SectionData[] = [
  {
    id: 'data-processing',
    title: 'Data Processing',
    collapsed: false,
    agents: [
      {
        type: 'data-collector',
        title: 'Data Collector',
        description: 'Gathers and preprocesses data from various sources'
      },
      {
        type: 'data-transformer',
        title: 'Data Transformer',
        description: 'Transforms and normalizes data formats'
      },
      {
        type: 'data-validator',
        title: 'Data Validator',
        description: 'Validates data quality and integrity'
      }
    ]
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    collapsed: false,
    agents: [
      {
        type: 'model-trainer',
        title: 'Model Trainer',
        description: 'Trains ML models with provided datasets'
      },
      {
        type: 'predictor',
        title: 'Predictor',
        description: 'Makes predictions using trained models'
      },
      {
        type: 'evaluator',
        title: 'Model Evaluator',
        description: 'Evaluates model performance and accuracy'
      }
    ]
  },
  {
    id: 'automation',
    title: 'Automation',
    collapsed: false,
    agents: [
      {
        type: 'scheduler',
        title: 'Task Scheduler',
        description: 'Schedules and manages automated tasks'
      },
      {
        type: 'notifier',
        title: 'Notifier',
        description: 'Sends notifications and alerts'
      },
      {
        type: 'monitor',
        title: 'System Monitor',
        description: 'Monitors system health and performance'
      }
    ]
  },
  {
    id: 'analysis',
    title: 'Analysis',
    collapsed: false,
    agents: [
      {
        type: 'analyzer',
        title: 'Data Analyzer',
        description: 'Performs statistical analysis on datasets'
      },
      {
        type: 'visualizer',
        title: 'Visualizer',
        description: 'Creates charts and visual representations'
      },
      {
        type: 'reporter',
        title: 'Report Generator',
        description: 'Generates comprehensive reports'
      }
    ]
  }
];