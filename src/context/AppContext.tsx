import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'provider' | 'purchases' | 'finance' | 'admin';
}

interface AppContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  changeRole: (role: 'admin' | 'provider' | 'purchases' | 'finance') => void;
  isAuthenticated: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Usuario de prueba para desarrollo
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Usuario de Prueba',
    email: 'test@example.com',
    role: 'admin' // Puedes cambiar a 'purchases', 'finance', o 'provider'
  });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true; // Force dark mode by default
  });

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const changeRole = (role: 'admin' | 'provider' | 'purchases' | 'finance') => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  const isAuthenticated = !!user;

  const value: AppContextType = {
    user,
    login,
    logout,
    changeRole,
    isAuthenticated,
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 