import React from 'react';

const FinanceDashboard: React.FC = () => {
  return (
    <div className="container">
      <section className="hero">
        <h1 className="hero-title">Dashboard de Finanzas</h1>
        <p className="hero-subtitle">
          Gestiona facturas, pagos y complementos PPD
        </p>
        
        <div className="cards-grid">
          <div className="card">
            <div className="card-icon blue">
              📊
            </div>
            <h3 className="card-title">Resumen General</h3>
            <p className="card-description">
              Facturas pendientes: 23<br />
              Monto por pagar: $156,800<br />
              Pagos programados: $89,400
            </p>
          </div>
          
          <div className="card">
            <div className="card-icon green">
              📄
            </div>
            <h3 className="card-title">Facturación</h3>
            <p className="card-description">
              Por validar: 8<br />
              Aprobadas este mes: 45<br />
              Rechazadas: 3
            </p>
          </div>
          
          <div className="card">
            <div className="card-icon purple">
              💰
            </div>
            <h3 className="card-title">Pagos</h3>
            <p className="card-description">
              Programados: 12<br />
              Realizados este mes: 38<br />
              Días promedio: 30
            </p>
          </div>
          
          <div className="card">
            <div className="card-icon yellow">
              📋
            </div>
            <h3 className="card-title">Complementos PPD</h3>
            <p className="card-description">
              Pendientes: 5<br />
              Generados este mes: 42<br />
              Cumplimiento: 95%
            </p>
          </div>
        </div>
        
        <div className="features">
          <h2 className="features-title">Acciones Rápidas</h2>
          <div className="features-grid">
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon blue">📄</span>
                Validar Facturas
              </h3>
              <p style={{ color: 'white', marginBottom: '1rem' }}>
                Revisa y aprueba facturas pendientes
              </p>
              <button className="btn btn-primary">Ver Facturas</button>
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
              <button className="btn btn-primary">Ver Complementos</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinanceDashboard; 