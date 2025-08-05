import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ResumenGeneral from '../assets/Img/ResumenGeneral.png';
import Cotizacion from '../assets/Img/Cotizacion.png';
import Compras from '../assets/Img/compras.png';
import Administracion from '../assets/Img/administracion.png';
import solicitudImg from '../assets/accionesrapidas/solicitud.png';
import revisarImg from '../assets/accionesrapidas/revisar.png';
import ordenImg from '../assets/accionesrapidas/orden.png';
import { useLoading } from '../hooks/useLoading';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { HeroSkeleton, CardSkeleton } from '../components/Skeleton';

const Home: React.FC = () => {
  const { isLoading } = useLoading({ delay: 200, minDuration: 600 });
  const [cardAnimations, setCardAnimations] = useState([false, false, false, false]);
  useScrollToTop();

  useEffect(() => {
    if (!isLoading) {
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
        <h1 className="hero-title">SIP - Sistema Integral de Proveedores</h1>
        <p className="hero-subtitle">
          Gestiona proveedores, cotizaciones y compras de manera eficiente
        </p>

        <div className="cards-grid">
          {[ResumenGeneral, Cotizacion, Compras, Administracion].map((icon, index) => (
            <div
              key={index}
              className={`card ${cardAnimations[index] ? 'card-animate' : ''}`}
              style={{
                opacity: cardAnimations[index] ? 1 : 0,
                transform: cardAnimations[index] ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                transformOrigin: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = cardAnimations[index] ? 'translateY(0)' : 'translateY(30px)';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <div
                className={`card-icon ${['blue', 'green', 'purple', 'yellow'][index]}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <img
                  src={icon}
                  alt="Card"
                  style={{ width: '80px', height: '80px', objectFit: 'contain', display: 'block' }}
                />
              </div>
              <h3 className="card-title">
                {['Resumen General', 'Cotizaciones', 'Compras', 'Administración'][index]}
              </h3>
              <p className="card-description">
                {[
                  'Proveedores activos: 156\nCotizaciones este mes: 89\nAhorro promedio: 15%',
                  'Solicitudes activas: 23\nRespuestas recibidas: 67\nTiempo promedio: 3 días',
                  'Órdenes generadas: 45\nMonto total: $567,800\nProveedores utilizados: 28',
                  'Usuarios activos: 12\nReportes generados: 34\nSistema estable: 99.9%'
                ][index].split('\n').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}
              </p>
            </div>
          ))}
        </div>

        {/* === SECCIÓN MEJORADA: Acciones Rápidas === */}
        <div className="features" style={{ padding: '3rem 0' }}>
          <h2 className="features-title" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>
            Acciones Rápidas
          </h2>

          <div className="features-grid" style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem'
          }}>

            {/* Crear Solicitud */}
            <div style={{
              background: 'var(--card-bg)',
              borderRadius: '1rem',
              padding: '2rem',
              width: '300px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
              transformOrigin: 'center',
              border: '2px solid var(--border-color)',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.25), 0 8px 16px rgba(0, 0, 0, 0.15)';
              e.currentTarget.style.border = '2px solid #4a90e2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.border = '2px solid var(--border-color)';
            }}
            >
              <img src={solicitudImg} alt="Crear Solicitud" style={{ width: '100px', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Crear Solicitud</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Genera una nueva solicitud de cotización.
              </p>
              <Link to="/purchases/new-request" className="btn btn-primary" style={{
                backgroundColor: '#4a90e2',
                color: '#fff',
                padding: '0.5rem 1.2rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '500',
                display: 'inline-block',
                transition: 'all 0.3s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#357abd';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#4a90e2';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              >
                Nueva Solicitud
              </Link>
            </div>

            {/* Revisar Cotizaciones */}
            <div style={{
              background: 'var(--card-bg)',
              borderRadius: '1rem',
              padding: '2rem',
              width: '300px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
              transformOrigin: 'center',
              border: '2px solid var(--border-color)',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.25), 0 8px 16px rgba(0, 0, 0, 0.15)';
              e.currentTarget.style.border = '2px solid #9b59b6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.border = '2px solid var(--border-color)';
            }}
            >
              <img src={revisarImg} alt="Revisar Cotizaciones" style={{ width: '100px', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Revisar Cotizaciones</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Compara y evalúa cotizaciones recibidas.
              </p>
              <Link to="/purchases/quotations" className="btn btn-primary" style={{
                backgroundColor: '#9b59b6',
                color: '#fff',
                padding: '0.5rem 1.2rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '500',
                display: 'inline-block',
                transition: 'all 0.3s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#8e44ad';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#9b59b6';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              >
                Ver Cotizaciones
              </Link>
            </div>

            {/* Generar Orden */}
            <div style={{
              background: 'var(--card-bg)',
              borderRadius: '1rem',
              padding: '2rem',
              width: '300px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
              transformOrigin: 'center',
              border: '2px solid var(--border-color)',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.25), 0 8px 16px rgba(0, 0, 0, 0.15)';
              e.currentTarget.style.border = '2px solid #27ae60';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.border = '2px solid var(--border-color)';
            }}
            >
              <img src={ordenImg} alt="Generar Orden" style={{ width: '100px', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Generar Orden</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Crea órdenes de compra para cotizaciones aprobadas.
              </p>
              <Link to="/purchases/create-order" className="btn btn-primary" style={{
                backgroundColor: '#27ae60',
                color: '#fff',
                padding: '0.5rem 1.2rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '500',
                display: 'inline-block',
                transition: 'all 0.3s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#229954';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#27ae60';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              >
                Crear Orden
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 