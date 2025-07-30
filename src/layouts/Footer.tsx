import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>SIP - Sistema Integral de Proveedores</h3>
            <p>
              Plataforma web innovadora para la gestión integral de proveedores y procesos de compra.
            </p>
          </div>
          <div className="footer-section">
            <h3>Módulos</h3>
            <ul>
              <li><a href="/providers/register">Registro de Proveedores</a></li>
              <li><a href="/purchases/quotations">Cotizaciones</a></li>
              <li><a href="/finance/payments">Pagos</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Soporte</h3>
            <p>
              Email: soporte@sip.com<br />
              Teléfono: +52 55 1234 5678<br />
              Horario: Lunes a Viernes 9:00 - 18:00
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © 2024 SIP - Sistema Integral de Proveedores. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 