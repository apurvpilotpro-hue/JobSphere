import React, { createContext, useContext, useState, useEffect } from 'react';
import { JobApplication } from '../types/jobApplication';
import { api } from '../services/api';
import { useUser } from './UserContext';

interface ApplicationsContextType {
  applications: JobApplication[];
  loading: boolean;
  error: string | null;
  refreshApplications: () => Promise<void>;
}

const ApplicationsContext = createContext<ApplicationsContextType>({
  applications: [],
  loading: false,
  error: null,
  refreshApplications: async () => {},
});

export const ApplicationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userId, isAuthenticated } = useUser();

  const fetchApplications = async () => {
    if (!userId || !isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await api.getApplications(userId);
      setApplications(data);
    } catch (err) {
      setError('Failed to fetch applications');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch applications when userId changes
  useEffect(() => {
    if (userId) {
      fetchApplications();
    }
  }, [userId]);

  const value = {
    applications,
    loading,
    error,
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