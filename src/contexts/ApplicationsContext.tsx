import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { JobApplication } from '../types/jobApplication';
import { api } from '../services/api';
import { useUser } from './UserContext';

interface ApplicationsContextType {
  applications: JobApplication[];
  loading: boolean;
  error: string | null;
  selectedApplication: JobApplication | null;
  setSelectedApplication: (application: JobApplication | null) => void;
  refreshApplications: () => Promise<void>;
}

const ApplicationsContext = createContext<ApplicationsContextType>({
  applications: [],
  loading: false,
  error: null,
  selectedApplication: null,
  setSelectedApplication: () => {},
  refreshApplications: async () => {},
});

export const ApplicationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const { userId, isAuthenticated } = useUser();

  const fetchApplications = useCallback(async () => {
    if (!userId || !isAuthenticated) {
      console.log('Not fetching applications - user not authenticated', { userId, isAuthenticated });
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching applications for user:', userId);
      const data = await api.getApplications(userId);
      console.log('Received applications:', data);
      setApplications(data);
    } catch (err) {
      setError('Failed to fetch applications');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  }, [userId, isAuthenticated]);

  // Fetch applications when userId changes
  useEffect(() => {
    if (userId) {
      fetchApplications();
    }
  }, [userId, fetchApplications]);

  const value = {
    applications,
    loading,
    error,
    selectedApplication,
    setSelectedApplication,
    refreshApplications: fetchApplications,
  };

  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationsContext);
  if (context === undefined) {
    throw new Error('useApplications must be used within an ApplicationsProvider');
  }
  return context;
};