import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="container">
      <section className="hero">
        <h1 className="hero-title">Contacto</h1>
        <p className="hero-subtitle">
          Estamos aquí para ayudarte con cualquier consulta sobre SIP
        </p>
        
        <div className="features">
          <h2 className="features-title">Información de Contacto</h2>
          
          <div className="features-grid">
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon blue">📧</span>
                Email
              </h3>
              <p style={{ color: 'white', fontSize: '1.1rem' }}>
                soporte@sip.com<br />
                desarrollo@sip.com
              </p>
            </div>
            
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon purple">📞</span>
                Teléfono
              </h3>
              <p style={{ color: 'white', fontSize: '1.1rem' }}>
                +52 55 1234 5678<br />
                +52 55 1234 5679
              </p>
            </div>
            
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon green">🕒</span>
                Horario
              </h3>
              <p style={{ color: 'white', fontSize: '1.1rem' }}>
                Lunes a Viernes<br />
                9:00 - 18:00
              </p>
            </div>
            
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon yellow">📍</span>
                Ubicación
              </h3>
              <p style={{ color: 'white', fontSize: '1.1rem' }}>
                Ciudad de México<br />
                México
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 