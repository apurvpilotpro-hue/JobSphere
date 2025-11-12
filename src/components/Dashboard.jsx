import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import ApplicationStats from './ApplicationStats';
import ApplicationsList from './ApplicationsList';
import ApplicationCharts from './ApplicationCharts';

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom component="h1">
        Job Applications Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ApplicationStats />
        </Grid>
        
        <Grid item xs={12} md={8}>
          <ApplicationCharts />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <ApplicationsList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;