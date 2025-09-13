
import React from 'react';
import { Grid } from '@mui/material'; // Importing Material-UI's Grid system for responsiveness

// Dashboard component
const Dashboard = () => {
  return (
    <div>
      {/* Using Material-UI's Grid system for responsive layout */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <div style={{ border: '1px solid black', padding: '20px' }}>Widget 1</div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div style={{ border: '1px solid black', padding: '20px' }}>Widget 2</div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div style={{ border: '1px solid black', padding: '20px' }}>Widget 3</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
