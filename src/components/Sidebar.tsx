import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAppContext();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const navigationItems = [
    // Páginas públicas
    { path: '/', label: 'Inicio', icon: '🏠', public: true },
    { path: '/about', label: 'Acerca de', icon: 'ℹ️', public: true },
    { path: '/contact', label: 'Contacto', icon: '📞', public: true },
    
    // Login (solo cuando no hay usuario)
    { path: '/login', label: 'Iniciar Sesión', icon: '🔐', public: true, guestOnly: true },
    
    // Registro de proveedores
    { path: '/providers/register', label: 'Registro de Proveedores', icon: '📝', public: true },
    
    // Dashboard de proveedores
    { path: '/providers/dashboard', label: 'Dashboard Proveedor', icon: '📊', role: 'provider' },
    { path: '/providers/payments', label: 'Mis Pagos', icon: '💰', role: 'provider' },
    
    // Dashboard de compras
    { path: '/purchases/dashboard', label: 'Dashboard Compras', icon: '🛒', role: 'purchases' },
    { path: '/purchases/new-request', label: 'Nueva Solicitud', icon: '📋', role: 'purchases' },
    { path: '/purchases/quotations', label: 'Cotizaciones', icon: '📊', role: 'purchases' },
    { path: '/purchases/create-order', label: 'Crear Orden', icon: '📦', role: 'purchases' },
    
    // Dashboard de finanzas
    { path: '/finance/dashboard', label: 'Dashboard Finanzas', icon: '💼', role: 'finance' },
    { path: '/finance/payments', label: 'Gestión de Pagos', icon: '💳', role: 'finance' },
    { path: '/finance/invoices', label: 'Gestión de Facturas', icon: '📄', role: 'finance' },
    { path: '/finance/ppd-complements', label: 'Complementos PPD', icon: '📄', role: 'finance' },
    
    // Dashboard de administración
    { path: '/admin/dashboard', label: 'Dashboard Admin', icon: '⚙️', role: 'admin' },
    { path: '/admin/users', label: 'Gestión de Usuarios', icon: '👥', role: 'admin' },
    { path: '/admin/documents', label: 'Gestión de Documentos', icon: '📁', role: 'admin' },
  ];

  const filteredItems = navigationItems.filter(item => {
    if (item.public) {
      // Si es solo para invitados y hay usuario, no mostrar
      if (item.guestOnly && user) return false;
      // Si no es solo para invitados, mostrar siempre
      if (!item.guestOnly) return true;
      // Si es solo para invitados y no hay usuario, mostrar
      return !user;
    }
    if (!user) return false;
    if (item.role && user.role !== item.role) return false;
    return true;
  });

  const groupedItems = {
    public: filteredItems.filter(item => item.public),
    provider: filteredItems.filter(item => item.role === 'provider'),
    purchases: filteredItems.filter(item => item.role === 'purchases'),
    finance: filteredItems.filter(item => item.role === 'finance'),
    admin: filteredItems.filter(item => item.role === 'admin'),
  };

  const getGroupTitle = (group: string) => {
    const titles = {
      public: 'Navegación General',
      provider: 'Área de Proveedores',
      purchases: 'Área de Compras',
      finance: 'Área de Finanzas',
      admin: 'Área de Administración',
    };
    return titles[group as keyof typeof titles] || '';
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3 className="sidebar-title">
            <span className="sidebar-icon">🧭</span>
            Navegación
          </h3>
          <button 
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Cerrar barra lateral"
          >
            ✕
          </button>
        </div>

        <div className="sidebar-content">
          {Object.entries(groupedItems).map(([group, items]) => {
            if (items.length === 0) return null;
            
            return (
              <div key={group} className="sidebar-section">
                <h4 className="sidebar-section-title">
                  {getGroupTitle(group)}
                </h4>
                <ul className="sidebar-nav-list">
                  {items.map((item) => (
                    <li key={item.path} className="sidebar-nav-item">
                      <Link
                        to={item.path}
                        className={`sidebar-nav-link ${isActive(item.path) ? 'active' : ''}`}
                        onClick={onClose}
                      >
                        <span className="sidebar-nav-icon">{item.icon}</span>
                        <span className="sidebar-nav-label">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-user-info">
            {user ? (
              <>
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="user-details">
                  <div className="user-name">{user.name}</div>
                  <div className="user-role">{user.role}</div>
                </div>
              </>
            ) : (
              <div className="guest-info">
                <span className="guest-icon">👤</span>
                <span className="guest-text">Invitado</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 