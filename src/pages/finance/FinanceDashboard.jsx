import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useAppContext } from '../../context/AppContext';

const FinanceDashboard = () => {
  const { user } = useAppContext();
  const [stats] = useState({
    totalPayments: 450000,
    pendingPayments: 125000,
    partialPayments: 35000,
    overduePayments: 15000,
    monthlyBudget: 500000,
    paymentPlans: 8
  });

  const [recentPayments] = useState([
    {
      id: 'P-001',
      provider: 'Proveedor ABC',
      amount: 15000,
      status: 'completed',
      date: '2024-01-15',
      type: 'full'
    },
    {
      id: 'P-002',
      provider: 'Proveedor XYZ',
      amount: 8500,
      status: 'pending',
      date: '2024-01-20',
      type: 'partial'
    },
    {
      id: 'P-003',
      provider: 'Proveedor DEF',
      amount: 22000,
      status: 'overdue',
      date: '2024-01-10',
      type: 'full'
    }
  ]);

  const [paymentPlans] = useState([
    {
      id: 'PP-001',
      provider: 'Proveedor GHI',
      totalAmount: 50000,
      paidAmount: 25000,
      remainingAmount: 25000,
      installments: 4,
      currentInstallment: 2,
      nextPaymentDate: '2024-01-25'
    },
    {
      id: 'PP-002',
      provider: 'Proveedor JKL',
      totalAmount: 75000,
      paidAmount: 50000,
      remainingAmount: 25000,
      installments: 3,
      currentInstallment: 3,
      nextPaymentDate: '2024-01-30'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'pending': return 'Pendiente';
      case 'overdue': return 'Vencido';
      default: return 'Desconocido';
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'full': return 'Pago Completo';
      case 'partial': return 'Pago Parcial';
      default: return 'Desconocido';
    }
  };

  const getProgressPercentage = (paid, total) => {
    return Math.round((paid / total) * 100);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard de Finanzas
        </h1>
        <p className="text-gray-600">
          Bienvenido, {user?.name}. Gestiona pagos y planes de pago.
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-600">
              ${stats.totalPayments.toLocaleString()}
            </h3>
            <p className="text-gray-600">Total Pagado</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-yellow-600">
              ${stats.pendingPayments.toLocaleString()}
            </h3>
            <p className="text-gray-600">Pagos Pendientes</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-600">
              ${stats.partialPayments.toLocaleString()}
            </h3>
            <p className="text-gray-600">Pagos Parciales</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-red-600">
              ${stats.overduePayments.toLocaleString()}
            </h3>
            <p className="text-gray-600">Pagos Vencidos</p>
          </div>
        </Card>
      </div>

      {/* Presupuesto Mensual */}
      <div className="mb-8">
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Presupuesto Mensual
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Gastado</span>
                <span>${stats.totalPayments.toLocaleString()} / ${stats.monthlyBudget.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(stats.totalPayments / stats.monthlyBudget) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {Math.round((stats.totalPayments / stats.monthlyBudget) * 100)}% del presupuesto utilizado
              </p>
            </div>
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
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Registrar Pago</h3>
              <p className="text-sm text-gray-600 mb-3">
                Registra pagos parciales o completos
              </p>
              <Button variant="primary" size="sm">
                Registrar Pago
              </Button>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Plan de Pagos</h3>
              <p className="text-sm text-gray-600 mb-3">
                Programa pagos a plazos
              </p>
              <Button variant="primary" size="sm">
                Crear Plan
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
                Analiza el flujo de pagos
              </p>
              <Button variant="primary" size="sm">
                Ver Reportes
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Planes de Pago Activos */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Planes de Pago Activos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentPlans.map((plan) => (
            <Card key={plan.id}>
              <div className="mb-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {plan.provider}
                    </h3>
                    <p className="text-sm text-gray-600">Plan {plan.id}</p>
                  </div>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    Activo
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Monto Total</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${plan.totalAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pagado</p>
                    <p className="text-lg font-semibold text-green-600">
                      ${plan.paidAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Restante</p>
                    <p className="text-lg font-semibold text-orange-600">
                      ${plan.remainingAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Cuotas</p>
                    <p className="text-sm text-gray-900">
                      {plan.currentInstallment} de {plan.installments}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progreso</span>
                    <span>{getProgressPercentage(plan.paidAmount, plan.totalAmount)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${getProgressPercentage(plan.paidAmount, plan.totalAmount)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Próximo Pago</p>
                    <p className="text-sm text-gray-900">{plan.nextPaymentDate}</p>
                  </div>
                  <Button variant="primary" size="sm">
                    Registrar Pago
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Pagos Recientes */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Pagos Recientes
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
                    Tipo
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
                {recentPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.provider}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${payment.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getTypeText(payment.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                        {getStatusText(payment.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.date}
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

export default FinanceDashboard; 