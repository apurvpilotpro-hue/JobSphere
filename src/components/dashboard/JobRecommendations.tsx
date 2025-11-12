import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Grid as MuiGrid,
  CircularProgress,
  Button,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  Whatshot,
  ThumbUp,
  ThumbDown,
  OpenInNew,
} from '@mui/icons-material';
import { useUser } from '../../contexts/UserContext';
import { mlService, JobRecommendation } from '../../services/mlService';

const Grid = MuiGrid as any; // Temporary type assertion for MUI v7

export const JobRecommendations: React.FC = () => {
  const { userId } = useUser();
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await mlService.getJobRecommendations(userId);
        setRecommendations(data);
      } catch (err) {
        setError('Failed to fetch job recommendations. Please try again later.');
        console.error('Error fetching recommendations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
    // Refresh recommendations every 30 minutes
    const interval = setInterval(fetchRecommendations, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [userId]);

  const handleFeedback = async (jobId: string, interested: boolean) => {
    if (!userId) return;
    
    try {
      await mlService.provideFeedback(userId, jobId, interested);
      // Remove the job from recommendations after feedback
      setRecommendations(prev => prev.filter(job => job.jobId !== jobId));
    } catch (err) {
      console.error('Error providing feedback:', err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Paper elevation={2} sx={{ mb: 3 }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          variant="h5"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Whatshot sx={{ color: 'warning.main' }} />
          AI-Powered Job Recommendations
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Personalized job matches based on your skills and preferences
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {recommendations.map((job) => (
            <Grid item xs={12} key={job.jobId}>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6" component="h3">
                    {job.title}
                  </Typography>
                  <Chip
                    label={`${Math.round(job.matchScore * 100)}% Match`}
                    color="success"
                    size="small"
                    icon={<Whatshot />}
                  />
                </Box>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {job.company}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {job.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {job.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Tooltip title="Interested">
                      <IconButton
                        color="success"
                        onClick={() => handleFeedback(job.jobId, true)}
                      >
                        <ThumbUp />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Not Interested">
                      <IconButton
                        color="error"
                        onClick={() => handleFeedback(job.jobId, false)}
                      >
                        <ThumbDown />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  {job.applicationLink && (
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<OpenInNew />}
                      href={job.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply Now
                    </Button>
                  )}
                </Box>
              </Paper>
            </Grid>
          ))}
          {recommendations.length === 0 && (
            <Grid item xs={12}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: 'center', py: 4 }}
              >
                No recommendations available at the moment. We'll notify you when new matches arrive!
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  );
};