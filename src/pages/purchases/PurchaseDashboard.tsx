import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ResumenGeneral from '../../assets/Img/ResumenGeneral.png';
import Cotizacion from '../../assets/Img/Cotizacion.png';
import Compras from '../../assets/Img/compras.png';
import Administracion from '../../assets/Img/administracion.png';
import { useLoading } from '../../hooks/useLoading';
import { HeroSkeleton, CardSkeleton } from '../../components/Skeleton';

const PurchaseDashboard: React.FC = () => {
  const { isLoading } = useLoading({ delay: 150, minDuration: 500 });
  const [cardAnimations, setCardAnimations] = useState([false, false, false, false]);

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
        <h1 className="hero-title">Dashboard de Compras</h1>
        <p className="hero-subtitle">
          Gestiona solicitudes de cotización, órdenes de compra y proveedores
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
                alt="Resumen General" 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  objectFit: 'contain',
                  display: 'block'
                }} 
              />
            </div>
            <h3 className="card-title">Resumen General</h3>
            <p className="card-description">
              Solicitudes activas: 8<br />
              Cotizaciones recibidas: 24<br />
              Órdenes generadas: 15
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
                alt="Solicitudes de Cotización" 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  objectFit: 'contain',
                  display: 'block'
                }} 
              />
            </div>
            <h3 className="card-title">Solicitudes de Cotización</h3>
            <p className="card-description">
              Pendientes de revisión: 3<br />
              Enviadas este mes: 12<br />
              Tiempo promedio: 5 días
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
              Generadas este mes: 18<br />
              Monto total: $234,500<br />
              Ahorro promedio: 12%
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
                alt="Proveedores" 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  objectFit: 'contain',
                  display: 'block'
                }} 
              />
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
              <Link to="/purchases/create-rfq" className="btn btn-primary">
                Nueva Solicitud
              </Link>
            </div>
            
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon purple">📊</span>
                Revisar Cotizaciones
              </h3>
              <p style={{ color: 'white', marginBottom: '1rem' }}>
                Compara y evalúa cotizaciones recibidas
              </p>
              <Link to="/purchases/quotations" className="btn btn-primary">
                Ver Cotizaciones
              </Link>
            </div>
            
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon green">📋</span>
                Generar Orden
              </h3>
              <p style={{ color: 'white', marginBottom: '1rem' }}>
                Crea órdenes de compra para cotizaciones aprobadas
              </p>
              <Link to="/purchases/create-order" className="btn btn-primary">
                Crear Orden
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PurchaseDashboard; 