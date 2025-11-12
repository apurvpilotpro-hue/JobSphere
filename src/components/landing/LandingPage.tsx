import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid as MuiGrid,
  Paper,
  useTheme,
  Stack,
  SxProps,
  Theme,
} from '@mui/material';
import {
  Timeline,
  Analytics,
  TrendingUp,
  Speed,
  Assessment,
  Insights
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const Grid = MuiGrid as any; // Temporary type assertion to resolve strict typing issues

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-8px)',
      },
    }}
  >
    <Box
      sx={{
        mb: 2,
        p: 2,
        borderRadius: '50%',
        backgroundColor: 'primary.light',
        color: 'primary.main',
      }}
    >
      {icon}
    </Box>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography color="text.secondary" variant="body2">
      {description}
    </Typography>
  </Paper>
);

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  const features = [
    {
      icon: <Timeline sx={{ fontSize: 40 }} />,
      title: "Track Applications",
      description: "Keep all your job applications organized in one place with detailed tracking"
    },
    {
      icon: <Analytics sx={{ fontSize: 40 }} />,
      title: "Smart Analytics",
      description: "Get insights into your application success rate and patterns"
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: "Progress Monitoring",
      description: "Monitor your progress and track response rates across platforms"
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: "Real-time Updates",
      description: "Stay updated with the status of all your applications in real-time"
    },
    {
      icon: <Assessment sx={{ fontSize: 40 }} />,
      title: "Detailed Reports",
      description: "Generate comprehensive reports about your job search journey"
    },
    {
      icon: <Insights sx={{ fontSize: 40 }} />,
      title: "Career Insights",
      description: "Get valuable insights to improve your job search strategy"
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
          color: 'white',
          pt: 15,
          pb: 15,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ alignItems: 'center' }}>
            <Grid xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                Track Your Job Search Journey
              </Typography>
              <Typography
                variant="h5"
                sx={{ mb: 4, opacity: 0.9 }}
              >
                One platform to manage all your job applications from Naukri, Internshala, and other portals.
              </Typography>
              <Stack direction="row" spacing={2}>
                {!isAuthenticated ? (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={() => navigate('/login')}
                      sx={{ px: 4, py: 1.5 }}
                    >
                      Get Started
                    </Button>
                    <Button
                      variant="outlined"
                      color="inherit"
                      size="large"
                      onClick={() => navigate('/dashboard')}
                      sx={{ px: 4, py: 1.5 }}
                    >
                      View Demo
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => navigate('/dashboard')}
                    sx={{ px: 4, py: 1.5 }}
                  >
                    See Analytics
                  </Button>
                )}
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Box
                component="img"
                src="/analytics-dashboard.svg"
                alt="Analytics Dashboard"
                sx={{
                  width: '100%',
                  maxWidth: 600,
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{ mb: 6 }}
        >
          Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid xs={12} sm={6} md={4} key={index}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          bgcolor: 'grey.100',
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: 'center',
              background: `linear-gradient(45deg, ${theme.palette.primary.light} 30%, ${theme.palette.primary.main} 90%)`,
              color: 'white',
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              Ready to Streamline Your Job Search?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of job seekers who are organizing their job search effectively
            </Typography>
            {!isAuthenticated ? (
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate('/login')}
                sx={{ px: 6, py: 1.5 }}
              >
                Get Started Now
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate('/dashboard')}
                sx={{ px: 6, py: 1.5 }}
              >
                Go to Dashboard
              </Button>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;