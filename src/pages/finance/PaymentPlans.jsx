import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

const PaymentPlans = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [planForm, setPlanForm] = useState({
    installments: 3,
    frequency: 'monthly',
    startDate: '',
    notes: ''
  });

  const [invoices] = useState([
    {
      id: 'INV-005',
      provider: 'Proveedor MNO',
      totalAmount: 80000,
      paidAmount: 0,
      remainingAmount: 80000,
      status: 'pending',
      dueDate: '2024-02-15',
      invoiceDate: '2024-01-20',
      description: 'Equipos industriales'
    },
    {
      id: 'INV-006',
      provider: 'Proveedor PQR',
      totalAmount: 120000,
      paidAmount: 30000,
      remainingAmount: 90000,
      status: 'pending',
      dueDate: '2024-02-20',
      invoiceDate: '2024-01-18',
      description: 'Maquinaria pesada'
    },
    {
      id: 'INV-007',
      provider: 'Proveedor STU',
      totalAmount: 60000,
      paidAmount: 0,
      remainingAmount: 60000,
      status: 'pending',
      dueDate: '2024-02-10',
      invoiceDate: '2024-01-22',
      description: 'Herramientas especializadas'
    }
  ]);

  const [paymentPlans] = useState([
    {
      id: 'PP-001',
      invoiceId: 'INV-001',
      provider: 'Proveedor ABC',
      totalAmount: 50000,
      paidAmount: 25000,
      remainingAmount: 25000,
      installments: 4,
      currentInstallment: 2,
      frequency: 'monthly',
      startDate: '2024-01-01',
      nextPaymentDate: '2024-01-25',
      status: 'active',
      installmentsList: [
        { number: 1, amount: 12500, dueDate: '2024-01-01', status: 'paid' },
        { number: 2, amount: 12500, dueDate: '2024-01-25', status: 'pending' },
        { number: 3, amount: 12500, dueDate: '2024-02-25', status: 'pending' },
        { number: 4, amount: 12500, dueDate: '2024-03-25', status: 'pending' }
      ]
    },
    {
      id: 'PP-002',
      invoiceId: 'INV-003',
      provider: 'Proveedor DEF',
      totalAmount: 75000,
      paidAmount: 50000,
      remainingAmount: 25000,
      installments: 3,
      currentInstallment: 3,
      frequency: 'biweekly',
      startDate: '2024-01-05',
      nextPaymentDate: '2024-01-30',
      status: 'active',
      installmentsList: [
        { number: 1, amount: 25000, dueDate: '2024-01-05', status: 'paid' },
        { number: 2, amount: 25000, dueDate: '2024-01-19', status: 'paid' },
        { number: 3, amount: 25000, dueDate: '2024-01-30', status: 'pending' }
      ]
    },
    {
      id: 'PP-003',
      invoiceId: 'INV-004',
      provider: 'Proveedor GHI',
      totalAmount: 45000,
      paidAmount: 45000,
      remainingAmount: 0,
      installments: 3,
      currentInstallment: 3,
      frequency: 'monthly',
      startDate: '2023-12-01',
      nextPaymentDate: '2024-01-01',
      status: 'completed',
      installmentsList: [
        { number: 1, amount: 15000, dueDate: '2023-12-01', status: 'paid' },
        { number: 2, amount: 15000, dueDate: '2024-01-01', status: 'paid' },
        { number: 3, amount: 15000, dueDate: '2024-02-01', status: 'paid' }
      ]
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      default: return 'Desconocido';
    }
  };

  const getInstallmentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getInstallmentStatusText = (status) => {
    switch (status) {
      case 'paid': return 'Pagada';
      case 'pending': return 'Pendiente';
      case 'overdue': return 'Vencida';
      default: return 'Desconocido';
    }
  };

  const getFrequencyText = (frequency) => {
    switch (frequency) {
      case 'weekly': return 'Semanal';
      case 'biweekly': return 'Quincenal';
      case 'monthly': return 'Mensual';
      case 'quarterly': return 'Trimestral';
      default: return 'Desconocido';
    }
  };

  const filteredPlans = paymentPlans.filter(plan => plan.status === activeTab);

  const handleCreatePlan = (invoice) => {
    setSelectedInvoice(invoice);
    setPlanForm({
      installments: 3,
      frequency: 'monthly',
      startDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setShowCreateModal(true);
  };

  const handlePlanSubmit = (e) => {
    e.preventDefault();
    // Aquí se implementaría la lógica para crear el plan de pago
    console.log('Creando plan de pago:', {
      invoice: selectedInvoice,
      plan: planForm
    });
    setShowCreateModal(false);
    setSelectedInvoice(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlanForm(prev => ({
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
          Planes de Pago
        </h1>
        <p className="text-gray-600">
          Programa pagos a plazos para gestionar la tesorería
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-6">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'active'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Activos ({paymentPlans.filter(p => p.status === 'active').length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'completed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Completados ({paymentPlans.filter(p => p.status === 'completed').length})
          </button>
        </div>
      </div>

      {/* Facturas Disponibles para Crear Planes */}
      {activeTab === 'active' && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Facturas Disponibles para Planes de Pago
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {invoices.map((invoice) => (
              <Card key={invoice.id}>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {invoice.provider}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {invoice.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">Total:</span>
                      <p className="text-lg font-semibold text-gray-900">
                        ${invoice.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Restante:</span>
                      <p className="text-lg font-semibold text-orange-600">
                        ${invoice.remainingAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Vencimiento:</span>
                      <p className="text-gray-900">{invoice.dueDate}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Factura:</span>
                      <p className="text-gray-900">{invoice.id}</p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleCreatePlan(invoice)}
                  className="w-full"
                >
                  Crear Plan de Pago
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Planes de Pago */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Planes de Pago {activeTab === 'active' ? 'Activos' : 'Completados'}
        </h2>
        <div className="space-y-4">
          {filteredPlans.map((plan) => (
            <Card key={plan.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {plan.id} - {plan.provider}
                      </h3>
                      <p className="text-sm text-gray-600">Factura: {plan.invoiceId}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(plan.status)}`}>
                      {getStatusText(plan.status)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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

                  {/* Barra de Progreso */}
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

                  {/* Detalles del Plan */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Frecuencia</p>
                      <p className="text-sm text-gray-900">{getFrequencyText(plan.frequency)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Fecha de Inicio</p>
                      <p className="text-sm text-gray-900">{plan.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Próximo Pago</p>
                      <p className="text-sm text-gray-900">{plan.nextPaymentDate}</p>
                    </div>
                  </div>

                  {/* Lista de Cuotas */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500 mb-2">Cuotas:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                      {plan.installmentsList.map((installment) => (
                        <div
                          key={installment.number}
                          className="bg-gray-50 rounded-lg p-3"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              Cuota {installment.number}
                            </span>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getInstallmentStatusColor(installment.status)}`}>
                              {getInstallmentStatusText(installment.status)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900">
                            ${installment.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {installment.dueDate}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  {plan.status === 'active' && (
                    <Button variant="primary" size="sm">
                      Registrar Pago
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                  <Button variant="outline" size="sm">
                    Descargar Plan
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPlans.length === 0 && (
          <Card>
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay planes</h3>
              <p className="mt-1 text-sm text-gray-500">
                No se encontraron planes de pago con el estado seleccionado.
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Modal para Crear Plan de Pago */}
      {showCreateModal && selectedInvoice && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Crear Plan de Pago
              </h3>
              
              <form onSubmit={handlePlanSubmit}>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500">Factura</p>
                  <p className="text-gray-900">{selectedInvoice.id} - {selectedInvoice.provider}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500">Monto a Financiar</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${selectedInvoice.remainingAmount.toLocaleString()}
                  </p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Cuotas
                  </label>
                  <select
                    name="installments"
                    value={planForm.installments}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={2}>2 cuotas</option>
                    <option value={3}>3 cuotas</option>
                    <option value={4}>4 cuotas</option>
                    <option value={6}>6 cuotas</option>
                    <option value={12}>12 cuotas</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frecuencia de Pago
                  </label>
                  <select
                    name="frequency"
                    value={planForm.frequency}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="weekly">Semanal</option>
                    <option value="biweekly">Quincenal</option>
                    <option value="monthly">Mensual</option>
                    <option value="quarterly">Trimestral</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Inicio
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={planForm.startDate}
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
                    value={planForm.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Observaciones sobre el plan de pago..."
                  ></textarea>
                </div>

                <div className="flex space-x-3">
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                  >
                    Crear Plan
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateModal(false)}
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

export default PaymentPlans; 