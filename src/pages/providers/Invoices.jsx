import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

const Invoices = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const invoices = {
    pending: [
      {
        id: 1,
        invoiceNumber: 'INV-2024-001',
        amount: 25000,
        status: 'pending',
        dueDate: '2024-02-15',
        description: 'Suministro de Materiales de Construcción',
        submittedDate: '2024-01-15'
      },
      {
        id: 2,
        invoiceNumber: 'INV-2024-002',
        amount: 18000,
        status: 'pending',
        dueDate: '2024-02-10',
        description: 'Servicios de Mantenimiento Industrial',
        submittedDate: '2024-01-10'
      }
    ],
    paid: [
      {
        id: 3,
        invoiceNumber: 'INV-2024-003',
        amount: 12000,
        status: 'paid',
        paidDate: '2024-01-30',
        description: 'Equipos de Oficina',
        submittedDate: '2024-01-05'
      }
    ],
    overdue: [
      {
        id: 4,
        invoiceNumber: 'INV-2023-015',
        amount: 8500,
        status: 'overdue',
        dueDate: '2023-12-15',
        description: 'Servicios de Limpieza',
        submittedDate: '2023-11-15'
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'paid': return 'text-green-600 bg-green-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendiente de Pago';
      case 'paid': return 'Pagada';
      case 'overdue': return 'Vencida';
      default: return status;
    }
  };

  const UploadInvoiceModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Subir Factura</h3>
          <button
            onClick={() => setShowUploadModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Factura
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Ej: INV-2024-001"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Descripción de los servicios/productos"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monto
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="0.00"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Vencimiento
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Archivo de Factura
            </label>
            <input
              type="file"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowUploadModal(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary">
              Subir Factura
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Facturas
          </h1>
          <p className="text-gray-600">
            Consulta el estado de tus facturas y pagos
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowUploadModal(true)}
        >
          Subir Factura
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{invoices.pending.length}</div>
            <div className="text-sm text-gray-600">Pendientes</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{invoices.paid.length}</div>
            <div className="text-sm text-gray-600">Pagadas</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{invoices.overdue.length}</div>
            <div className="text-sm text-gray-600">Vencidas</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              ${invoices.pending.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Pendiente</div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pending'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pendientes ({invoices.pending.length})
          </button>
          <button
            onClick={() => setActiveTab('paid')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'paid'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pagadas ({invoices.paid.length})
          </button>
          <button
            onClick={() => setActiveTab('overdue')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overdue'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Vencidas ({invoices.overdue.length})
          </button>
        </nav>
      </div>

      {/* Facturas */}
      <div className="space-y-6">
        {invoices[activeTab].map((invoice) => (
          <Card key={invoice.id}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {invoice.invoiceNumber}
                </h3>
                <p className="text-gray-700 mb-2">
                  {invoice.description}
                </p>
                <div className="text-sm text-gray-600">
                  <p>Enviada: {new Date(invoice.submittedDate).toLocaleDateString()}</p>
                  {activeTab === 'pending' && (
                    <p>Vence: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                  )}
                  {activeTab === 'paid' && (
                    <p>Pagada: {new Date(invoice.paidDate).toLocaleDateString()}</p>
                  )}
                  {activeTab === 'overdue' && (
                    <p className="text-red-600">Vencida desde: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                  {getStatusText(invoice.status)}
                </span>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    ${invoice.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <Button variant="outline" size="sm">
                Ver Detalles
              </Button>
              <Button variant="outline" size="sm">
                Descargar PDF
              </Button>
              {activeTab === 'pending' && (
                <Button variant="primary" size="sm">
                  Recordar Pago
                </Button>
              )}
            </div>
          </Card>
        ))}
        
        {invoices[activeTab].length === 0 && (
          <Card>
            <div className="text-center py-8">
              <p className="text-gray-500">
                No hay facturas en esta categoría.
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Modal */}
      {showUploadModal && <UploadInvoiceModal />}
    </div>
  );
};

export default Invoices; 