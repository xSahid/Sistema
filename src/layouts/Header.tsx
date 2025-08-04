import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import iniciarSesionImg from '../assets/Img/iniciarsesion.png';
import cerrarSesionImg from '../assets/Img/CerrarSesion.png';
import NotificationSystem from '../components/NotificationSystem';
import LogoutConfirmDialog from '../components/LogoutConfirmDialog';

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  const { user, logout, isDarkMode, toggleDarkMode } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
              onClick={() => { setShowLogoutConfirm(true); closeMenu(); }}
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
            <Link to="/dashboard" className="login-image-btn" onClick={closeMenu}>
              <img 
                src={iniciarSesionImg} 
                alt="Iniciar Sesión" 
                className={`login-image ${isDarkMode ? 'dark-mode' : ''}`}
              />
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
              onClick={() => { setShowLogoutConfirm(true); closeMenu(); }}
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
            <Link to="/dashboard" className="login-image-btn" onClick={closeMenu}>
              <img 
                src={iniciarSesionImg} 
                alt="Iniciar Sesión" 
                className={`login-image ${isDarkMode ? 'dark-mode' : ''}`}
              />
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

      {/* Logout Confirm Dialog */}
      <LogoutConfirmDialog
        open={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={() => {
          logout();
          setShowLogoutConfirm(false);
          closeMenu();
        }}
      />
    </header>
  );
};

export default Header; 