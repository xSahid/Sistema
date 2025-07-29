import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('purchases');
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  });

  const [reportData] = useState({
    purchases: {
      totalOrders: 89,
      totalAmount: 1250000,
      averageOrderValue: 14045,
      topProviders: [
        { name: 'Proveedor ABC', orders: 15, amount: 250000 },
        { name: 'Proveedor XYZ', orders: 12, amount: 180000 },
        { name: 'Proveedor DEF', orders: 10, amount: 150000 }
      ],
      monthlyTrend: [
        { month: 'Ene', orders: 25, amount: 350000 },
        { month: 'Feb', orders: 30, amount: 420000 },
        { month: 'Mar', orders: 28, amount: 380000 },
        { month: 'Abr', orders: 32, amount: 450000 }
      ]
    },
    payments: {
      totalPayments: 980000,
      pendingPayments: 125000,
      averagePaymentTime: 15,
      paymentMethods: [
        { method: 'Transferencia', count: 45, amount: 450000 },
        { method: 'Cheque', count: 20, amount: 300000 },
        { method: 'Efectivo', count: 15, amount: 230000 }
      ],
      monthlyPayments: [
        { month: 'Ene', amount: 280000 },
        { month: 'Feb', amount: 320000 },
        { month: 'Mar', amount: 290000 },
        { month: 'Abr', amount: 350000 }
      ]
    },
    providers: {
      totalProviders: 25,
      activeProviders: 20,
      newProviders: 3,
      providerPerformance: [
        { name: 'Proveedor ABC', rating: 4.8, orders: 15, onTimeDelivery: 95 },
        { name: 'Proveedor XYZ', rating: 4.5, orders: 12, onTimeDelivery: 88 },
        { name: 'Proveedor DEF', rating: 4.2, orders: 10, onTimeDelivery: 82 }
      ]
    },
    quotations: {
      totalQuotations: 156,
      approvedQuotations: 89,
      rejectedQuotations: 23,
      pendingQuotations: 44,
      averageResponseTime: 3.2,
      quotationStats: [
        { status: 'Aprobadas', count: 89, percentage: 57 },
        { status: 'Rechazadas', count: 23, percentage: 15 },
        { status: 'Pendientes', count: 44, percentage: 28 }
      ]
    }
  });

  const [reportTypes] = useState([
    {
      id: 'purchases',
      name: 'Reporte de Compras',
      description: 'Análisis de órdenes de compra y gastos',
      icon: '📊'
    },
    {
      id: 'payments',
      name: 'Reporte de Pagos',
      description: 'Análisis de pagos y flujo de caja',
      icon: '💰'
    },
    {
      id: 'providers',
      name: 'Reporte de Proveedores',
      description: 'Rendimiento y evaluación de proveedores',
      icon: '🏢'
    },
    {
      id: 'quotations',
      name: 'Reporte de Cotizaciones',
      description: 'Análisis de cotizaciones recibidas',
      icon: '📋'
    }
  ]);

  const getReportData = () => {
    return reportData[selectedReport];
  };

  const handleGenerateReport = () => {
    // Aquí se implementaría la lógica para generar el reporte
    console.log('Generando reporte:', selectedReport, dateRange);
  };

  const handleExportReport = (format) => {
    // Aquí se implementaría la lógica para exportar el reporte
    console.log('Exportando reporte en formato:', format);
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Reportes Consolidados
        </h1>
        <p className="text-gray-600">
          Genera reportes consolidados para monitorear compras y pagos
        </p>
      </div>

      {/* Selector de Reportes */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Tipo de Reporte
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTypes.map((report) => (
            <Card
              key={report.id}
              className={`cursor-pointer transition-all duration-200 ${
                selectedReport === report.id
                  ? 'ring-2 ring-blue-500 bg-blue-50'
                  : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedReport(report.id)}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{report.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {report.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {report.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Configuración de Fechas */}
      <div className="mb-8">
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Configuración del Reporte
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Inicio
              </label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Fin
              </label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end">
              <Button variant="primary" onClick={handleGenerateReport}>
                Generar Reporte
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Contenido del Reporte */}
      <div className="space-y-8">
        {/* Resumen Ejecutivo */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Resumen Ejecutivo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedReport === 'purchases' && (
              <>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-600">
                    {getReportData().totalOrders}
                  </h3>
                  <p className="text-gray-600">Órdenes Totales</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-600">
                    ${getReportData().totalAmount.toLocaleString()}
                  </h3>
                  <p className="text-gray-600">Monto Total</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-purple-600">
                    ${getReportData().averageOrderValue.toLocaleString()}
                  </h3>
                  <p className="text-gray-600">Promedio por Orden</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-orange-600">
                    {getReportData().topProviders.length}
                  </h3>
                  <p className="text-gray-600">Proveedores Activos</p>
                </div>
              </>
            )}
            {selectedReport === 'payments' && (
              <>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-600">
                    ${getReportData().totalPayments.toLocaleString()}
                  </h3>
                  <p className="text-gray-600">Pagos Totales</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-yellow-600">
                    ${getReportData().pendingPayments.toLocaleString()}
                  </h3>
                  <p className="text-gray-600">Pagos Pendientes</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-600">
                    {getReportData().averagePaymentTime} días
                  </h3>
                  <p className="text-gray-600">Tiempo Promedio</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-purple-600">
                    {getReportData().paymentMethods.length}
                  </h3>
                  <p className="text-gray-600">Métodos de Pago</p>
                </div>
              </>
            )}
            {selectedReport === 'providers' && (
              <>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-600">
                    {getReportData().totalProviders}
                  </h3>
                  <p className="text-gray-600">Proveedores Totales</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-600">
                    {getReportData().activeProviders}
                  </h3>
                  <p className="text-gray-600">Proveedores Activos</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-purple-600">
                    {getReportData().newProviders}
                  </h3>
                  <p className="text-gray-600">Nuevos Proveedores</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-orange-600">
                    4.5
                  </h3>
                  <p className="text-gray-600">Rating Promedio</p>
                </div>
              </>
            )}
            {selectedReport === 'quotations' && (
              <>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-600">
                    {getReportData().totalQuotations}
                  </h3>
                  <p className="text-gray-600">Cotizaciones Totales</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-600">
                    {getReportData().approvedQuotations}
                  </h3>
                  <p className="text-gray-600">Aprobadas</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-red-600">
                    {getReportData().rejectedQuotations}
                  </h3>
                  <p className="text-gray-600">Rechazadas</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-yellow-600">
                    {getReportData().averageResponseTime} días
                  </h3>
                  <p className="text-gray-600">Tiempo Respuesta</p>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Detalles del Reporte */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tabla de Datos */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Detalles
            </h3>
            <div className="overflow-x-auto">
              {selectedReport === 'purchases' && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Proveedor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Órdenes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Monto
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getReportData().topProviders.map((provider, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {provider.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {provider.orders}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${provider.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {selectedReport === 'payments' && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Método
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cantidad
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Monto
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getReportData().paymentMethods.map((method, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {method.method}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {method.count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${method.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {selectedReport === 'providers' && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Proveedor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Entrega
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getReportData().providerPerformance.map((provider, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {provider.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ⭐ {provider.rating}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={getPercentageColor(provider.onTimeDelivery)}>
                            {provider.onTimeDelivery}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {selectedReport === 'quotations' && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cantidad
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Porcentaje
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getReportData().quotationStats.map((stat, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {stat.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {stat.count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {stat.percentage}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Card>

          {/* Gráfico o Información Adicional */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tendencias
            </h3>
            <div className="space-y-4">
              {selectedReport === 'purchases' && getReportData().monthlyTrend.map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{month.month}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{month.orders} órdenes</span>
                    <span className="text-sm font-medium text-gray-900">
                      ${month.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
              {selectedReport === 'payments' && getReportData().monthlyPayments.map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{month.month}</span>
                  <span className="text-sm font-medium text-gray-900">
                    ${month.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Acciones del Reporte */}
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Exportar Reporte
              </h3>
              <p className="text-sm text-gray-600">
                Descarga el reporte en diferentes formatos
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => handleExportReport('pdf')}
              >
                Exportar PDF
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExportReport('excel')}
              >
                Exportar Excel
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExportReport('csv')}
              >
                Exportar CSV
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports; 