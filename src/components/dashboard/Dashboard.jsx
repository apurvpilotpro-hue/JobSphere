import React, { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import DashboardStats from './DashboardStats';
import ApplicationsList from './ApplicationsList';
import ApplicationDetails from './ApplicationDetails';
import { SkillsAnalysis } from './SkillsAnalysis';
import { JobRecommendations } from './JobRecommendations';
import { useApplications } from '../../contexts/ApplicationsContext';
import { useUser } from '../../contexts/UserContext';
import { mlService } from '../../services/mlService';

const Dashboard = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { applications } = useApplications();
  const { userId } = useUser();

  const processedApplications = applications.map(app => ({
    ...app,
    skills: app.description?.match(/\b(?:React|TypeScript|JavaScript|Python|Java|Node\.js|SQL|HTML|CSS|Angular|Vue\.js|Express|MongoDB|AWS|Docker|Git)\b/g) || []
  }));

  // Update ML model with user's skills whenever applications change
  useEffect(() => {
    if (userId && processedApplications.length > 0) {
      const allSkills = [...new Set(processedApplications.flatMap(app => app.skills))];
      mlService.updateUserProfile(userId, allSkills).catch(console.error);
    }
  }, [userId, processedApplications]);

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', pt: 4 }}>
      <Container maxWidth="lg">
        <DashboardStats />
        <JobRecommendations />
        <SkillsAnalysis applications={processedApplications} />
        <ApplicationsList />
        <ApplicationDetails 
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
        />
      </Container>
    </Box>
  );
};

export default Dashboard;