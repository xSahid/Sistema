import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Footer: React.FC = () => {
  const { isDarkMode } = useAppContext();

  return (
    <footer style={{
      backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5',
      color: isDarkMode ? '#ffffff' : '#333333',
      padding: '2rem 0',
      marginTop: 'auto',
      borderTop: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {/* Información del Sistema */}
        <div>
          <h3 style={{
            marginBottom: '1rem',
            color: isDarkMode ? '#90caf9' : '#1976d2',
            fontSize: '1.2rem',
            fontWeight: 600
          }}>
            SIP - Sistema Integral de Proveedores
          </h3>
          <p style={{
            lineHeight: 1.6,
            color: isDarkMode ? '#cccccc' : '#666666'
          }}>
            Plataforma web innovadora para la gestión integral de proveedores y procesos de compra.
          </p>
        </div>

        {/* Módulos */}
        <div>
          <h4 style={{
            marginBottom: '1rem',
            color: isDarkMode ? '#90caf9' : '#1976d2',
            fontSize: '1.1rem',
            fontWeight: 600
          }}>
            Módulos
          </h4>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link 
                to="/providers/registration" 
                style={{
                  color: isDarkMode ? '#90caf9' : '#1976d2',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isDarkMode ? '#42a5f5' : '#1565c0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDarkMode ? '#90caf9' : '#1976d2';
                }}
              >
                Registrarse como Proveedor
              </Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link 
                to="/purchases/create-rfq" 
                style={{
                  color: isDarkMode ? '#90caf9' : '#1976d2',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isDarkMode ? '#42a5f5' : '#1565c0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDarkMode ? '#90caf9' : '#1976d2';
                }}
              >
                Cotizaciones
              </Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link 
                to="/finance/payments" 
                style={{
                  color: isDarkMode ? '#90caf9' : '#1976d2',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isDarkMode ? '#42a5f5' : '#1565c0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDarkMode ? '#90caf9' : '#1976d2';
                }}
              >
                Pagos
              </Link>
            </li>
          </ul>
        </div>

        {/* Soporte */}
        <div>
          <h4 style={{
            marginBottom: '1rem',
            color: isDarkMode ? '#90caf9' : '#1976d2',
            fontSize: '1.1rem',
            fontWeight: 600
          }}>
            Soporte
          </h4>
          <div style={{
            color: isDarkMode ? '#cccccc' : '#666666',
            lineHeight: 1.6
          }}>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>Email:</strong> soporte@sip.com
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>Teléfono:</strong> +52 55 1234 5678
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>Horario:</strong> Lunes a Viernes 9:00 - 18:00
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        textAlign: 'center',
        marginTop: '2rem',
        paddingTop: '1rem',
        borderTop: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0',
        color: isDarkMode ? '#888888' : '#999999',
        fontSize: '0.9rem'
      }}>
        © 2025 SIP - Sistema Integral de Proveedores. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer; 