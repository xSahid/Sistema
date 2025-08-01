import React from 'react';
import Solicitud from '../assets/accionesrapidas/solicitud.png';
import Revisar from '../assets/accionesrapidas/revisar.png';
import Orden from '../assets/accionesrapidas/orden.png';

const About: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#ffffff',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '4rem'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: '#60a5fa'
        }}>
          Acerca de SIP
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#94a3b8',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Sistema Integral de Proveedores - Transformando la gestión de compras
        </p>
      </div>

      {/* Mission */}
      <div style={{
        textAlign: 'center',
        marginBottom: '4rem',
        padding: '2rem',
        backgroundColor: '#1e293b',
        borderRadius: '12px',
        maxWidth: '800px',
        margin: '0 auto 4rem auto'
      }}>
        <h2 style={{
          fontSize: '2rem',
          marginBottom: '1rem',
          color: '#60a5fa'
        }}>
          Nuestra Misión
        </h2>
        <p style={{
          fontSize: '1.1rem',
          color: '#cbd5e1',
          lineHeight: '1.6'
        }}>
          Desarrollar una plataforma web robusta e integral que funcione como el punto centralizador 
          de todas las interacciones y procesos relacionados con nuestros proveedores.
        </p>
      </div>

      {/* Features Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Feature 1 */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid #334155'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <img 
              src={Solicitud} 
              alt="Crear Solicitud" 
              style={{ 
                width: '60px', 
                height: '60px', 
                objectFit: 'contain'
              }} 
            />
          </div>
          <h3 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: '#60a5fa'
          }}>
            Crear Solicitud
          </h3>
          <p style={{
            color: '#cbd5e1',
            lineHeight: '1.5'
          }}>
            Genera una nueva solicitud de cotización de manera rápida y eficiente
          </p>
        </div>

        {/* Feature 2 */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid #334155'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <img 
              src={Revisar} 
              alt="Revisar Cotizaciones" 
              style={{ 
                width: '60px', 
                height: '60px', 
                objectFit: 'contain'
              }} 
            />
          </div>
          <h3 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: '#60a5fa'
          }}>
            Revisar Cotizaciones
          </h3>
          <p style={{
            color: '#cbd5e1',
            lineHeight: '1.5'
          }}>
            Compara y evalúa cotizaciones recibidas de diferentes proveedores
          </p>
        </div>

        {/* Feature 3 */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid #334155'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <img 
              src={Orden} 
              alt="Generar Orden" 
              style={{ 
                width: '60px', 
                height: '60px', 
                objectFit: 'contain'
              }} 
            />
          </div>
          <h3 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: '#60a5fa'
          }}>
            Generar Orden
          </h3>
          <p style={{
            color: '#cbd5e1',
            lineHeight: '1.5'
          }}>
            Crea órdenes de compra para cotizaciones aprobadas automáticamente
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 