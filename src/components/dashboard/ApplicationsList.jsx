import React from 'react';
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton } from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { useApplications } from '../../contexts/ApplicationsContext';

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'accepted':
      return 'success';
    case 'rejected':
      return 'error';
    case 'interview':
      return 'primary';
    case 'applied':
      return 'info';
    default:
      return 'default';
  }
};

const ApplicationsList = () => {
  const { applications, loading, error, setSelectedApplication } = useApplications();

  if (loading) {
    return (
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography>Loading applications...</Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }

  const applicationArray = applications.sort((a, b) => 
    new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
  );

  const handleViewDetails = (applicationId) => {
    const application = applications.find(app => app.applicationId === applicationId);
    if (application) {
      setSelectedApplication(application);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 4 }}>
      <Typography variant="h6" gutterBottom component="div">
        Recent Applications
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Applied Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicationArray.map((application) => (
              <TableRow 
                key={application.applicationId}
                sx={{ '&:hover': { bgcolor: 'action.hover' } }}
              >
                <TableCell>{application.company}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2">{application.jobTitle}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {application.seniority} · {application.jobType}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {new Date(application.appliedDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={application.status}
                    color={getStatusColor(application.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {application.locationCity}, {application.locationCountry}
                </TableCell>
                <TableCell>
                  <IconButton 
                    size="small"
                    onClick={() => handleViewDetails(application.applicationId)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ApplicationsList;