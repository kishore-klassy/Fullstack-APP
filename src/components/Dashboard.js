
import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';

const Dashboard = () => {
  // Sample data for Chart.js
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Data Trend',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Grid container spacing={3} style={{ padding: '20px' }}>
      {/* Responsive Cards for Key Metrics */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">Metric 1</Typography>
            <Typography variant="h6">Value: 100</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">Metric 2</Typography>
            <Typography variant="h6">Value: 200</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">Metric 3</Typography>
            <Typography variant="h6">Value: 300</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Chart.js Line Chart */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>Data Visualization</Typography>
            <Line data={chartData} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
