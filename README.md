# AI Workflow Builder - React App

A modern React TypeScript application converted from vanilla HTML/CSS/JavaScript. This app provides a drag-and-drop interface for building AI workflows with visual execution tracking.

## Features

- 🎨 **Modern UI**: Clean, dark theme with gradient accents
- 🖱️ **Drag & Drop**: Intuitive workflow building with HTML5 drag API
- 🚀 **Real-time Execution**: Visual workflow execution with live status updates
- 📊 **Execution Logs**: Detailed logging with timestamps and status indicators
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 💾 **Persistent Storage**: Save workflows to localStorage
- ⚡ **TypeScript**: Full type safety and excellent developer experience

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the React app directory:
```bash
cd ai-workflow-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Architecture

### Components
- **Header**: Navigation bar with workflow controls
- **Sidebar**: Collapsible sections of draggable AI agents
- **Canvas**: Main workspace for building workflows
- **ExecutionLogs**: Real-time execution status and logging

### State Management
- Custom React hooks for workflow state management
- TypeScript interfaces for type safety
- Local storage for persistence

### Styling
- Styled-components for CSS-in-JS
- Responsive design with mobile-first approach
- Modern gradient themes and animations

## Agent Types

The app includes several categories of AI agents:

### Data Processing
- **Data Collector**: Gathers and preprocesses data from various sources
- **Data Transformer**: Transforms and normalizes data formats  
- **Data Validator**: Validates data quality and integrity

### Machine Learning
- **Model Trainer**: Trains ML models with provided datasets
- **Predictor**: Makes predictions using trained models
- **Model Evaluator**: Evaluates model performance and accuracy

### Automation
- **Task Scheduler**: Schedules and manages automated tasks
- **Notifier**: Sends notifications and alerts
- **System Monitor**: Monitors system health and performance

### Analysis
- **Data Analyzer**: Performs statistical analysis on datasets
- **Visualizer**: Creates charts and visual representations
- **Report Generator**: Generates comprehensive reports

## Usage

1. **Build Workflow**: Drag agents from the sidebar to the canvas
2. **Arrange**: Position agents by dragging them around the canvas
3. **Execute**: Click "Run Workflow" to simulate execution
4. **Monitor**: Watch real-time logs in the execution panel
5. **Save**: Save your workflow for later use

## Technical Stack

- **React 19** with TypeScript
- **Styled-Components** for styling
- **HTML5 Drag and Drop API** for interactions
- **Create React App** for build tooling
- **Inter Font** for modern typography

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

This is a demonstration project showcasing the conversion from vanilla JavaScript to modern React. Feel free to extend it with additional features like:

- Real AI agent integrations
- Advanced workflow connections
- Export/import functionality
- Collaborative editing
- Advanced analytics

## License

MIT License - feel free to use this code for your own projects!
