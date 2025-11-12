import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const { setUserId } = useUser();
  const navigate = useNavigate();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsEmailEntered(true);
      setError('');
    } else {
      setError('Please enter a valid email address');
    }
  };

  const handleGoogleAuth = async () => {
    try {
      // In a real implementation, this would open Google OAuth flow
      // For now, we'll simulate it with a direct API call
      const response = await api.getUserByEmail(email);
      
      if (response.user_id) {
        setUserId(response.user_id);
        navigate('/dashboard');
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      if (err.response?.status === 404) {
        setError('Email not found. Please try again.');
      } else {
        setError('Authentication failed. Please try again.');
      }
      setIsEmailEntered(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          textAlign: 'center'
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Sign in to access your job application analytics
        </Typography>

        {!isEmailEntered ? (
          <form onSubmit={handleEmailSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
              helperText={error}
              required
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Continue
            </Button>
          </form>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Click below to authenticate with Google for:
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, color: 'primary.main' }}>
              {email}
            </Typography>
            <Button
              fullWidth
              variant="contained"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleAuth}
              sx={{
                bgcolor: '#4285F4',
                color: 'white',
                '&:hover': {
                  bgcolor: '#3367D6',
                },
              }}
            >
              Continue with Google
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => setIsEmailEntered(false)}
              sx={{ mt: 2 }}
            >
              Use a different email
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};