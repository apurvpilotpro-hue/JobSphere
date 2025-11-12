import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';

const SignupPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center">
            Sign Up Page Coming Soon
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignupPage;