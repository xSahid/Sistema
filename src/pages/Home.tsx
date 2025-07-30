import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ResumenGeneral from '../assets/Img/ResumenGeneral.png';
import Cotizacion from '../assets/Img/Cotizacion.png';
import Compras from '../assets/Img/compras.png';
import Administracion from '../assets/Img/administracion.png';
import { useLoading } from '../hooks/useLoading';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { HeroSkeleton, CardSkeleton } from '../components/Skeleton';

const Home: React.FC = () => {
  const { isLoading } = useLoading({ delay: 200, minDuration: 600 });
  const [cardAnimations, setCardAnimations] = useState([false, false, false, false]);
  useScrollToTop();

  useEffect(() => {
    if (!isLoading) {
      // Animar las tarjetas con retraso escalonado
      const timers = [
        setTimeout(() => setCardAnimations(prev => [true, prev[1], prev[2], prev[3]]), 300),
        setTimeout(() => setCardAnimations(prev => [prev[0], true, prev[2], prev[3]]), 500),
        setTimeout(() => setCardAnimations(prev => [prev[0], prev[1], true, prev[3]]), 700),
        setTimeout(() => setCardAnimations(prev => [prev[0], prev[1], prev[2], true]), 900)
      ];

      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="container">
        <section className="hero">
          <HeroSkeleton />
          
          <div className="cards-grid">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
          
          <div className="features">
            <HeroSkeleton />
            <div className="features-grid">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </div>
        </section>
      </div>
    );
  }
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
          <div 
            className={`card ${cardAnimations[0] ? 'card-animate' : ''}`}
            style={{
              opacity: cardAnimations[0] ? 1 : 0,
              transform: cardAnimations[0] ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.6s ease-out'
            }}
          >
            <div className="card-icon blue" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src={ResumenGeneral} 
                alt="Registro de Proveedores" 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  objectFit: 'contain',
                  display: 'block'
                }} 
              />
            </div>
            <h3 className="card-title">Registro de Proveedores</h3>
            <p className="card-description">
              Registro autónomo con validación interna y carga de documentos legales y fiscales.
            </p>
          </div>
          
          <div 
            className={`card ${cardAnimations[1] ? 'card-animate' : ''}`}
            style={{
              opacity: cardAnimations[1] ? 1 : 0,
              transform: cardAnimations[1] ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.6s ease-out'
            }}
          >
            <div className="card-icon green" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src={Cotizacion} 
                alt="Cotización y Aprobación" 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  objectFit: 'contain',
                  display: 'block'
                }} 
              />
            </div>
            <h3 className="card-title">Cotización y Aprobación</h3>
            <p className="card-description">
              Solicitud, recepción y evaluación de cotizaciones con comparación eficiente.
            </p>
          </div>
          
          <div 
            className={`card ${cardAnimations[2] ? 'card-animate' : ''}`}
            style={{
              opacity: cardAnimations[2] ? 1 : 0,
              transform: cardAnimations[2] ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.6s ease-out'
            }}
          >
            <div className="card-icon purple" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src={Compras} 
                alt="Órdenes de Compra" 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  objectFit: 'contain',
                  display: 'block'
                }} 
              />
            </div>
            <h3 className="card-title">Órdenes de Compra</h3>
            <p className="card-description">
              Generación automática de órdenes de compra con seguimiento en tiempo real.
            </p>
          </div>
          
          <div 
            className={`card ${cardAnimations[3] ? 'card-animate' : ''}`}
            style={{
              opacity: cardAnimations[3] ? 1 : 0,
              transform: cardAnimations[3] ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.6s ease-out'
            }}
          >
            <div className="card-icon yellow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src={Administracion} 
                alt="Facturación y Pagos" 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  objectFit: 'contain',
                  display: 'block'
                }} 
              />
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