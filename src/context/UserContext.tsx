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
  const [userId, setUserId] = useState<number | null>(() => {
    // Try to get userId from localStorage on initial load
    const stored = localStorage.getItem('userId');
    return stored ? parseInt(stored, 10) : null;
  });

  // Update localStorage when userId changes
  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId.toString());
    } else {
      localStorage.removeItem('userId');
    }
  }, [userId]);

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