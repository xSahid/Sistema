import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useAppContext } from '../../context/AppContext';

const Quotations = () => {
  const { user } = useAppContext();
  const [activeTab, setActiveTab] = useState('pending');
  const [showNewQuotationModal, setShowNewQuotationModal] = useState(false);

  const quotations = {
    pending: [
      {
        id: 1,
        requestTitle: 'Suministro de Materiales de Construcción',
        requestId: 'REQ-2024-001',
        amount: 25000,
        status: 'pending',
        dueDate: '2024-01-20',
        description: 'Se requiere cotización para suministro de materiales de construcción para proyecto residencial.',
        requirements: [
          'Cemento Portland',
          'Varilla de construcción',
          'Arena y grava',
          'Bloques de concreto'
        ]
      },
      {
        id: 2,
        requestTitle: 'Equipos de Seguridad Industrial',
        requestId: 'REQ-2024-002',
        amount: 15000,
        status: 'pending',
        dueDate: '2024-01-18',
        description: 'Cotización para equipos de seguridad industrial para planta manufacturera.',
        requirements: [
          'Cascos de seguridad',
          'Guantes de trabajo',
          'Gafas de protección',
          'Calzado de seguridad'
        ]
      }
    ],
    submitted: [
      {
        id: 3,
        requestTitle: 'Servicios de Mantenimiento Industrial',
        requestId: 'REQ-2024-003',
        amount: 18000,
        status: 'submitted',
        submittedDate: '2024-01-10',
        description: 'Servicios de mantenimiento preventivo y correctivo para equipos industriales.',
        requirements: [
          'Mantenimiento preventivo mensual',
          'Reparaciones de emergencia',
          'Cambio de filtros y lubricantes',
          'Inspecciones técnicas'
        ]
      }
    ],
    approved: [
      {
        id: 4,
        requestTitle: 'Suministro de Equipos de Oficina',
        requestId: 'REQ-2024-004',
        amount: 12000,
        status: 'approved',
        approvedDate: '2024-01-05',
        description: 'Equipos de oficina para nueva sucursal.',
        requirements: [
          'Escritorios y sillas',
          'Equipos de cómputo',
          'Impresoras y escáneres',
          'Mobiliario de almacenamiento'
        ]
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'submitted': return 'text-blue-600 bg-blue-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendiente de Respuesta';
      case 'submitted': return 'Enviada';
      case 'approved': return 'Aprobada';
      case 'rejected': return 'Rechazada';
      default: return status;
    }
  };

  const NewQuotationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Nueva Cotización</h3>
          <button
            onClick={() => setShowNewQuotationModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título de la Cotización
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Ingresa el título de tu cotización"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Describe los servicios o productos que ofreces"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
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
                Moneda
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>MXN</option>
                <option>USD</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Archivos de Cotización
            </label>
            <input
              type="file"
              multiple
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowNewQuotationModal(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary">
              Enviar Cotización
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
            Gestión de Cotizaciones
          </h1>
          <p className="text-gray-600">
            Gestiona tus cotizaciones y respuestas a solicitudes
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowNewQuotationModal(true)}
        >
          Nueva Cotización
        </Button>
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
            Pendientes ({quotations.pending.length})
          </button>
          <button
            onClick={() => setActiveTab('submitted')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'submitted'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Enviadas ({quotations.submitted.length})
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'approved'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Aprobadas ({quotations.approved.length})
          </button>
        </nav>
      </div>

      {/* Cotizaciones */}
      <div className="space-y-6">
        {quotations[activeTab].map((quotation) => (
          <Card key={quotation.id}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {quotation.requestTitle}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  ID: {quotation.requestId}
                </p>
                <p className="text-gray-700 mb-4">
                  {quotation.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Requerimientos:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {quotation.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(quotation.status)}`}>
                  {getStatusText(quotation.status)}
                </span>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    ${quotation.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {activeTab === 'pending' && `Vence: ${new Date(quotation.dueDate).toLocaleDateString()}`}
                    {activeTab === 'submitted' && `Enviada: ${new Date(quotation.submittedDate).toLocaleDateString()}`}
                    {activeTab === 'approved' && `Aprobada: ${new Date(quotation.approvedDate).toLocaleDateString()}`}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              {activeTab === 'pending' && (
                <>
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                  <Button variant="primary" size="sm">
                    Responder Cotización
                  </Button>
                </>
              )}
              {activeTab === 'submitted' && (
                <>
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </>
              )}
              {activeTab === 'approved' && (
                <>
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                  <Button variant="primary" size="sm">
                    Generar Factura
                  </Button>
                </>
              )}
            </div>
          </Card>
        ))}
        
        {quotations[activeTab].length === 0 && (
          <Card>
            <div className="text-center py-8">
              <p className="text-gray-500">
                No hay cotizaciones en esta categoría.
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Modal */}
      {showNewQuotationModal && <NewQuotationModal />}
    </div>
  );
};

export default Quotations; 