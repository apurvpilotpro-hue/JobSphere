import React from 'react';
import { Box, Paper, Grid, Typography } from '@mui/material';
import {
  WorkOutline,
  CheckCircleOutline,
  CancelOutlined,
  Timeline
} from '@mui/icons-material';

const StatCard = ({ title, value, icon }) => (
  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
    <Box sx={{ mr: 2 }}>{icon}</Box>
    <Box>
      <Typography variant="h6">{value}</Typography>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
    </Box>
  </Paper>
);

const ApplicationStats = () => {
  // This would come from props or context in a real application
  const stats = {
    totalApplications: 20,
    acceptedApplications: 2,
    rejectedApplications: 18,
    inProgress: 0
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Total Applications"
          value={stats.totalApplications}
          icon={<WorkOutline />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Accepted"
          value={stats.acceptedApplications}
          icon={<CheckCircleOutline color="success" />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Rejected"
          value={stats.rejectedApplications}
          icon={<CancelOutlined color="error" />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={<Timeline color="primary" />}
        />
      </Grid>
    </Grid>
  );
};

export default ApplicationStats;