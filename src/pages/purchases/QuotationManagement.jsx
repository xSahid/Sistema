import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

const QuotationManagement = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedQuotations, setSelectedQuotations] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const [quotations] = useState([
    {
      id: 'Q-001',
      provider: 'Proveedor ABC',
      amount: 15000,
      status: 'pending',
      date: '2024-01-15',
      description: 'Suministro de materiales de construcción',
      deliveryTime: '15 días',
      paymentTerms: '30 días',
      quality: 'Alta',
      documents: ['Cotización.pdf', 'Catálogo.pdf']
    },
    {
      id: 'Q-002',
      provider: 'Proveedor XYZ',
      amount: 12500,
      status: 'pending',
      date: '2024-01-14',
      description: 'Suministro de materiales de construcción',
      deliveryTime: '10 días',
      paymentTerms: '45 días',
      quality: 'Media',
      documents: ['Cotización.pdf']
    },
    {
      id: 'Q-003',
      provider: 'Proveedor DEF',
      amount: 18000,
      status: 'pending',
      date: '2024-01-13',
      description: 'Suministro de materiales de construcción',
      deliveryTime: '20 días',
      paymentTerms: '30 días',
      quality: 'Alta',
      documents: ['Cotización.pdf', 'Certificados.pdf']
    },
    {
      id: 'Q-004',
      provider: 'Proveedor GHI',
      amount: 8500,
      status: 'approved',
      date: '2024-01-10',
      description: 'Herramientas especializadas',
      deliveryTime: '5 días',
      paymentTerms: '30 días',
      quality: 'Alta',
      documents: ['Cotización.pdf']
    },
    {
      id: 'Q-005',
      provider: 'Proveedor JKL',
      amount: 22000,
      status: 'rejected',
      date: '2024-01-08',
      description: 'Equipos de seguridad',
      deliveryTime: '25 días',
      paymentTerms: '60 días',
      quality: 'Media',
      documents: ['Cotización.pdf']
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

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'Alta': return 'text-green-600 bg-green-100';
      case 'Media': return 'text-yellow-600 bg-yellow-100';
      case 'Baja': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredQuotations = quotations.filter(q => q.status === activeTab);

  const handleQuotationSelect = (quotationId) => {
    if (selectedQuotations.includes(quotationId)) {
      setSelectedQuotations(selectedQuotations.filter(id => id !== quotationId));
    } else {
      setSelectedQuotations([...selectedQuotations, quotationId]);
    }
  };

  const handleApprove = (quotationId) => {
    // Aquí se implementaría la lógica para aprobar la cotización
    console.log('Aprobando cotización:', quotationId);
  };

  const handleReject = (quotationId) => {
    // Aquí se implementaría la lógica para rechazar la cotización
    console.log('Rechazando cotización:', quotationId);
  };

  const handleCompare = () => {
    if (selectedQuotations.length >= 2) {
      setShowComparison(true);
    }
  };

  const selectedQuotationsData = quotations.filter(q => selectedQuotations.includes(q.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gestión de Cotizaciones
        </h1>
        <p className="text-gray-600">
          Revisa, compara y aprueba cotizaciones de proveedores
        </p>
      </div>

      {/* Filtros y Acciones */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'pending'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Pendientes ({quotations.filter(q => q.status === 'pending').length})
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'approved'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Aprobadas ({quotations.filter(q => q.status === 'approved').length})
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'rejected'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Rechazadas ({quotations.filter(q => q.status === 'rejected').length})
            </button>
          </div>

          {activeTab === 'pending' && selectedQuotations.length > 0 && (
            <div className="flex space-x-2">
              <Button
                variant="primary"
                onClick={handleCompare}
                disabled={selectedQuotations.length < 2}
              >
                Comparar ({selectedQuotations.length})
              </Button>
              <Button variant="outline" onClick={() => setSelectedQuotations([])}>
                Limpiar Selección
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Comparación de Cotizaciones */}
      {showComparison && selectedQuotationsData.length >= 2 && (
        <div className="mb-8">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Comparación de Cotizaciones
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowComparison(false)}
              >
                Cerrar
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Criterio
                    </th>
                    {selectedQuotationsData.map((quotation) => (
                      <th key={quotation.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {quotation.provider}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Monto
                    </td>
                    {selectedQuotationsData.map((quotation) => (
                      <td key={quotation.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${quotation.amount.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Tiempo de Entrega
                    </td>
                    {selectedQuotationsData.map((quotation) => (
                      <td key={quotation.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {quotation.deliveryTime}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Condiciones de Pago
                    </td>
                    {selectedQuotationsData.map((quotation) => (
                      <td key={quotation.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {quotation.paymentTerms}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Calidad
                    </td>
                    {selectedQuotationsData.map((quotation) => (
                      <td key={quotation.id} className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getQualityColor(quotation.quality)}`}>
                          {quotation.quality}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Lista de Cotizaciones */}
      <div className="space-y-4">
        {filteredQuotations.map((quotation) => (
          <Card key={quotation.id}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {quotation.provider}
                    </h3>
                    <p className="text-sm text-gray-600">{quotation.description}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(quotation.status)}`}>
                    {getStatusText(quotation.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Monto</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${quotation.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Entrega</p>
                    <p className="text-sm text-gray-900">{quotation.deliveryTime}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pago</p>
                    <p className="text-sm text-gray-900">{quotation.paymentTerms}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Calidad</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getQualityColor(quotation.quality)}`}>
                      {quotation.quality}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Documentos</p>
                    <div className="flex space-x-2">
                      {quotation.documents.map((doc, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Fecha</p>
                    <p className="text-sm text-gray-900">{quotation.date}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                {activeTab === 'pending' && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedQuotations.includes(quotation.id)}
                      onChange={() => handleQuotationSelect(quotation.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Comparar</span>
                  </div>
                )}
                
                {activeTab === 'pending' && (
                  <div className="flex space-x-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleApprove(quotation.id)}
                    >
                      Aprobar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleReject(quotation.id)}
                    >
                      Rechazar
                    </Button>
                  </div>
                )}

                <Button variant="outline" size="sm">
                  Ver Detalles
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredQuotations.length === 0 && (
        <Card>
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay cotizaciones</h3>
            <p className="mt-1 text-sm text-gray-500">
              No se encontraron cotizaciones con el estado seleccionado.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default QuotationManagement; 