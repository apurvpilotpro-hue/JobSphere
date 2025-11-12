import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Paper,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { 
  Timeline,
  Assessment,
  TrendingUp,
  WorkOutline,
  Speed,
  BarChart,
  PersonSearch,
  DataUsage
} from '@mui/icons-material';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
  color: 'white',
  padding: theme.spacing(15, 0),
  textAlign: 'center',
  minHeight: '70vh',
  display: 'flex',
  alignItems: 'center'
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  height: '100%',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}));

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Track Your Job Search Journey
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 6 }}>
            Organize, analyze, and optimize your job applications in one place
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            onClick={() => navigate('/dashboard')}
            sx={{ 
              fontSize: '1.2rem', 
              padding: '12px 30px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 8px rgba(0,0,0,0.2)',
              }
            }}
          >
            Get Started
          </Button>
        </Container>
      </HeroSection>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard elevation={3}>
              <Timeline sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Track Progress
              </Typography>
              <Typography color="text.secondary">
                Monitor your applications from submission to offer
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard elevation={3}>
              <Assessment sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Analytics
              </Typography>
              <Typography color="text.secondary">
                Get insights into your application success rate
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard elevation={3}>
              <TrendingUp sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Trends
              </Typography>
              <Typography color="text.secondary">
                Visualize your job search patterns and outcomes
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard elevation={3}>
              <WorkOutline sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Job Matching
              </Typography>
              <Typography color="text.secondary">
                Find the best opportunities that match your skills
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                Ready to Organize Your Job Search?
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph>
                Join thousands of job seekers who are efficiently managing their job applications
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={() => navigate('/dashboard')}
                sx={{ mt: 2 }}
              >
                Get Started Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                bgcolor: 'background.paper', 
                p: 3, 
                borderRadius: 2,
                boxShadow: 3
              }}>
                <Typography variant="h6" gutterBottom>
                  Key Benefits:
                </Typography>
                <Typography paragraph>
                  • Centralized application tracking<br />
                  • Real-time status updates<br />
                  • Data-driven insights<br />
                  • Professional networking tools
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;