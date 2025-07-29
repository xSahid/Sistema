import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useAppContext } from '../../context/AppContext';

const AdminDashboard = () => {
  const { user } = useAppContext();
  const [stats] = useState({
    totalUsers: 45,
    activeUsers: 38,
    totalProviders: 12,
    activeProviders: 10,
    totalQuotations: 156,
    pendingQuotations: 23,
    totalOrders: 89,
    completedOrders: 67,
    totalPayments: 450000,
    pendingPayments: 125000,
    systemUptime: '99.8%',
    lastBackup: '2024-01-15 02:00'
  });

  const [recentActivities] = useState([
    {
      id: 1,
      type: 'user',
      action: 'Nuevo usuario registrado',
      user: 'Juan Pérez',
      role: 'Proveedor',
      time: '2 horas'
    },
    {
      id: 2,
      type: 'quotation',
      action: 'Cotización aprobada',
      user: 'Proveedor ABC',
      details: 'Q-001 - $15,000',
      time: '4 horas'
    },
    {
      id: 3,
      type: 'payment',
      action: 'Pago registrado',
      user: 'Finanzas',
      details: 'P-002 - $8,500',
      time: '6 horas'
    },
    {
      id: 4,
      type: 'order',
      action: 'Orden de compra creada',
      user: 'Compras',
      details: 'PO-003 - $32,000',
      time: '1 día'
    },
    {
      id: 5,
      type: 'system',
      action: 'Backup automático completado',
      user: 'Sistema',
      details: 'Base de datos',
      time: '1 día'
    }
  ]);

  const [systemAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'Espacio en disco al 85%',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'info',
      message: 'Actualización de seguridad disponible',
      severity: 'low'
    },
    {
      id: 3,
      type: 'success',
      message: 'Backup diario completado exitosamente',
      severity: 'low'
    }
  ]);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
      case 'quotation':
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'payment':
        return (
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        );
      case 'order':
        return (
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        );
      case 'system':
        return (
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning': return 'border-l-yellow-500';
      case 'error': return 'border-l-red-500';
      case 'success': return 'border-l-green-500';
      case 'info': return 'border-l-blue-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard de Administración
        </h1>
        <p className="text-gray-600">
          Bienvenido, {user?.name}. Gestiona el sistema y monitorea el rendimiento.
        </p>
      </div>

      {/* Estadísticas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-600">{stats.totalUsers}</h3>
            <p className="text-gray-600">Usuarios Totales</p>
            <p className="text-sm text-green-600">{stats.activeUsers} activos</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-600">{stats.totalProviders}</h3>
            <p className="text-gray-600">Proveedores</p>
            <p className="text-sm text-green-600">{stats.activeProviders} activos</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-purple-600">{stats.totalQuotations}</h3>
            <p className="text-gray-600">Cotizaciones</p>
            <p className="text-sm text-yellow-600">{stats.pendingQuotations} pendientes</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-orange-600">{stats.totalOrders}</h3>
            <p className="text-gray-600">Órdenes de Compra</p>
            <p className="text-sm text-green-600">{stats.completedOrders} completadas</p>
          </div>
        </Card>
      </div>

      {/* Estadísticas Financieras */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Resumen Financiero
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Pagado</span>
              <span className="font-semibold text-green-600">
                ${stats.totalPayments.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pagos Pendientes</span>
              <span className="font-semibold text-yellow-600">
                ${stats.pendingPayments.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tasa de Completitud</span>
              <span className="font-semibold text-blue-600">
                {Math.round(((stats.totalPayments - stats.pendingPayments) / stats.totalPayments) * 100)}%
              </span>
            </div>
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Estado del Sistema
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tiempo Activo</span>
              <span className="font-semibold text-green-600">{stats.systemUptime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Último Backup</span>
              <span className="font-semibold text-gray-900">{stats.lastBackup}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Estado</span>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Operativo
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Acciones Rápidas */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Acciones Administrativas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Gestión de Usuarios</h3>
              <p className="text-sm text-gray-600 mb-3">
                Crear, editar y asignar roles
              </p>
              <Button variant="primary" size="sm">
                Gestionar Usuarios
              </Button>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Reportes</h3>
              <p className="text-sm text-gray-600 mb-3">
                Generar reportes consolidados
              </p>
              <Button variant="primary" size="sm">
                Ver Reportes
              </Button>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Configuración</h3>
              <p className="text-sm text-gray-600 mb-3">
                Configurar parámetros del sistema
              </p>
              <Button variant="primary" size="sm">
                Configurar
              </Button>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Seguridad</h3>
              <p className="text-sm text-gray-600 mb-3">
                Monitorear logs de seguridad
              </p>
              <Button variant="primary" size="sm">
                Ver Logs
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Alertas del Sistema */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Alertas del Sistema
        </h2>
        <div className="space-y-3">
          {systemAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white border-l-4 ${getAlertColor(alert.type)} p-4 rounded-lg shadow-sm`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{alert.message}</p>
                  <p className="text-sm text-gray-500">Severidad: {alert.severity}</p>
                </div>
                <Button variant="outline" size="sm">
                  Ver Detalles
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actividad Reciente */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Actividad Reciente del Sistema
        </h2>
        <Card>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                {getActivityIcon(activity.type)}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">
                    {activity.user} • {activity.details} • Hace {activity.time}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Ver
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard; 