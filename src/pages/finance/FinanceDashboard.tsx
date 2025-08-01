import React from 'react';

const FinanceDashboard: React.FC = () => {
  return (
    <div className="container">
      <section className="hero">
        <h1 className="hero-title">Dashboard de Finanzas</h1>
        <p className="hero-subtitle">
          Gestiona pagos, facturas y complementos PPD
        </p>
        
        <div className="features">
          <h2 className="features-title">Acciones Rápidas</h2>
          <div className="features-grid">
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon blue">📄</span>
                Gestión de Facturas
              </h3>
              <p style={{ color: 'white', marginBottom: '1rem' }}>
                Registra, valida y gestiona facturas de proveedores
              </p>
              <a href="/finance/invoices" className="btn btn-primary">Gestionar Facturas</a>
            </div>
            
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon purple">💰</span>
                Programar Pagos
              </h3>
              <p style={{ color: 'white', marginBottom: '1rem' }}>
                Crea planes de pago para facturas aprobadas
              </p>
              <button className="btn btn-primary">Programar Pago</button>
            </div>
            
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon green">📋</span>
                Complementos PPD
              </h3>
              <p style={{ color: 'white', marginBottom: '1rem' }}>
                Gestiona complementos de pago
              </p>
              <a href="/finance/ppd-complements" className="btn btn-primary">Ver Complementos</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinanceDashboard; 