import React, { useState } from 'react';
import { Paper, Typography, IconButton, Box, Grid } from '@mui/material';
import {
  Work as WorkIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Refresh as RefreshIcon,
  AccessTime as TimeIcon,
  TrendingUp as TrendingUpIcon,
  BusinessCenter as BusinessIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import ApplicationsListModal from './ApplicationsListModal';
import { useApplications } from '../../contexts/ApplicationsContext';

const StatCard = ({ title, value, icon, color, onClick }) => (
  <Paper
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: 140,
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
      },
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: -20,
        right: -20,
        width: 100,
        height: 100,
        borderRadius: '50%',
        backgroundColor: `${color}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}
    </Box>
    <Typography color="textSecondary" variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography component="p" variant="h4">
      {value}
    </Typography>
  </Paper>
);

const DashboardStats = () => {
  const { applications, loading, error } = useApplications();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  
  // Ensure applications is an array
  const appArray = Array.isArray(applications) ? applications : [];

  // Show loading state
  if (loading) {
    return (
      <Box sx={{ flexGrow: 1, mb: 4 }}>
        <Typography>Loading statistics...</Typography>
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Box sx={{ flexGrow: 1, mb: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const getFilteredCount = (filterFn) => {
    try {
      return appArray.filter(filterFn).length;
    } catch (err) {
      console.error('Error filtering applications:', err);
      return 0;
    }
  };

  const handleCardClick = (title, filteredApps) => {
    setModalTitle(title);
    setSelectedApplications(filteredApps);
    setModalOpen(true);
  };

  const stats = [
    {
      title: 'Total Applications',
      value: appArray.length || 0,
      icon: <WorkIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      color: '#1976d2',
      onClick: () => handleCardClick('All Applications', appArray),
    },
    {
      title: 'Accepted',
      value: getFilteredCount(app => app?.finalOutcome === 'Accepted'),
      icon: <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      color: '#2e7d32',
      onClick: () => handleCardClick('Accepted Applications', 
        appArray.filter(app => app?.finalOutcome === 'Accepted')),
    },
    {
      title: 'Rejected',
      value: getFilteredCount(app => app?.finalOutcome === 'Rejected'),
      icon: <CancelIcon sx={{ fontSize: 40, color: 'error.main' }} />,
      color: '#d32f2f',
      onClick: () => handleCardClick('Rejected Applications',
        appArray.filter(app => app?.finalOutcome === 'Rejected')),
    },
    {
      title: 'In Progress',
      value: getFilteredCount(app => app?.status === 'Interview' || app?.status === 'Under Review'),
      icon: <RefreshIcon sx={{ fontSize: 40, color: 'info.main' }} />,
      color: '#0288d1',
      onClick: () => handleCardClick('Applications In Progress',
        appArray.filter(app => app?.status === 'Interview' || app?.status === 'Under Review')),
    },
  ];

  const insights = [
    {
      title: 'Average Response Time',
      value: '5.2 days',
      icon: <TimeIcon sx={{ fontSize: 30, color: 'primary.main' }} />,
    },
    {
      title: 'Success Rate',
      value: `${((appArray.filter(app => app.finalOutcome === 'Accepted').length / appArray.length) * 100).toFixed(1)}%`,
      icon: <TrendingUpIcon sx={{ fontSize: 30, color: 'success.main' }} />,
    },
    {
      title: 'Most Applied Industry',
      value: 'IT Services',
      icon: <BusinessIcon sx={{ fontSize: 30, color: 'secondary.main' }} />,
    },
    {
      title: 'Top Location',
      value: 'Bengaluru',
      icon: <LocationIcon sx={{ fontSize: 30, color: 'info.main' }} />,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <ApplicationsListModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        applications={selectedApplications}
      />
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box onClick={stat.onClick}>
              <StatCard {...stat} />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {insights.map((insight, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                height: 80,
              }}
            >
              <IconButton size="small" sx={{ bgcolor: 'grey.100' }}>
                {insight.icon}
              </IconButton>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  {insight.title}
                </Typography>
                <Typography variant="h6">
                  {insight.value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardStats;