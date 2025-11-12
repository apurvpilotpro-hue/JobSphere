import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { ApplicationsProvider } from './contexts/ApplicationsContext';
import { Login } from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import LandingPage from './components/landing/LandingPage';

function App() {
  return (
    <Router>
      <UserProvider>
        <ApplicationsProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<LandingPage />} />
            {/* Catch all route to redirect to landing page */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ApplicationsProvider>
      </UserProvider>
    </Router>
  );
}

export default App;