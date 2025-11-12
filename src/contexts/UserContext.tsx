import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  userId: number | null;
  setUserId: (id: number | null) => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  setUserId: () => {},
  isAuthenticated: false,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always start with no authentication
  const [userId, setUserId] = useState<number | null>(null);

  // Clear any stored authentication on page load/refresh
  useEffect(() => {
    localStorage.removeItem('userId');
  }, []);

  const value = {
    userId,
    setUserId,
    isAuthenticated: userId !== null,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};