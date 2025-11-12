import React from 'react';
import { Paper, List, ListItem, ListItemText, Typography } from '@mui/material';

const ApplicationsList = () => {
  // This would come from props or context in a real application
  const recentApplications = [
    {
      id: 5988,
      company: "PhonePe Digital",
      jobTitle: "DevOps Engineer",
      status: "Rejected"
    },
    {
      id: 384,
      company: "Cognizant Systems",
      jobTitle: "Data Analyst",
      status: "Accepted"
    },
    // Add more recent applications as needed
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Recent Applications
      </Typography>
      <List>
        {recentApplications.map((app) => (
          <ListItem key={app.id}>
            <ListItemText
              primary={`${app.company} - ${app.jobTitle}`}
              secondary={`Status: ${app.status}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ApplicationsList;