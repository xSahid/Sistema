import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { user } = useAppContext();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          SIP - Sistema Integral de Proveedores
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">
            Inicio
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              
              {/* Menú según rol del usuario */}
              {user.role === 'provider' && (
                <>
                  <Link to="/providers/dashboard" className="nav-link">
                    Mi Panel
                  </Link>
                  <Link to="/providers/quotations" className="nav-link">
                    Cotizaciones
                  </Link>
                  <Link to="/providers/invoices" className="nav-link">
                    Facturas
                  </Link>
                  <Link to="/providers/payments" className="nav-link">
                    Pagos
                  </Link>
                </>
              )}
              
              {user.role === 'purchaser' && (
                <>
                  <Link to="/purchases/dashboard" className="nav-link">
                    Compras
                  </Link>
                  <Link to="/purchases/quotations" className="nav-link">
                    Cotizaciones
                  </Link>
                  <Link to="/purchases/orders" className="nav-link">
                    Órdenes
                  </Link>
                </>
              )}
              
              {user.role === 'finance' && (
                <>
                  <Link to="/finance/dashboard" className="nav-link">
                    Finanzas
                  </Link>
                  <Link to="/finance/payments" className="nav-link">
                    Pagos
                  </Link>
                  <Link to="/finance/plans" className="nav-link">
                    Planes
                  </Link>
                </>
              )}
              
              {user.role === 'admin' && (
                <>
                  <Link to="/admin/dashboard" className="nav-link">
                    Admin
                  </Link>
                  <Link to="/admin/users" className="nav-link">
                    Usuarios
                  </Link>
                  <Link to="/admin/reports" className="nav-link">
                    Reportes
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              <Link to="/about" className="nav-link">
                Acerca de
              </Link>
              <Link to="/contact" className="nav-link">
                Contacto
              </Link>
              <Link to="/providers/register" className="btn-register">
                Registrarse como Proveedor
              </Link>
            </>
          )}
        </nav>
        
        <div className="nav">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem' }}>
                Hola, {user.name}
              </span>
              <button style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                background: 'none', 
                border: 'none', 
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }}>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 