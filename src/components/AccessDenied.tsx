import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const AccessDenied: React.FC = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const getDashboardPath = (role: string) => {
    switch (role) {
      case 'admin':
        return '/admin/dashboard';
      case 'provider':
        return '/providers/dashboard';
      case 'purchases':
        return '/purchases/dashboard';
      case 'finance':
        return '/finance/dashboard';
      default:
        return '/login';
    }
  };

  const handleGoToDashboard = () => {
    const dashboardPath = user ? getDashboardPath(user.role) : '/login';
    navigate(dashboardPath);
  };

  return (
    <div className="access-denied-container">
      <div className="access-denied-card">
        <div className="access-denied-icon">🚫</div>
        <h1 className="access-denied-title">Acceso Denegado</h1>
        <p className="access-denied-message">
          No tienes permisos para acceder a esta página.
        </p>
        <p className="access-denied-submessage">
          Has sido redirigido a tu área correspondiente.
        </p>
        <button 
          onClick={handleGoToDashboard}
          className="access-denied-btn"
        >
          Ir a mi Dashboard
        </button>
      </div>
    </div>
  );
};

export default AccessDenied; 