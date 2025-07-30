import React from 'react';

const PurchaseDashboard: React.FC = () => {
  return (
    <div className="container">
      <section className="hero">
        <h1 className="hero-title">Dashboard de Compras</h1>
        <p className="hero-subtitle">
          Gestiona solicitudes de cotización, órdenes de compra y proveedores
        </p>
        
        <div className="cards-grid">
          <div className="card">
            <div className="card-icon blue">
              📊
            </div>
            <h3 className="card-title">Resumen General</h3>
            <p className="card-description">
              Solicitudes activas: 8<br />
              Cotizaciones recibidas: 24<br />
              Órdenes generadas: 15
            </p>
          </div>
          
          <div className="card">
            <div className="card-icon green">
              📝
            </div>
            <h3 className="card-title">Solicitudes de Cotización</h3>
            <p className="card-description">
              Pendientes de revisión: 3<br />
              Enviadas este mes: 12<br />
              Tiempo promedio: 5 días
            </p>
          </div>
          
          <div className="card">
            <div className="card-icon purple">
              📋
            </div>
            <h3 className="card-title">Órdenes de Compra</h3>
            <p className="card-description">
              Generadas este mes: 18<br />
              Monto total: $234,500<br />
              Ahorro promedio: 12%
            </p>
          </div>
          
          <div className="card">
            <div className="card-icon yellow">
              🏢
            </div>
            <h3 className="card-title">Proveedores</h3>
            <p className="card-description">
              Activos: 45<br />
              Nuevos este mes: 3<br />
              Evaluación promedio: 4.2/5
            </p>
          </div>
        </div>
        
        <div className="features">
          <h2 className="features-title">Acciones Rápidas</h2>
          <div className="features-grid">
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon blue">📤</span>
                Crear Solicitud
              </h3>
              <p style={{ color: 'white', marginBottom: '1rem' }}>
                Genera una nueva solicitud de cotización
              </p>
              <button className="btn btn-primary">Nueva Solicitud</button>
            </div>
            
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon purple">📊</span>
                Revisar Cotizaciones
              </h3>
              <p style={{ color: 'white', marginBottom: '1rem' }}>
                Compara y evalúa cotizaciones recibidas
              </p>
              <button className="btn btn-primary">Ver Cotizaciones</button>
            </div>
            
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon green">📋</span>
                Generar Orden
              </h3>
              <p style={{ color: 'white', marginBottom: '1rem' }}>
                Crea órdenes de compra para cotizaciones aprobadas
              </p>
              <button className="btn btn-primary">Crear Orden</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PurchaseDashboard; 