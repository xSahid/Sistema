import React from 'react';
import { useAppContext } from '../context/AppContext';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useAppContext();

  return (
    <button 
      className="dark-mode-toggle-fixed"
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
    >
      <div className="toggle-icon">
        {isDarkMode ? '☀️' : '🌙'}
      </div>
      <div className="toggle-switch">
        <div className={`toggle-knob ${isDarkMode ? 'active' : ''}`}></div>
      </div>
    </button>
  );
};

export default DarkModeToggle; 