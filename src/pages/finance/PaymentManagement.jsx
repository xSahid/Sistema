import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

const PaymentManagement = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    type: 'partial',
    notes: '',
    paymentDate: ''
  });

  const [invoices] = useState([
    {
      id: 'INV-001',
      provider: 'Proveedor ABC',
      totalAmount: 25000,
      paidAmount: 15000,
      remainingAmount: 10000,
      status: 'pending',
      dueDate: '2024-01-25',
      invoiceDate: '2024-01-10',
      description: 'Materiales de construcción'
    },
    {
      id: 'INV-002',
      provider: 'Proveedor XYZ',
      totalAmount: 18000,
      paidAmount: 0,
      remainingAmount: 18000,
      status: 'pending',
      dueDate: '2024-01-30',
      invoiceDate: '2024-01-15',
      description: 'Equipos de oficina'
    },
    {
      id: 'INV-003',
      provider: 'Proveedor DEF',
      totalAmount: 32000,
      paidAmount: 32000,
      remainingAmount: 0,
      status: 'completed',
      dueDate: '2024-01-20',
      invoiceDate: '2024-01-05',
      description: 'Herramientas especializadas'
    },
    {
      id: 'INV-004',
      provider: 'Proveedor GHI',
      totalAmount: 45000,
      paidAmount: 20000,
      remainingAmount: 25000,
      status: 'overdue',
      dueDate: '2024-01-15',
      invoiceDate: '2024-01-01',
      description: 'Equipos de cómputo'
    }
  ]);

  const [paymentHistory] = useState([
    {
      id: 'PAY-001',
      invoiceId: 'INV-001',
      provider: 'Proveedor ABC',
      amount: 15000,
      type: 'partial',
      date: '2024-01-15',
      notes: 'Primer pago parcial'
    },
    {
      id: 'PAY-002',
      invoiceId: 'INV-003',
      provider: 'Proveedor DEF',
      amount: 32000,
      type: 'full',
      date: '2024-01-18',
      notes: 'Pago completo'
    },
    {
      id: 'PAY-003',
      invoiceId: 'INV-004',
      provider: 'Proveedor GHI',
      amount: 20000,
      type: 'partial',
      date: '2024-01-12',
      notes: 'Pago parcial inicial'
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
      case 'completed': return 'Pagada';
      case 'pending': return 'Pendiente';
      case 'overdue': return 'Vencida';
      default: return 'Desconocido';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'full': return 'text-green-600 bg-green-100';
      case 'partial': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'full': return 'Pago Completo';
      case 'partial': return 'Pago Parcial';
      default: return 'Desconocido';
    }
  };

  const filteredInvoices = invoices.filter(invoice => invoice.status === activeTab);

  const handlePaymentClick = (invoice) => {
    setSelectedInvoice(invoice);
    setPaymentForm({
      amount: '',
      type: 'partial',
      notes: '',
      paymentDate: new Date().toISOString().split('T')[0]
    });
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Aquí se implementaría la lógica para registrar el pago
    console.log('Registrando pago:', {
      invoice: selectedInvoice,
      payment: paymentForm
    });
    setShowPaymentModal(false);
    setSelectedInvoice(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getProgressPercentage = (paid, total) => {
    return Math.round((paid / total) * 100);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gestión de Pagos
        </h1>
        <p className="text-gray-600">
          Registra pagos parciales y gestiona el control de abonos
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-6">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'pending'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Pendientes ({invoices.filter(i => i.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('overdue')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'overdue'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Vencidas ({invoices.filter(i => i.status === 'overdue').length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'completed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Pagadas ({invoices.filter(i => i.status === 'completed').length})
          </button>
        </div>
      </div>

      {/* Lista de Facturas */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Facturas Pendientes de Pago
        </h2>
        <div className="space-y-4">
          {filteredInvoices.map((invoice) => (
            <Card key={invoice.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {invoice.id} - {invoice.provider}
                      </h3>
                      <p className="text-sm text-gray-600">{invoice.description}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                      {getStatusText(invoice.status)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Monto Total</p>
                      <p className="text-lg font-semibold text-gray-900">
                        ${invoice.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pagado</p>
                      <p className="text-lg font-semibold text-green-600">
                        ${invoice.paidAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Restante</p>
                      <p className="text-lg font-semibold text-orange-600">
                        ${invoice.remainingAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Vencimiento</p>
                      <p className={`text-sm ${invoice.status === 'overdue' ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                        {invoice.dueDate}
                      </p>
                    </div>
                  </div>

                  {/* Barra de Progreso */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progreso de Pago</span>
                      <span>{getProgressPercentage(invoice.paidAmount, invoice.totalAmount)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${getProgressPercentage(invoice.paidAmount, invoice.totalAmount)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Fecha de Factura</p>
                      <p className="text-sm text-gray-900">{invoice.invoiceDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Días Restantes</p>
                      <p className={`text-sm ${invoice.status === 'overdue' ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                        {invoice.status === 'overdue' ? 'Vencida' : '5 días'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  {invoice.status !== 'completed' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handlePaymentClick(invoice)}
                    >
                      Registrar Pago
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                  <Button variant="outline" size="sm">
                    Descargar Factura
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredInvoices.length === 0 && (
          <Card>
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay facturas</h3>
              <p className="mt-1 text-sm text-gray-500">
                No se encontraron facturas con el estado seleccionado.
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Historial de Pagos */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Historial de Pagos
        </h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID Pago
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Factura
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
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notas
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentHistory.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.invoiceId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.provider}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${payment.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(payment.type)}`}>
                        {getTypeText(payment.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Modal para Registrar Pago */}
      {showPaymentModal && selectedInvoice && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Registrar Pago
              </h3>
              
              <form onSubmit={handlePaymentSubmit}>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500">Factura</p>
                  <p className="text-gray-900">{selectedInvoice.id} - {selectedInvoice.provider}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500">Monto Restante</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${selectedInvoice.remainingAmount.toLocaleString()}
                  </p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monto a Pagar
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={paymentForm.amount}
                    onChange={handleInputChange}
                    max={selectedInvoice.remainingAmount}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Pago
                  </label>
                  <select
                    name="type"
                    value={paymentForm.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="partial">Pago Parcial</option>
                    <option value="full">Pago Completo</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Pago
                  </label>
                  <input
                    type="date"
                    name="paymentDate"
                    value={paymentForm.paymentDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notas
                  </label>
                  <textarea
                    name="notes"
                    value={paymentForm.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Observaciones sobre el pago..."
                  ></textarea>
                </div>

                <div className="flex space-x-3">
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                  >
                    Registrar Pago
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement; 