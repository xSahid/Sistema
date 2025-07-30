import React from 'react';

const ProviderDashboard: React.FC = () => {
  return (
    <div className="container">
      <section className="hero">
        <h1 className="hero-title">Dashboard de Proveedor</h1>
        <p className="hero-subtitle">
          Gestiona tus cotizaciones, facturas y pagos desde un solo lugar
        </p>
        
        <div className="cards-grid">
          <div className="card">
            <div className="card-icon blue">
              📊
            </div>
            <h3 className="card-title">Resumen General</h3>
            <p className="card-description">
              Cotizaciones pendientes: 3<br />
              Facturas por cobrar: $45,000<br />
              Pagos recibidos: $12,500
            </p>
          </div>
          
          <div className="card">
            <div className="card-icon green">
              📝
            </div>
            <h3 className="card-title">Cotizaciones</h3>
            <p className="card-description">
              Solicitudes activas: 5<br />
              Enviadas este mes: 12<br />
              Tasa de aprobación: 75%
            </p>
          </div>
          
          <div className="card">
            <div className="card-icon purple">
              💰
            </div>
            <h3 className="card-title">Facturación</h3>
            <p className="card-description">
              Facturas pendientes: 8<br />
              Monto total: $67,800<br />
              Días promedio de cobro: 45
            </p>
          </div>
          
          <div className="card">
            <div className="card-icon yellow">
              📋
            </div>
            <h3 className="card-title">Documentos</h3>
            <p className="card-description">
              Certificaciones vigentes: 4<br />
              Documentos por renovar: 2<br />
              Última actualización: 15 días
            </p>
          </div>
        </div>
        
        <div className="features">
          <h2 className="features-title">Acciones Rápidas</h2>
          <div className="features-grid">
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon blue">📤</span>
                Enviar Cotización
              </h3>
              <p style={{ color: 'white', marginBottom: '1rem' }}>
                Responde a solicitudes de cotización pendientes
              </p>
              <button className="btn btn-primary">Ver Solicitudes</button>
            </div>
            
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon purple">📄</span>
                Cargar Factura
              </h3>
              <p style={{ color: 'white', marginBottom: '1rem' }}>
                Sube facturas para órdenes de compra aprobadas
              </p>
              <button className="btn btn-primary">Cargar Factura</button>
            </div>
            
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon green">💳</span>
                Complementos PPD
              </h3>
              <p style={{ color: 'white', marginBottom: '1rem' }}>
                Gestiona complementos de pago recibidos
              </p>
              <button className="btn btn-primary">Ver Pagos</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProviderDashboard; 