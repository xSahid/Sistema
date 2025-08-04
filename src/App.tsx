import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import router from './routes/AppRoutes';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/index.css';

const AppContent: React.FC = () => {
  const { isDarkMode } = useAppContext();
  
  // Apply theme to HTML element
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return <RouterProvider router={router} />;
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App; 