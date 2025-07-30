import { Card } from '../components/Card';
import { Button } from '../components/Button';

const Home = () => {
  return (
    <div className="main">
      <div className="container">
        {/* Hero section */}
        <div className="hero">
          <h1 className="hero-title">
            Sistema Integral de Proveedores
            <span style={{ display: 'block', fontSize: '2rem', marginTop: '0.5rem', color: '#e0e7ff' }}>
              (SIP)
            </span>
          </h1>
          <p className="hero-subtitle">
            Plataforma web innovadora diseñada para transformar digitalmente la interacción y gestión de la relación entre nuestra empresa y sus proveedores.
          </p>
        </div>

        {/* Cards grid */}
        <div className="cards-grid">
          <div className="card animate-bounce-in" style={{ animationDelay: '0.1s' }}>
            <div className="card-icon blue">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="card-title">Registro de Proveedores</h3>
            <p className="card-description">
              Registro autónomo con validación interna y carga de documentos legales y fiscales.
            </p>
          </div>

          <div className="card animate-bounce-in" style={{ animationDelay: '0.2s' }}>
            <div className="card-icon green">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="card-title">Cotización y Aprobación</h3>
            <p className="card-description">
              Solicitud, recepción y evaluación de cotizaciones con comparación eficiente.
            </p>
          </div>

          <div className="card animate-bounce-in" style={{ animationDelay: '0.3s' }}>
            <div className="card-icon purple">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="card-title">Órdenes de Compra</h3>
            <p className="card-description">
              Generación automática y emisión de órdenes de compra con seguimiento en tiempo real.
            </p>
          </div>

          <div className="card animate-bounce-in" style={{ animationDelay: '0.4s' }}>
            <div className="card-icon yellow">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="card-title">Facturación y Pagos</h3>
            <p className="card-description">
              Carga de facturas, validación automática y gestión de complementos de pago (PPD).
            </p>
          </div>
        </div>

        {/* Features section */}
        <div className="features animate-slide-up">
          <h2 className="features-title">
            Módulos Principales
          </h2>
          <div className="features-grid">
            <div className="feature-section">
              <h3 className="feature-section-title">
                <div className="feature-section-icon blue">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                Para Proveedores
              </h3>
              <ul className="feature-list">
                <li className="feature-item">Registro y carga de documentos</li>
                <li className="feature-item">Gestión de cotizaciones</li>
                <li className="feature-item">Seguimiento de facturas y pagos</li>
                <li className="feature-item">Carga de complementos PPD</li>
              </ul>
            </div>
            <div className="feature-section">
              <h3 className="feature-section-title">
                <div className="feature-section-icon purple">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                Para la Empresa
              </h3>
              <ul className="feature-list">
                <li className="feature-item">Gestión de compras y órdenes</li>
                <li className="feature-item">Control financiero y pagos</li>
                <li className="feature-item">Dashboard y reportes</li>
                <li className="feature-item">Gestión de usuarios y roles</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="buttons-container animate-fade-in">
          <div className="buttons-row">
            <a href="/providers/register" className="btn btn-primary">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Acceder como Proveedor
            </a>
            <a href="/dashboard" className="btn btn-secondary">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Acceder como Empresa
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 