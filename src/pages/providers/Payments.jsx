import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

const Payments = () => {
  const [activeTab, setActiveTab] = useState('received');
  const [showPPDModal, setShowPPDModal] = useState(false);

  const payments = {
    received: [
      {
        id: 1,
        paymentNumber: 'PAY-2024-001',
        amount: 12000,
        status: 'completed',
        paymentDate: '2024-01-30',
        invoiceNumber: 'INV-2024-003',
        description: 'Pago por Equipos de Oficina',
        method: 'Transferencia Bancaria'
      },
      {
        id: 2,
        paymentNumber: 'PAY-2024-002',
        amount: 8500,
        status: 'completed',
        paymentDate: '2024-01-25',
        invoiceNumber: 'INV-2023-014',
        description: 'Pago por Servicios de Limpieza',
        method: 'Cheque'
      }
    ],
    pending: [
      {
        id: 3,
        paymentNumber: 'PAY-2024-003',
        amount: 25000,
        status: 'scheduled',
        scheduledDate: '2024-02-15',
        invoiceNumber: 'INV-2024-001',
        description: 'Pago por Materiales de Construcción',
        method: 'Transferencia Bancaria'
      },
      {
        id: 4,
        paymentNumber: 'PAY-2024-004',
        amount: 18000,
        status: 'scheduled',
        scheduledDate: '2024-02-10',
        invoiceNumber: 'INV-2024-002',
        description: 'Pago por Servicios de Mantenimiento',
        method: 'Transferencia Bancaria'
      }
    ],
    partial: [
      {
        id: 5,
        paymentNumber: 'PAY-2024-005',
        amount: 5000,
        status: 'partial',
        paymentDate: '2024-01-20',
        invoiceNumber: 'INV-2023-015',
        description: 'Pago Parcial por Servicios de Limpieza',
        method: 'Transferencia Bancaria',
        totalAmount: 8500,
        remainingAmount: 3500
      }
    ]
  };

  const ppdDocuments = [
    {
      id: 1,
      documentNumber: 'PPD-2024-001',
      amount: 12000,
      uploadDate: '2024-01-30',
      status: 'approved',
      description: 'Complemento de Pago por Equipos de Oficina'
    },
    {
      id: 2,
      documentNumber: 'PPD-2024-002',
      amount: 8500,
      uploadDate: '2024-01-25',
      status: 'pending',
      description: 'Complemento de Pago por Servicios de Limpieza'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'partial': return 'text-orange-600 bg-orange-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'scheduled': return 'Programado';
      case 'partial': return 'Parcial';
      case 'approved': return 'Aprobado';
      case 'pending': return 'Pendiente';
      default: return status;
    }
  };

  const PPDModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Subir Complemento de Pago (PPD)</h3>
          <button
            onClick={() => setShowPPDModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Documento
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Ej: PPD-2024-001"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Descripción del complemento de pago"
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
              Factura Relacionada
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option>Seleccionar factura</option>
              <option>INV-2024-001</option>
              <option>INV-2024-002</option>
              <option>INV-2024-003</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Archivo PPD
            </label>
            <input
              type="file"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              accept=".pdf,.xml"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowPPDModal(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary">
              Subir PPD
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
            Gestión de Pagos
          </h1>
          <p className="text-gray-600">
            Seguimiento de pagos y complementos de pago
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowPPDModal(true)}
        >
          Subir PPD
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{payments.received.length}</div>
            <div className="text-sm text-gray-600">Pagos Recibidos</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{payments.pending.length}</div>
            <div className="text-sm text-gray-600">Pagos Programados</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{payments.partial.length}</div>
            <div className="text-sm text-gray-600">Pagos Parciales</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              ${payments.received.reduce((sum, pay) => sum + pay.amount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Recibido</div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('received')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'received'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Recibidos ({payments.received.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pending'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Programados ({payments.pending.length})
          </button>
          <button
            onClick={() => setActiveTab('partial')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'partial'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Parciales ({payments.partial.length})
          </button>
        </nav>
      </div>

      {/* Pagos */}
      <div className="space-y-6">
        {payments[activeTab].map((payment) => (
          <Card key={payment.id}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {payment.paymentNumber}
                </h3>
                <p className="text-gray-700 mb-2">
                  {payment.description}
                </p>
                <div className="text-sm text-gray-600">
                  <p>Factura: {payment.invoiceNumber}</p>
                  <p>Método: {payment.method}</p>
                  {activeTab === 'received' && (
                    <p>Pagado: {new Date(payment.paymentDate).toLocaleDateString()}</p>
                  )}
                  {activeTab === 'pending' && (
                    <p>Programado: {new Date(payment.scheduledDate).toLocaleDateString()}</p>
                  )}
                  {activeTab === 'partial' && (
                    <>
                      <p>Pagado: {new Date(payment.paymentDate).toLocaleDateString()}</p>
                      <p>Monto Total: ${payment.totalAmount.toLocaleString()}</p>
                      <p>Pendiente: ${payment.remainingAmount.toLocaleString()}</p>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                  {getStatusText(payment.status)}
                </span>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    ${payment.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <Button variant="outline" size="sm">
                Ver Detalles
              </Button>
              <Button variant="outline" size="sm">
                Descargar Comprobante
              </Button>
            </div>
          </Card>
        ))}
        
        {payments[activeTab].length === 0 && (
          <Card>
            <div className="text-center py-8">
              <p className="text-gray-500">
                No hay pagos en esta categoría.
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Complementos de Pago */}
      <div className="mt-8">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Complementos de Pago (PPD)</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPPDModal(true)}
            >
              Subir PPD
            </Button>
          </div>
          
          <div className="space-y-4">
            {ppdDocuments.map((ppd) => (
              <div key={ppd.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{ppd.documentNumber}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ppd.status)}`}>
                    {getStatusText(ppd.status)}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{ppd.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>${ppd.amount.toLocaleString()}</span>
                  <span>Subido: {new Date(ppd.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Modal */}
      {showPPDModal && <PPDModal />}
    </div>
  );
};

export default Payments; 