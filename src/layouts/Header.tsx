import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
  const { user, logout } = useAppContext();

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
          <Link to="/about" className="nav-link">
            Acerca de
          </Link>
          <Link to="/contact" className="nav-link">
            Contacto
          </Link>
          
          {user && (
            <>
              {user.role === 'provider' && (
                <Link to="/providers/payments" className="nav-link">
                  Pagos
                </Link>
              )}
              <button 
                onClick={logout}
                className="btn-register"
              >
                Cerrar Sesión
              </button>
            </>
          )}
          
          {!user && (
            <Link to="/providers/register" className="btn-register">
              Registrarse como Proveedor
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header; 