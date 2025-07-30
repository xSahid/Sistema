import React, { useEffect, useState } from 'react';

interface CustomAlertProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

const CustomAlert: React.FC<CustomAlertProps> = ({ isOpen, onClose, title, message, type }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsVisible(true);
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = 'unset';
      }, 300); // Tiempo de la animación de salida
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'error':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'warning':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'info':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'var(--success-bg, #f0fdf4)',
          border: 'var(--success-border, #bbf7d0)',
          icon: 'var(--success-icon, #16a34a)',
          text: 'var(--success-text, #166534)',
          title: 'var(--success-title, #15803d)'
        };
      case 'error':
        return {
          bg: 'var(--error-bg, #fef2f2)',
          border: 'var(--error-border, #fecaca)',
          icon: 'var(--error-icon, #dc2626)',
          text: 'var(--error-text, #991b1b)',
          title: 'var(--error-title, #b91c1c)'
        };
      case 'warning':
        return {
          bg: 'var(--warning-bg, #fffbeb)',
          border: 'var(--warning-border, #fed7aa)',
          icon: 'var(--warning-icon, #d97706)',
          text: 'var(--warning-text, #92400e)',
          title: 'var(--warning-title, #b45309)'
        };
      case 'info':
        return {
          bg: 'var(--info-bg, #eff6ff)',
          border: 'var(--info-border, #bfdbfe)',
          icon: 'var(--info-icon, #2563eb)',
          text: 'var(--info-text, #1e40af)',
          title: 'var(--info-title, #1d4ed8)'
        };
      default:
        return {
          bg: 'var(--bg-primary)',
          border: 'var(--card-border)',
          icon: 'var(--text-primary)',
          text: 'var(--text-primary)',
          title: 'var(--text-primary)'
        };
    }
  };

  const colors = getColors();

  return (
    <div 
      className="custom-alert-overlay" 
      onClick={onClose}
      style={{
        animation: isAnimating ? 'fadeIn 0.3s ease-out' : 'slideOutDown 0.3s ease-in'
      }}
    >
      <div 
        className="custom-alert-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
          animation: isAnimating ? 'slideInUp 0.4s ease-out' : 'slideOutDown 0.3s ease-in'
        }}
      >
        <div 
          className="custom-alert-header"
          style={{
            animation: isAnimating ? 'slideInFromBottom 0.5s ease-out 0.1s both' : 'none'
          }}
        >
          <div 
            className="custom-alert-icon"
            style={{ 
              color: colors.icon,
              animation: isAnimating ? 'bounceIn 0.6s ease-out 0.2s both' : 'none'
            }}
          >
            {getIcon()}
          </div>
          <button 
            className="custom-alert-close"
            onClick={onClose}
            aria-label="Cerrar alerta"
            style={{
              animation: isAnimating ? 'slideInFromBottom 0.5s ease-out 0.3s both' : 'none'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div 
          className="custom-alert-content"
          style={{
            animation: isAnimating ? 'slideInFromBottom 0.5s ease-out 0.2s both' : 'none'
          }}
        >
          <h3 
            className="custom-alert-title"
            style={{ 
              color: colors.title,
              animation: isAnimating ? 'fadeInUp 0.6s ease-out 0.3s both' : 'none'
            }}
          >
            {title}
          </h3>
          <p 
            className="custom-alert-message"
            style={{ 
              color: colors.text,
              animation: isAnimating ? 'fadeInUp 0.6s ease-out 0.4s both' : 'none'
            }}
          >
            {message}
          </p>
        </div>
        
        <div 
          className="custom-alert-footer"
          style={{
            animation: isAnimating ? 'slideInFromBottom 0.5s ease-out 0.3s both' : 'none'
          }}
        >
          <button 
            className="custom-alert-button"
            onClick={onClose}
            style={{
              backgroundColor: colors.icon,
              color: colors.bg,
              animation: isAnimating ? 'bounceIn 0.6s ease-out 0.5s both' : 'none'
            }}
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert; 