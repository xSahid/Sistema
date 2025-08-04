import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user, isAuthenticated } = useAppContext();

  // Para desarrollo, permitir acceso siempre
  return <>{children}</>;
};

export default PublicRoute; 