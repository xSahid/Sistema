import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import cerrarSesionImg from '../assets/Img/CerrarSesion.png';
import NotificationSystem from '../components/NotificationSystem';
import CustomAlert from '../components/CustomAlert';

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  const { user, logout, isDarkMode, toggleDarkMode } = useAppContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    setShowLogoutAlert(true);
  };

  const confirmLogout = () => {
    logout();
    closeMenu();
    setShowLogoutAlert(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Sidebar toggle button */}
        <button 
          className="sidebar-toggle-btn"
          onClick={onSidebarToggle}
          aria-label="Abrir navegación"
        >
          <span className="sidebar-toggle-icon">☰</span>
        </button>

        <Link to="/" className="logo">
          SIP - Sistema Integral de Proveedores
        </Link>
        
        {/* User Info Section */}
        {user && (
          <div className="user-info-section">
            <div className="user-avatar">
              <span className="user-avatar-text">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role === 'admin' ? 'Administrador' : 
                user.role === 'provider' ? 'Proveedor' : 
                user.role === 'purchases' ? 'Compras' : 
                user.role === 'finance' ? 'Finanzas' : user.role}</span>
            </div>
          </div>
        )}
        
        {/* Mobile menu button */}
        <button 
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
        
        {/* Desktop navigation - Simplified */}
        <nav className="nav desktop-nav">
          {user && (
            <button 
              onClick={() => setShowNotifications(true)}
              className="notification-btn"
              title="Notificaciones"
            >
              <span className="notification-icon">🔔</span>
              <span className="notification-badge">3</span>
            </button>
          )}
          
          {user ? (
            <button 
              onClick={handleLogout}
              className="logout-image-btn"
              title="Cerrar Sesión"
            >
              <img 
                src={cerrarSesionImg} 
                alt="Cerrar Sesión" 
                className={`logout-image ${isDarkMode ? 'dark-mode' : ''}`}
              />
            </button>
          ) : (
            <Link to="/login" className="login-icon-btn" onClick={closeMenu}>
              <svg 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  color: isDarkMode ? '#60a5fa' : '#6366f1',
                  transition: 'all 0.2s ease',
                }}
                className="login-svg"
              >
                {/* Círculo de la cabeza */}
                <circle 
                  cx="12" 
                  cy="8" 
                  r="4" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none"
                />
                {/* Cuerpo */}
                <path 
                  d="M20 21c0-4.418-3.582-8-8-8s-8 3.582-8 8" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
          
          {/* Dark mode toggle button */}
          <button 
            className="dark-mode-toggle-header"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            <div className="toggle-icon">
              {isDarkMode ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <div className="toggle-switch">
              <div className={`toggle-knob ${isDarkMode ? 'active' : ''}`}></div>
            </div>
          </button>
        </nav>
        
        {/* Mobile navigation - Simplified */}
        <nav className={`nav mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          {user && (
            <button 
              onClick={() => { setShowNotifications(true); closeMenu(); }}
              className="notification-btn"
              title="Notificaciones"
            >
              <span className="notification-icon">🔔</span>
              <span className="notification-badge">3</span>
            </button>
          )}
          
          {user ? (
            <button 
              onClick={handleLogout}
              className="logout-image-btn"
              title="Cerrar Sesión"
            >
              <img 
                src={cerrarSesionImg} 
                alt="Cerrar Sesión" 
                className={`logout-image ${isDarkMode ? 'dark-mode' : ''}`}
              />
            </button>
          ) : (
            <Link to="/login" className="login-icon-btn" onClick={closeMenu}>
              <svg 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  color: isDarkMode ? '#60a5fa' : '#6366f1',
                  transition: 'all 0.2s ease',
                }}
                className="login-svg"
              >
                {/* Círculo de la cabeza */}
                <circle 
                  cx="12" 
                  cy="8" 
                  r="4" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none"
                />
                {/* Cuerpo */}
                <path 
                  d="M20 21c0-4.418-3.582-8-8-8s-8 3.582-8 8" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
          
          {/* Dark mode toggle button for mobile */}
          <button 
            className="dark-mode-toggle-header mobile-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            <div className="toggle-icon">
              {isDarkMode ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <div className="toggle-switch">
              <div className={`toggle-knob ${isDarkMode ? 'active' : ''}`}></div>
            </div>
          </button>
        </nav>
      </div>

      {/* Notification System */}
      <NotificationSystem 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      {/* Logout Alert */}
      <CustomAlert
        isOpen={showLogoutAlert}
        onClose={() => setShowLogoutAlert(false)}
        title="Cerrar Sesión"
        message="¿Estás seguro de que quieres cerrar sesión? Serás redirigido a la página de inicio."
        type="warning"
        onConfirm={confirmLogout}
        confirmText="Sí, Cerrar Sesión"
      />
    </header>
  );
};

export default Header; 