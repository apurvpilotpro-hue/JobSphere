import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Paper,
  Theme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { JobApplication } from '../../contexts/JobApplicationsContext';

const styles = {
  card: {
    height: '100%',
  },
  grid: {
    display: 'grid',
    gap: 3,
    gridTemplateColumns: {
      xs: '1fr',
      md: '1fr 1fr'
    }
  },
  gridItem: {
    display: 'grid',
    gap: 2,
    gridTemplateColumns: {
      xs: '1fr',
      sm: '1fr 1fr'
    }
  }
} as const;

interface ApplicationDetailsProps {
  application: JobApplication;
}

export const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({ application }) => {
  const formatSalary = (min: number, max: number, currency: string, period: string) => {
    return `${currency} ${min}-${max} ${period}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'success';
      case 'Rejected':
        return 'error';
      case 'Interview':
        return 'primary';
      case 'Under Review':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, m: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" gutterBottom>
              {application.jobTitle} at {application.company}
            </Typography>
            <Chip
              label={application.status}
              color={getStatusColor(application.status)}
              variant="outlined"
            />
          </Box>
          <Divider sx={{ my: 2 }} />
        </Box>

        <Box sx={styles.grid}>
          <Card variant="outlined" sx={styles.card}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Job Details
              </Typography>
              <Box sx={styles.gridItem}>
                <Box>
                  <Typography color="textSecondary">Seniority</Typography>
                  <Typography variant="body1">{application.seniority}</Typography>
                </Box>
                <Box>
                  <Typography color="textSecondary">Job Type</Typography>
                  <Typography variant="body1">{application.jobType}</Typography>
                </Box>
                <Box>
                  <Typography color="textSecondary">Work Mode</Typography>
                  <Typography variant="body1">{application.workMode}</Typography>
                </Box>
                <Box>
                  <Typography color="textSecondary">Industry</Typography>
                  <Typography variant="body1">{application.industry}</Typography>
                </Box>
                <Box sx={{ gridColumn: '1 / -1' }}>
                  <Typography color="textSecondary">Salary Range</Typography>
                  <Typography variant="body1">
                    {formatSalary(
                      application.salaryMin,
                      application.salaryMax,
                      application.salaryCurrency,
                      application.salaryPeriod
                    )}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={styles.card}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Application Status
              </Typography>
              <Box sx={styles.gridItem}>
                <Box>
                  <Typography color="textSecondary">Applied Date</Typography>
                  <Typography variant="body1">{application.appliedDate}</Typography>
                </Box>
                <Box>
                  <Typography color="textSecondary">Response Date</Typography>
                  <Typography variant="body1">{application.respondedDate || 'Pending'}</Typography>
                </Box>
                <Box>
                  <Typography color="textSecondary">Final Outcome</Typography>
                  <Typography variant="body1">{application.finalOutcome}</Typography>
                </Box>
                {application.rejectionReason !== "-" && (
                  <Box>
                    <Typography color="textSecondary">Rejection Reason</Typography>
                    <Typography variant="body1">{application.rejectionReason}</Typography>
                  </Box>
                )}
                {application.offerReceivedDate && (
                  <Box>
                    <Typography color="textSecondary">Offer Received</Typography>
                    <Typography variant="body1">{application.offerReceivedDate}</Typography>
                  </Box>
                )}
                {application.hiredSalary && (
                  <Box>
                    <Typography color="textSecondary">Hired Salary</Typography>
                    <Typography variant="body1">
                      {application.salaryCurrency} {application.hiredSalary} {application.salaryPeriod}
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Card variant="outlined" sx={styles.card}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Required Skills & Tech Stack
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography color="textSecondary">Required Skills</Typography>
                <Box sx={{ mt: 1 }}>
                  {application.requiredSkills.split(',').map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill.trim()}
                      variant="outlined"
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography color="textSecondary">Tech Stack</Typography>
                <Box sx={{ mt: 1 }}>
                  {application.listedTechStack.split(',').map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech.trim()}
                      variant="outlined"
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={styles.card}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Location & Source
            </Typography>
            <Box sx={{ ...styles.gridItem, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' } }}>
              <Box>
                <Typography color="textSecondary">City</Typography>
                <Typography variant="body1">{application.locationCity}</Typography>
              </Box>
              <Box>
                <Typography color="textSecondary">Country</Typography>
                <Typography variant="body1">{application.locationCountry}</Typography>
              </Box>
              <Box>
                <Typography color="textSecondary">Source Platform</Typography>
                <Typography variant="body1">{application.sourcePlatform}</Typography>
              </Box>
              <Box>
                <Typography color="textSecondary">Experience Required</Typography>
                <Typography variant="body1">{application.yearsExperienceRequired} years</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Paper>
  );
};