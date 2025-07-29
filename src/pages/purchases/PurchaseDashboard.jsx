import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useAppContext } from '../../context/AppContext';

const PurchaseDashboard = () => {
  const { user } = useAppContext();
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'quotation',
      message: 'Nueva cotización recibida de Proveedor ABC',
      time: '2 horas',
      priority: 'high'
    },
    {
      id: 2,
      type: 'approval',
      message: 'Cotización #1234 pendiente de aprobación',
      time: '4 horas',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'order',
      message: 'Orden de compra #5678 lista para generar',
      time: '1 día',
      priority: 'low'
    }
  ]);

  const [stats] = useState({
    pendingQuotations: 12,
    approvedQuotations: 8,
    totalOrders: 45,
    monthlySpend: 125000
  });

  const [recentQuotations] = useState([
    {
      id: 'Q-001',
      provider: 'Proveedor ABC',
      amount: 15000,
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: 'Q-002',
      provider: 'Proveedor XYZ',
      amount: 8500,
      status: 'approved',
      date: '2024-01-14'
    },
    {
      id: 'Q-003',
      provider: 'Proveedor DEF',
      amount: 22000,
      status: 'rejected',
      date: '2024-01-13'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'approved': return 'Aprobada';
      case 'rejected': return 'Rechazada';
      default: return 'Desconocido';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const dismissAlert = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard de Compras
        </h1>
        <p className="text-gray-600">
          Bienvenido, {user?.name}. Gestiona cotizaciones y órdenes de compra.
        </p>
      </div>

      {/* Alertas */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Alertas Recientes
        </h2>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white border-l-4 ${getPriorityColor(alert.priority)} p-4 rounded-lg shadow-sm flex justify-between items-center`}
            >
              <div>
                <p className="font-medium text-gray-900">{alert.message}</p>
                <p className="text-sm text-gray-500">Hace {alert.time}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => dismissAlert(alert.id)}
              >
                Descartar
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-600">{stats.pendingQuotations}</h3>
            <p className="text-gray-600">Cotizaciones Pendientes</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-600">{stats.approvedQuotations}</h3>
            <p className="text-gray-600">Cotizaciones Aprobadas</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-purple-600">{stats.totalOrders}</h3>
            <p className="text-gray-600">Órdenes de Compra</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-orange-600">
              ${stats.monthlySpend.toLocaleString()}
            </h3>
            <p className="text-gray-600">Gasto Mensual</p>
          </div>
        </Card>
      </div>

      {/* Acciones Rápidas */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Revisar Cotizaciones</h3>
              <p className="text-sm text-gray-600 mb-3">
                Evalúa las nuevas cotizaciones recibidas
              </p>
              <Button variant="primary" size="sm">
                Ver Cotizaciones
              </Button>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Generar Órdenes</h3>
              <p className="text-sm text-gray-600 mb-3">
                Crea órdenes de compra aprobadas
              </p>
              <Button variant="primary" size="sm">
                Crear Orden
              </Button>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Reportes</h3>
              <p className="text-sm text-gray-600 mb-3">
                Analiza el rendimiento de compras
              </p>
              <Button variant="primary" size="sm">
                Ver Reportes
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Cotizaciones Recientes */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Cotizaciones Recientes
        </h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Proveedor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentQuotations.map((quotation) => (
                  <tr key={quotation.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {quotation.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {quotation.provider}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${quotation.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(quotation.status)}`}>
                        {getStatusText(quotation.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {quotation.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PurchaseDashboard; 