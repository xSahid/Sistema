import React, { useState, useEffect } from 'react';
import Objetivos from '../assets/Img/Objetivos.png';
import Beneficios from '../assets/Img/Beneficios.png';
import { useLoading } from '../hooks/useLoading';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { HeroSkeleton, FeatureSkeleton } from '../components/Skeleton';

const About: React.FC = () => {
  const { isLoading } = useLoading({ delay: 200, minDuration: 400 });
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
    return (
      <div className="container">
        <section className="hero">
          <HeroSkeleton />
          
          <div className="features">
            <HeroSkeleton />
            <div className="features-grid">
              <FeatureSkeleton />
              <FeatureSkeleton />
            </div>
          </div>
        </section>
      </div>
    );
  }
  return (
    <div className="container">
      <section className="hero">
        <h1 className="hero-title">Acerca de SIP</h1>
        <p className="hero-subtitle">
          Sistema Integral de Proveedores - Transformando la gestión de proveedores
        </p>
        
        <div 
          className={`features ${contentAnimation ? 'card-animate' : ''}`}
          style={{
            opacity: contentAnimation ? 1 : 0,
            transform: contentAnimation ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease-out'
          }}
        >
          <h2 className="features-title">Nuestra Misión</h2>
          <p style={{ color: '#64748b', fontSize: '1.2rem', textAlign: 'center', marginBottom: '2rem' }}>
            Desarrollar una plataforma web robusta e integral que funcione como el punto centralizador 
            de todas las interacciones y procesos relacionados con nuestros proveedores.
          </p>
          
          <div className="features-grid">
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon blue" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={Objetivos} 
                    alt="Objetivos" 
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      objectFit: 'contain',
                      borderRadius: '0.25rem'
                    }} 
                  />
                </span>
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
                <span className="feature-section-icon purple" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={Beneficios} 
                    alt="Beneficios" 
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      objectFit: 'contain',
                      borderRadius: '0.25rem'
                    }} 
                  />
                </span>
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