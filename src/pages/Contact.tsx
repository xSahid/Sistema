import React, { useState, useEffect } from 'react';
import { useLoading } from '../hooks/useLoading';
import { useScrollToTop } from '../hooks/useScrollToTop';
import ContactSkeleton from '../components/ContactSkeleton';

const Contact: React.FC = () => {
  const { isLoading } = useLoading({ delay: 150, minDuration: 400 });
  const [contentAnimation, setContentAnimation] = useState(false);
  useScrollToTop();

  useEffect(() => {
    if (!isLoading) {
      // Animar el contenido principal después de que termine el loading
      const timer = setTimeout(() => {
        setContentAnimation(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading) {
    return <ContactSkeleton />;
  }
  return (
    <div className="container">
      <section className="hero">
        <h1 className="hero-title">Contacto</h1>
        <p className="hero-subtitle">
          Estamos aquí para ayudarte con cualquier consulta sobre SIP
        </p>
        
        <div 
          className={`features ${contentAnimation ? 'card-animate' : ''}`}
          style={{
            opacity: contentAnimation ? 1 : 0,
            transform: contentAnimation ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease-out'
          }}
        >
          <h2 className="features-title">Información de Contacto</h2>
          
          <div className="features-grid">
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon blue">📧</span>
                Email
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                soporte@sip.com<br />
                desarrollo@sip.com
              </p>
            </div>
            
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon purple">📞</span>
                Teléfono
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                +52 55 1234 5678<br />
                +52 55 1234 5679
              </p>
            </div>
            
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon green">🕒</span>
                Horario
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                Lunes a Viernes<br />
                9:00 - 18:00
              </p>
            </div>
            
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon yellow">📍</span>
                Ubicación
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
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