import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { JobApplication } from '../../types/jobApplication';

interface ApplicationsListModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  applications: JobApplication[];
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'accepted':
      return 'success';
    case 'rejected':
      return 'error';
    case 'interview':
      return 'primary';
    case 'under review':
      return 'warning';
    default:
      return 'default';
  }
};

const ApplicationsListModal: React.FC<ApplicationsListModalProps> = ({
  open,
  onClose,
  title,
  applications
}) => {
  // Sort applications by date in descending order
  const sortedApplications = [...applications].sort(
    (a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Applied Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Salary Range</TableCell>
                <TableCell>Final Outcome</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedApplications.map((app) => (
                <TableRow key={app.applicationId} hover>
                  <TableCell>{app.company}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">{app.jobTitle}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {app.seniority} · {app.jobType}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{new Date(app.appliedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={app.status}
                      color={getStatusColor(app.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{app.locationCity}, {app.locationCountry}</TableCell>
                  <TableCell>
                    {app.salaryCurrency} {app.salaryMin}-{app.salaryMax} {app.salaryPeriod}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={app.finalOutcome}
                      color={getStatusColor(app.finalOutcome)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationsListModal;