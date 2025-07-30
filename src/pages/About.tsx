import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container">
      <section className="hero">
        <h1 className="hero-title">Acerca de SIP</h1>
        <p className="hero-subtitle">
          Sistema Integral de Proveedores - Transformando la gestión de proveedores
        </p>
        
        <div className="features">
          <h2 className="features-title">Nuestra Misión</h2>
          <p style={{ color: 'white', fontSize: '1.2rem', textAlign: 'center', marginBottom: '2rem' }}>
            Desarrollar una plataforma web robusta e integral que funcione como el punto centralizador 
            de todas las interacciones y procesos relacionados con nuestros proveedores.
          </p>
          
          <div className="features-grid">
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon blue">🎯</span>
                Objetivos
              </h3>
              <ul className="feature-list">
                <li className="feature-item">Trazabilidad completa de transacciones</li>
                <li className="feature-item">Flujos de trabajo autorizados</li>
                <li className="feature-item">Visibilidad compartida entre áreas</li>
                <li className="feature-item">Optimización de procesos</li>
              </ul>
            </div>
            
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon purple">💡</span>
                Beneficios
              </h3>
              <ul className="feature-list">
                <li className="feature-item">Reducción de errores manuales</li>
                <li className="feature-item">Mejora en tiempos de respuesta</li>
                <li className="feature-item">Control documental centralizado</li>
                <li className="feature-item">Colaboración mejorada</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 