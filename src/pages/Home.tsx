import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container">
      <section className="hero">
        <h1 className="hero-title">
          Sistema Integral de Proveedores (SIP)
        </h1>
        <p className="hero-subtitle">
          Plataforma web innovadora para la gestión integral de proveedores y procesos de compra.
          Digitaliza y automatiza todas las etapas de colaboración con tus socios comerciales.
        </p>
        
        <div className="cards-grid">
          <div className="card">
            <div className="card-icon blue">
              📝
            </div>
            <h3 className="card-title">Registro de Proveedores</h3>
            <p className="card-description">
              Registro autónomo con validación interna y carga de documentos legales y fiscales.
            </p>
          </div>
          
          <div className="card">
            <div className="card-icon green">
              💰
            </div>
            <h3 className="card-title">Cotización y Aprobación</h3>
            <p className="card-description">
              Solicitud, recepción y evaluación de cotizaciones con comparación eficiente.
            </p>
          </div>
          
          <div className="card">
            <div className="card-icon purple">
              📋
            </div>
            <h3 className="card-title">Órdenes de Compra</h3>
            <p className="card-description">
              Generación automática de órdenes de compra con seguimiento en tiempo real.
            </p>
          </div>
          
          <div className="card">
            <div className="card-icon yellow">
              💳
            </div>
            <h3 className="card-title">Facturación y Pagos</h3>
            <p className="card-description">
              Carga de facturas, validación automática y gestión de complementos PPD.
            </p>
          </div>
        </div>
        
        <div className="features">
          <h2 className="features-title">Módulos Principales</h2>
          <div className="features-grid">
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon blue">🏢</span>
                Para Proveedores
              </h3>
              <ul className="feature-list">
                <li className="feature-item">Registro autónomo con validación</li>
                <li className="feature-item">Carga de cotizaciones</li>
                <li className="feature-item">Seguimiento de facturas y pagos</li>
                <li className="feature-item">Gestión de complementos PPD</li>
                <li className="feature-item">Dashboard personalizado</li>
              </ul>
            </div>
            
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon purple">🏭</span>
                Para la Empresa
              </h3>
              <ul className="feature-list">
                <li className="feature-item">Gestión de solicitudes de cotización</li>
                <li className="feature-item">Comparación y aprobación de ofertas</li>
                <li className="feature-item">Generación automática de órdenes</li>
                <li className="feature-item">Validación y programación de pagos</li>
                <li className="feature-item">Reportes y métricas clave</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="buttons-container">
          <div className="buttons-row">
            <Link to="/providers/register" className="btn btn-primary btn-lg">
              Acceder como Proveedor
            </Link>
            <Link to="/purchases/dashboard" className="btn btn-secondary btn-lg">
              Acceder como Empresa
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 