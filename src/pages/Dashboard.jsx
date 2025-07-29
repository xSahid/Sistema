import { useAppContext } from '../context/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAppContext();

  const getDashboardContent = () => {
    if (!user) {
      return (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Bienvenido al Sistema de Gestión de Proveedores
          </h2>
          <p className="text-gray-600 mb-8">
            Digitaliza y optimiza la relación con proveedores, asegurando trazabilidad de la información.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/providers/register">
              <Button variant="primary" size="lg">
                Registrarse como Proveedor
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      );
    }

    // Dashboard según el rol del usuario
    switch (user.role) {
      case 'provider':
        return <ProviderDashboardContent />;
      case 'purchaser':
        return <PurchaserDashboardContent />;
      case 'finance':
        return <FinanceDashboardContent />;
      case 'admin':
        return <AdminDashboardContent />;
      default:
        return <GeneralDashboardContent />;
    }
  };

  const ProviderDashboardContent = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Panel de Proveedor</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-2">Cotizaciones</h3>
          <p className="text-gray-600 mb-4">Gestiona tus cotizaciones y respuestas</p>
          <Link to="/providers/quotations">
            <Button variant="primary">Ver Cotizaciones</Button>
          </Link>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Facturas</h3>
          <p className="text-gray-600 mb-4">Consulta el estado de tus facturas</p>
          <Link to="/providers/invoices">
            <Button variant="primary">Ver Facturas</Button>
          </Link>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Pagos</h3>
          <p className="text-gray-600 mb-4">Seguimiento de pagos y abonos</p>
          <Link to="/providers/payments">
            <Button variant="primary">Ver Pagos</Button>
          </Link>
        </Card>
      </div>
    </div>
  );

  const PurchaserDashboardContent = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Panel de Compras</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-2">Cotizaciones</h3>
          <p className="text-gray-600 mb-4">Evalúa y compara cotizaciones</p>
          <Link to="/purchases/quotations">
            <Button variant="primary">Gestionar Cotizaciones</Button>
          </Link>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Órdenes de Compra</h3>
          <p className="text-gray-600 mb-4">Crea y gestiona órdenes de compra</p>
          <Link to="/purchases/orders">
            <Button variant="primary">Ver Órdenes</Button>
          </Link>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Proveedores</h3>
          <p className="text-gray-600 mb-4">Administra proveedores activos</p>
          <Button variant="primary">Gestionar Proveedores</Button>
        </Card>
      </div>
    </div>
  );

  const FinanceDashboardContent = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Panel de Finanzas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-2">Pagos</h3>
          <p className="text-gray-600 mb-4">Registra y gestiona pagos</p>
          <Link to="/finance/payments">
            <Button variant="primary">Gestionar Pagos</Button>
          </Link>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Planes de Pago</h3>
          <p className="text-gray-600 mb-4">Programa planes de pago</p>
          <Link to="/finance/plans">
            <Button variant="primary">Ver Planes</Button>
          </Link>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Reportes</h3>
          <p className="text-gray-600 mb-4">Genera reportes financieros</p>
          <Button variant="primary">Ver Reportes</Button>
        </Card>
      </div>
    </div>
  );

  const AdminDashboardContent = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Panel de Administración</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-2">Usuarios</h3>
          <p className="text-gray-600 mb-4">Gestiona usuarios y permisos</p>
          <Link to="/admin/users">
            <Button variant="primary">Gestionar Usuarios</Button>
          </Link>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Reportes</h3>
          <p className="text-gray-600 mb-4">Genera reportes consolidados</p>
          <Link to="/admin/reports">
            <Button variant="primary">Ver Reportes</Button>
          </Link>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Configuración</h3>
          <p className="text-gray-600 mb-4">Configuración del sistema</p>
          <Button variant="primary">Configurar</Button>
        </Card>
      </div>
    </div>
  );

  const GeneralDashboardContent = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard General</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-2">Acceso Rápido</h3>
          <p className="text-gray-600 mb-4">Navega a las secciones principales</p>
          <div className="space-y-2">
            <Link to="/providers/dashboard">
              <Button variant="outline" className="w-full justify-start">
                Panel de Proveedor
              </Button>
            </Link>
            <Link to="/purchases/dashboard">
              <Button variant="outline" className="w-full justify-start">
                Panel de Compras
              </Button>
            </Link>
            <Link to="/finance/dashboard">
              <Button variant="outline" className="w-full justify-start">
                Panel de Finanzas
              </Button>
            </Link>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Estadísticas</h3>
          <p className="text-gray-600 mb-4">Resumen de actividades</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Cotizaciones Pendientes:</span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex justify-between">
              <span>Facturas por Pagar:</span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex justify-between">
              <span>Proveedores Activos:</span>
              <span className="font-semibold">0</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {getDashboardContent()}
    </div>
  );
};

export default Dashboard; 