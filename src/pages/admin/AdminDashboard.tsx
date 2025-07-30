import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="container">
      <section className="hero">
        <h1 className="hero-title">Dashboard de Administrador</h1>
        <p className="hero-subtitle">
          Gestiona usuarios, roles, permisos y configuración del sistema
        </p>
        
        <div className="cards-grid">
          <div className="card">
            <div className="card-icon blue">
              👥
            </div>
            <h3 className="card-title">Usuarios</h3>
            <p className="card-description">
              Usuarios activos: 156<br />
              Nuevos este mes: 12<br />
              Proveedores: 89
            </p>
          </div>
          
          <div className="card">
            <div className="card-icon green">
              🔐
            </div>
            <h3 className="card-title">Roles y Permisos</h3>
            <p className="card-description">
              Roles configurados: 4<br />
              Permisos activos: 24<br />
              Sesiones activas: 45
            </p>
          </div>
          
          <div className="card">
            <div className="card-icon purple">
              📊
            </div>
            <h3 className="card-title">Reportes</h3>
            <p className="card-description">
              Generados este mes: 28<br />
              Descargas: 156<br />
              Alertas activas: 3
            </p>
          </div>
          
          <div className="card">
            <div className="card-icon yellow">
              ⚙️
            </div>
            <h3 className="card-title">Configuración</h3>
            <p className="card-description">
              Módulos activos: 8<br />
              Integraciones: 5<br />
              Última actualización: 2 días
            </p>
          </div>
        </div>
        
        <div className="features">
          <h2 className="features-title">Acciones de Administración</h2>
          <div className="features-grid">
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon blue">👥</span>
                Gestión de Usuarios
              </h3>
              <p style={{ color: 'white', marginBottom: '1rem' }}>
                Crea, edita y gestiona usuarios del sistema
              </p>
              <button className="btn btn-primary">Gestionar Usuarios</button>
            </div>
            
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon purple">🔐</span>
                Roles y Permisos
              </h3>
              <p style={{ color: 'white', marginBottom: '1rem' }}>
                Configura roles y permisos de acceso
              </p>
              <button className="btn btn-primary">Configurar Roles</button>
            </div>
            
            <div className="feature-section">
              <h3 className="feature-section-title">
                <span className="feature-section-icon green">📊</span>
                Reportes
              </h3>
              <p style={{ color: 'white', marginBottom: '1rem' }}>
                Genera reportes y métricas del sistema
              </p>
              <button className="btn btn-primary">Ver Reportes</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard; 