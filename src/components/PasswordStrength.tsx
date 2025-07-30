import React from 'react';

interface PasswordStrengthProps {
  strength: 'weak' | 'medium' | 'strong' | '';
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ strength }) => {
  if (!strength) return null;

  const getStrengthText = () => {
    switch (strength) {
      case 'weak':
        return 'Débil';
      case 'medium':
        return 'Media';
      case 'strong':
        return 'Fuerte';
      default:
        return '';
    }
  };

  const getStrengthColor = () => {
    switch (strength) {
      case 'weak':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'strong':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getStrengthWidth = () => {
    switch (strength) {
      case 'weak':
        return '33%';
      case 'medium':
        return '66%';
      case 'strong':
        return '100%';
      default:
        return '0%';
    }
  };

  return (
    <div className="password-strength-container">
      <div className="password-strength-bar">
        <div 
          className="password-strength-fill"
          style={{ 
            width: getStrengthWidth(),
            backgroundColor: getStrengthColor()
          }}
        />
      </div>
      <span 
        className="password-strength-text"
        style={{ color: getStrengthColor() }}
      >
        {getStrengthText()}
      </span>
    </div>
  );
};

export default PasswordStrength; 