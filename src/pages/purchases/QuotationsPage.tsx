import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RFQCreationForm from '../../components/RFQCreationForm';
import QuoteReviewPanel from '../../components/QuoteReviewPanel';

const QuotationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'review'>('create');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="management-page">
        <div className="management-page-header">
          <div className="flex items-center justify-center mb-4">
            <div className="feature-icon">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="hero-title">Gestión de Cotizaciones</h1>
          <p className="hero-subtitle">
            Crea solicitudes de cotización y revisa las respuestas de los proveedores de manera eficiente
          </p>
        </div>
        
        <div className="tab-navigation">
          <ul className="tab-list">
            <li className="tab-item">
              <button
                onClick={() => setActiveTab('create')}
                className={`tab-button ${activeTab === 'create' ? 'active' : ''}`}
              >
                <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Crear Solicitud
              </button>
            </li>
            <li className="tab-item">
              <button
                onClick={() => setActiveTab('review')}
                className={`tab-button ${activeTab === 'review' ? 'active' : ''}`}
              >
                <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Revisar Cotizaciones
              </button>
            </li>
          </ul>
        </div>
        
        <div className="tab-content">
          <div className={`tab-panel ${activeTab === 'create' ? 'active' : ''}`}>
            <div className="enhanced-form">
              <div className="flex items-center gap-3 mb-6">
                <div className="feature-icon">
                  <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="hero-title">Crear Nueva Solicitud de Cotización</h2>
              </div>
              <RFQCreationForm />
            </div>
          </div>
          
          <div className={`tab-panel ${activeTab === 'review' ? 'active' : ''}`}>
            <div className="enhanced-form">
              <div className="flex items-center gap-3 mb-6">
                <div className="feature-icon">
                  <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="hero-title">Revisar Cotizaciones Recibidas</h2>
              </div>
              <QuoteReviewPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationsPage; 