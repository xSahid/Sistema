import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const ProviderDashboard = () => {
  const { user } = useAppContext();
  const [stats, setStats] = useState({
    pendingQuotations: 5,
    activeQuotations: 12,
    pendingInvoices: 3,
    totalEarnings: 125000,
    pendingPayments: 45000
  });

  const recentQuotations = [
    {
      id: 1,
      title: 'Suministro de Materiales de Construcción',
      amount: 25000,
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Servicios de Mantenimiento Industrial',
      amount: 18000,
      status: 'approved',
      date: '2024-01-10'
    },
    {
      id: 3,
      title: 'Equipos de Seguridad',
      amount: 12000,
      status: 'submitted',
      date: '2024-01-08'
    }
  ];

  const recentInvoices = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      amount: 25000,
      status: 'pending',
      dueDate: '2024-02-15'
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      amount: 18000,
      status: 'paid',
      dueDate: '2024-01-30'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'submitted': return 'text-blue-600 bg-blue-100';
      case 'paid': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'approved': return 'Aprobada';
      case 'submitted': return 'Enviada';
      case 'paid': return 'Pagada';
      default: return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Panel de Proveedor
        </h1>
        <p className="text-gray-600">
          Bienvenido, {user?.name}. Gestiona tus cotizaciones, facturas y pagos.
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.pendingQuotations}</div>
            <div className="text-sm text-gray-600">Cotizaciones Pendientes</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.activeQuotations}</div>
            <div className="text-sm text-gray-600">Cotizaciones Activas</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.pendingInvoices}</div>
            <div className="text-sm text-gray-600">Facturas Pendientes</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">${stats.totalEarnings.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Ganancias Totales</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">${stats.pendingPayments.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Pagos Pendientes</div>
          </div>
        </Card>
      </div>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Cotizaciones</h3>
          <p className="text-gray-600 mb-4">
            Gestiona tus cotizaciones y respuestas a solicitudes
          </p>
          <div className="space-y-2">
            <Link to="/providers/quotations">
              <Button variant="primary" className="w-full">
                Ver Cotizaciones
              </Button>
            </Link>
            <Button variant="outline" className="w-full">
              Nueva Cotización
            </Button>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Facturas</h3>
          <p className="text-gray-600 mb-4">
            Consulta el estado de tus facturas y pagos
          </p>
          <div className="space-y-2">
            <Link to="/providers/invoices">
              <Button variant="primary" className="w-full">
                Ver Facturas
              </Button>
            </Link>
            <Button variant="outline" className="w-full">
              Subir Factura
            </Button>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Pagos</h3>
          <p className="text-gray-600 mb-4">
            Seguimiento de pagos y complementos de pago
          </p>
          <div className="space-y-2">
            <Link to="/providers/payments">
              <Button variant="primary" className="w-full">
                Ver Pagos
              </Button>
            </Link>
            <Button variant="outline" className="w-full">
              Subir PPD
            </Button>
          </div>
        </Card>
      </div>

      {/* Contenido Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cotizaciones Recientes */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Cotizaciones Recientes</h3>
            <Link to="/providers/quotations">
              <Button variant="outline" size="sm">
                Ver Todas
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentQuotations.map((quotation) => (
              <div key={quotation.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{quotation.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quotation.status)}`}>
                    {getStatusText(quotation.status)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>${quotation.amount.toLocaleString()}</span>
                  <span>{new Date(quotation.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Facturas Recientes */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Facturas Recientes</h3>
            <Link to="/providers/invoices">
              <Button variant="outline" size="sm">
                Ver Todas
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentInvoices.map((invoice) => (
              <div key={invoice.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{invoice.invoiceNumber}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                    {getStatusText(invoice.status)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>${invoice.amount.toLocaleString()}</span>
                  <span>Vence: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Notificaciones */}
      <div className="mt-8">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Notificaciones</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm text-blue-700">
                Nueva solicitud de cotización disponible: "Suministro de Equipos de Oficina"
              </span>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm text-green-700">
                Pago recibido por factura INV-2024-002
              </span>
            </div>
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              <span className="text-sm text-yellow-700">
                Cotización "Servicios de Mantenimiento" requiere información adicional
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProviderDashboard; 