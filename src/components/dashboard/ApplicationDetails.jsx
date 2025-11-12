import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid, Chip, Box, Divider } from '@mui/material';
import { useApplications } from '../../contexts/ApplicationsContext';

const ApplicationDetails = ({ open, onClose }) => {
  const { selectedApplication } = useApplications();
  
  if (!selectedApplication) {
    return null;
  }

  const application = selectedApplication;

  const DetailRow = ({ label, value }) => (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={4} component="div">
        <Typography color="textSecondary">{label}</Typography>
      </Grid>
      <Grid item xs={8} component="div">
        <Typography>{value}</Typography>
      </Grid>
    </Grid>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="div">
          {application.jobTitle} at {application.company}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Application ID: {application.applicationId}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>Application Status</Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Chip 
                label={application.status} 
                color={application.status === 'Accepted' ? 'success' : 
                       application.status === 'Rejected' ? 'error' : 'primary'} 
              />
            </Grid>
            <Grid item>
              <Chip label={`Final Outcome: ${application.finalOutcome}`} />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>Job Details</Typography>
        <DetailRow label="Seniority" value={application.seniority} />
        <DetailRow label="Job Type" value={application.jobType} />
        <DetailRow label="Work Mode" value={application.workMode} />
        <DetailRow label="Industry" value={application.industry} />
        <DetailRow label="Location" value={`${application.locationCity}, ${application.locationCountry}`} />
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" gutterBottom>Salary Information</Typography>
        <DetailRow 
          label="Salary Range" 
          value={`${application.salaryCurrency} ${application.salaryMin} - ${application.salaryMax} ${application.salaryPeriod}`} 
        />
        {application.hiredSalary && (
          <DetailRow 
            label="Offered Salary" 
            value={`${application.salaryCurrency} ${application.hiredSalary} ${application.salaryPeriod}`} 
          />
        )}

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>Skills & Requirements</Typography>
        <DetailRow label="Required Skills" value={application.requiredSkills} />
        <DetailRow label="Tech Stack" value={application.listedTechStack} />
        <DetailRow 
          label="Experience Required" 
          value={`${application.yearsExperienceRequired} years`} 
        />

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>Timeline</Typography>
        <DetailRow 
          label="Applied Date" 
          value={new Date(application.appliedDate).toLocaleDateString()} 
        />
        {application.respondedDate && (
          <DetailRow 
            label="Response Date" 
            value={new Date(application.respondedDate).toLocaleDateString()} 
          />
        )}
        {application.offerReceivedDate && (
          <DetailRow 
            label="Offer Date" 
            value={new Date(application.offerReceivedDate).toLocaleDateString()} 
          />
        )}
        
        {application.rejectionReason && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom>Additional Information</Typography>
            <DetailRow label="Rejection Reason" value={application.rejectionReason} />
          </>
        )}

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>Source Information</Typography>
        <DetailRow label="Source Platform" value={application.sourcePlatform} />
        <DetailRow 
          label="Job Posting" 
          value={
            <Button 
              href={application.postingUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              variant="outlined"
              size="small"
            >
              View Original Posting
            </Button>
          } 
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplicationDetails;