import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { user } = useAppContext();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              AppAlze
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Inicio
            </Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                
                {/* Menú según rol del usuario */}
                {user.role === 'provider' && (
                  <>
                    <Link to="/providers/dashboard" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Mi Panel
                    </Link>
                    <Link to="/providers/quotations" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Cotizaciones
                    </Link>
                    <Link to="/providers/invoices" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Facturas
                    </Link>
                  </>
                )}
                
                {user.role === 'purchaser' && (
                  <>
                    <Link to="/purchases/dashboard" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Compras
                    </Link>
                    <Link to="/purchases/quotations" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Cotizaciones
                    </Link>
                    <Link to="/purchases/orders" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Órdenes
                    </Link>
                  </>
                )}
                
                {user.role === 'finance' && (
                  <>
                    <Link to="/finance/dashboard" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Finanzas
                    </Link>
                    <Link to="/finance/payments" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Pagos
                    </Link>
                    <Link to="/finance/plans" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Planes
                    </Link>
                  </>
                )}
                
                {user.role === 'admin' && (
                  <>
                    <Link to="/admin/dashboard" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Admin
                    </Link>
                    <Link to="/admin/users" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Usuarios
                    </Link>
                    <Link to="/admin/reports" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Reportes
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Link to="/about" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Acerca de
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Contacto
                </Link>
                <Link to="/providers/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  Registrarse
                </Link>
              </>
            )}
          </nav>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Hola, {user.name}</span>
                <button className="text-gray-700 hover:text-gray-900 text-sm">
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 