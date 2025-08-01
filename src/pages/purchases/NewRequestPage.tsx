import React from 'react';
import { Link } from 'react-router-dom';
import RFQCreationForm from '../../components/RFQCreationForm';

const NewRequestPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="management-page">
        <div className="management-page-header">
          <div className="flex items-center justify-center mb-4">
            <div className="feature-icon">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="hero-title">Nueva Solicitud de Cotización</h1>
          <p className="hero-subtitle">
            Crea una nueva solicitud de cotización para obtener las mejores ofertas de los proveedores
          </p>
        </div>
        
        <div className="enhanced-form">
          <div className="flex items-center gap-3 mb-6">
            <div className="feature-icon">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="hero-title">Formulario de Solicitud</h2>
          </div>
          <RFQCreationForm />
        </div>
      </div>
    </div>
  );
};

export default NewRequestPage; 