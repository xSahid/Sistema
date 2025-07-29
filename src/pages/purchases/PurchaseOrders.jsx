import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

const PurchaseOrders = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  const [approvedQuotations] = useState([
    {
      id: 'Q-004',
      provider: 'Proveedor GHI',
      amount: 8500,
      description: 'Herramientas especializadas',
      deliveryTime: '5 días',
      paymentTerms: '30 días',
      quality: 'Alta',
      date: '2024-01-10'
    },
    {
      id: 'Q-006',
      provider: 'Proveedor MNO',
      amount: 12500,
      description: 'Materiales de oficina',
      deliveryTime: '3 días',
      paymentTerms: '45 días',
      quality: 'Media',
      date: '2024-01-12'
    },
    {
      id: 'Q-007',
      provider: 'Proveedor PQR',
      amount: 32000,
      description: 'Equipos de cómputo',
      deliveryTime: '10 días',
      paymentTerms: '30 días',
      quality: 'Alta',
      date: '2024-01-11'
    }
  ]);

  const [purchaseOrders] = useState([
    {
      id: 'PO-001',
      quotationId: 'Q-004',
      provider: 'Proveedor GHI',
      amount: 8500,
      status: 'pending',
      date: '2024-01-15',
      deliveryDate: '2024-01-20',
      description: 'Herramientas especializadas',
      items: [
        { name: 'Taladro eléctrico', quantity: 2, unitPrice: 2500 },
        { name: 'Sierra circular', quantity: 1, unitPrice: 3500 }
      ]
    },
    {
      id: 'PO-002',
      quotationId: 'Q-006',
      provider: 'Proveedor MNO',
      amount: 12500,
      status: 'approved',
      date: '2024-01-14',
      deliveryDate: '2024-01-17',
      description: 'Materiales de oficina',
      items: [
        { name: 'Papel bond', quantity: 50, unitPrice: 150 },
        { name: 'Tinta de impresora', quantity: 10, unitPrice: 800 },
        { name: 'Carpetas', quantity: 100, unitPrice: 25 }
      ]
    },
    {
      id: 'PO-003',
      quotationId: 'Q-007',
      provider: 'Proveedor PQR',
      amount: 32000,
      status: 'delivered',
      date: '2024-01-13',
      deliveryDate: '2024-01-23',
      description: 'Equipos de cómputo',
      items: [
        { name: 'Laptop Dell', quantity: 2, unitPrice: 15000 },
        { name: 'Monitor 24"', quantity: 1, unitPrice: 2000 }
      ]
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-blue-600 bg-blue-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'approved': return 'Aprobada';
      case 'delivered': return 'Entregada';
      case 'cancelled': return 'Cancelada';
      default: return 'Desconocido';
    }
  };

  const filteredOrders = purchaseOrders.filter(order => order.status === activeTab);

  const handleCreateOrder = (quotation) => {
    setSelectedQuotation(quotation);
    setShowCreateModal(true);
  };

  const handleConfirmOrder = () => {
    // Aquí se implementaría la lógica para crear la orden de compra
    console.log('Creando orden de compra para:', selectedQuotation);
    setShowCreateModal(false);
    setSelectedQuotation(null);
  };

  const handleApproveOrder = (orderId) => {
    // Aquí se implementaría la lógica para aprobar la orden
    console.log('Aprobando orden:', orderId);
  };

  const handleCancelOrder = (orderId) => {
    // Aquí se implementaría la lógica para cancelar la orden
    console.log('Cancelando orden:', orderId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Órdenes de Compra
        </h1>
        <p className="text-gray-600">
          Gestiona órdenes de compra basadas en cotizaciones aprobadas
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
            Pendientes ({purchaseOrders.filter(o => o.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'approved'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Aprobadas ({purchaseOrders.filter(o => o.status === 'approved').length})
          </button>
          <button
            onClick={() => setActiveTab('delivered')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'delivered'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Entregadas ({purchaseOrders.filter(o => o.status === 'delivered').length})
          </button>
        </div>
      </div>

      {/* Cotizaciones Aprobadas para Crear Órdenes */}
      {activeTab === 'pending' && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Cotizaciones Aprobadas - Crear Órdenes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {approvedQuotations.map((quotation) => (
              <Card key={quotation.id}>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {quotation.provider}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {quotation.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">Monto:</span>
                      <p className="text-lg font-semibold text-gray-900">
                        ${quotation.amount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Entrega:</span>
                      <p className="text-gray-900">{quotation.deliveryTime}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Pago:</span>
                      <p className="text-gray-900">{quotation.paymentTerms}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Calidad:</span>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {quotation.quality}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleCreateOrder(quotation)}
                  className="w-full"
                >
                  Crear Orden de Compra
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Lista de Órdenes de Compra */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Órdenes de Compra
        </h2>
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {order.id} - {order.provider}
                      </h3>
                      <p className="text-sm text-gray-600">{order.description}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Monto Total</p>
                      <p className="text-lg font-semibold text-gray-900">
                        ${order.amount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Fecha de Orden</p>
                      <p className="text-sm text-gray-900">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Fecha de Entrega</p>
                      <p className="text-sm text-gray-900">{order.deliveryDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Cotización</p>
                      <p className="text-sm text-gray-900">{order.quotationId}</p>
                    </div>
                  </div>

                  {/* Items de la Orden */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500 mb-2">Items:</p>
                    <div className="bg-gray-50 rounded-lg p-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-1">
                          <span className="text-sm text-gray-900">
                            {item.name} x{item.quantity}
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            ${item.unitPrice.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  {order.status === 'pending' && (
                    <div className="flex space-x-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleApproveOrder(order.id)}
                      >
                        Aprobar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  )}
                  
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                  <Button variant="outline" size="sm">
                    Descargar PDF
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card>
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay órdenes</h3>
              <p className="mt-1 text-sm text-gray-500">
                No se encontraron órdenes de compra con el estado seleccionado.
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Modal para Crear Orden de Compra */}
      {showCreateModal && selectedQuotation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Crear Orden de Compra
              </h3>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">Proveedor</p>
                <p className="text-gray-900">{selectedQuotation.provider}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">Descripción</p>
                <p className="text-gray-900">{selectedQuotation.description}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">Monto</p>
                <p className="text-lg font-semibold text-gray-900">
                  ${selectedQuotation.amount.toLocaleString()}
                </p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">Tiempo de Entrega</p>
                <p className="text-gray-900">{selectedQuotation.deliveryTime}</p>
              </div>
              
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-500">Condiciones de Pago</p>
                <p className="text-gray-900">{selectedQuotation.paymentTerms}</p>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="primary"
                  onClick={handleConfirmOrder}
                  className="flex-1"
                >
                  Confirmar Orden
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseOrders; 