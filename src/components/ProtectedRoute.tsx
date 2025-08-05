import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'provider' | 'purchases' | 'finance')[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [], 
  redirectTo = '/login'
}) => {
  const { isAuthenticated, user } = useAppContext();
  const location = useLocation();

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Si no hay roles permitidos, permitir acceso a cualquier usuario autenticado
  if (allowedRoles.length === 0) {
    return <>{children}</>;
  }

  // Verificar si el usuario tiene uno de los roles permitidos
  if (user && allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }

  // Si no tiene permisos, redirigir al dashboard o mostrar error
  return <Navigate to="/dashboard" replace />;
};

export default ProtectedRoute; 