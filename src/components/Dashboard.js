
import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

// Define styles using makeStyles
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
  },
  widget: {
    padding: "15px",
    margin: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={12} md={6} className={classes.widget}>
        <div>Widget 1</div>
      </Grid>
      <Grid item xs={12} md={6} className={classes.widget}>
        <div>Widget 2</div>
      </Grid>
      <Grid item xs={12} className={classes.widget}>
        <div>Widget 3</div>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
