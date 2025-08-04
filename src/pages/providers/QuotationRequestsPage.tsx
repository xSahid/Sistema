import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

interface QuotationRequest {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  deadline: string;
  status: 'open' | 'closed' | 'awarded';
  createdBy: string;
  createdAt: string;
  budget?: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
}

interface QuotationResponse {
  id: string;
  requestId: string;
  providerId: string;
  providerName: string;
  price: number;
  deliveryTime: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  attachments: string[];
}

const QuotationRequestsPage: React.FC = () => {
  const { user } = useAppContext();
  const [requests, setRequests] = useState<QuotationRequest[]>([]);
  const [responses, setResponses] = useState<QuotationResponse[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<QuotationRequest | null>(null);
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simular datos de solicitudes de cotización
  useEffect(() => {
    const mockRequests: QuotationRequest[] = [
      {
        id: '1',
        title: 'Suministro de Materiales de Oficina',
        description: 'Se requiere suministro mensual de materiales de oficina para 50 empleados',
        requirements: ['Papel A4', 'Tinta para impresoras', 'Utensilios de escritura'],
        deadline: '2024-02-15',
        status: 'open',
        createdBy: 'Departamento de Compras',
        createdAt: '2024-01-20',
        budget: '$5,000 - $8,000',
        category: 'Suministros',
        priority: 'medium'
      },
      {
        id: '2',
        title: 'Servicio de Limpieza Corporativa',
        description: 'Servicio de limpieza para oficinas corporativas de 200m²',
        requirements: ['Limpieza diaria', 'Suministros incluidos', 'Personal capacitado'],
        deadline: '2024-02-20',
        status: 'open',
        createdBy: 'Departamento de Compras',
        createdAt: '2024-01-22',
        budget: '$15,000 - $25,000',
        category: 'Servicios',
        priority: 'high'
      },
      {
        id: '3',
        title: 'Equipos de Computación',
        description: 'Adquisición de 20 laptops para personal de ventas',
        requirements: ['Laptop i5 o superior', '8GB RAM mínimo', 'Garantía de 2 años'],
        deadline: '2024-02-10',
        status: 'closed',
        createdBy: 'Departamento de Compras',
        createdAt: '2024-01-18',
        budget: '$40,000 - $60,000',
        category: 'Tecnología',
        priority: 'high'
      }
    ];

    const mockResponses: QuotationResponse[] = [
      {
        id: '1',
        requestId: '1',
        providerId: user?.id || '1',
        providerName: user?.name || 'Proveedor Ejemplo',
        price: 6500,
        deliveryTime: '5 días hábiles',
        description: 'Suministro completo con entrega semanal y facturación mensual',
        status: 'pending',
        submittedAt: '2024-01-25',
        attachments: ['cotizacion_1.pdf', 'catalogo_productos.pdf']
      }
    ];

    setTimeout(() => {
      setRequests(mockRequests);
      setResponses(mockResponses);
      setIsLoading(false);
    }, 1000);
  }, [user]);

  const handleSubmitResponse = (formData: any) => {
    const newResponse: QuotationResponse = {
      id: Date.now().toString(),
      requestId: selectedRequest!.id,
      providerId: user?.id || '1',
      providerName: user?.name || 'Proveedor Ejemplo',
      price: parseFloat(formData.price),
      deliveryTime: formData.deliveryTime,
      description: formData.description,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      attachments: formData.attachments || []
    };

    setResponses(prev => [...prev, newResponse]);
    setShowResponseForm(false);
    setSelectedRequest(null);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      open: { text: 'Abierta', class: 'status-badge-green' },
      closed: { text: 'Cerrada', class: 'status-badge-red' },
      awarded: { text: 'Adjudicada', class: 'status-badge-blue' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { text: 'Baja', class: 'priority-badge-green' },
      medium: { text: 'Media', class: 'priority-badge-yellow' },
      high: { text: 'Alta', class: 'priority-badge-red' }
    };
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return <span className={`priority-badge ${config.class}`}>{config.text}</span>;
  };

  if (isLoading) {
    return (
      <div className="management-page">
        <div className="management-page-header">
          <h1 className="management-page-title">📋 Solicitudes de Cotización</h1>
          <p className="management-page-subtitle">
            Revisa y responde a las solicitudes de cotización disponibles
          </p>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando solicitudes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="management-page">
      <div className="management-page-header">
        <h1 className="management-page-title">📋 Solicitudes de Cotización</h1>
        <p className="management-page-subtitle">
          Revisa y responde a las solicitudes de cotización disponibles
        </p>
      </div>

      <div className="quotation-requests-container">
        <div className="requests-grid">
          {requests.map((request) => {
            const hasResponse = responses.some(r => r.requestId === request.id);
            
            return (
              <div key={request.id} className="request-card">
                <div className="request-header">
                  <div className="request-title-section">
                    <h3 className="request-title">{request.title}</h3>
                    <div className="request-badges">
                      {getStatusBadge(request.status)}
                      {getPriorityBadge(request.priority)}
                    </div>
                  </div>
                  <div className="request-category">{request.category}</div>
                </div>

                <div className="request-content">
                  <p className="request-description">{request.description}</p>
                  
                  <div className="request-details">
                    <div className="detail-item">
                      <span className="detail-label">📅 Fecha límite:</span>
                      <span className="detail-value">{new Date(request.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">💰 Presupuesto:</span>
                      <span className="detail-value">{request.budget}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">📝 Creada por:</span>
                      <span className="detail-value">{request.createdBy}</span>
                    </div>
                  </div>

                  <div className="request-requirements">
                    <h4>📋 Requisitos:</h4>
                    <ul className="requirements-list">
                      {request.requirements.map((req, index) => (
                        <li key={index} className="requirement-item">{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="request-actions">
                  {request.status === 'open' && !hasResponse && (
                    <button
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowResponseForm(true);
                      }}
                      className="btn btn-primary"
                    >
                      📝 Responder Cotización
                    </button>
                  )}
                  {hasResponse && (
                    <div className="response-status">
                      <span className="response-badge">✅ Cotización enviada</span>
                    </div>
                  )}
                  {request.status === 'closed' && (
                    <span className="closed-badge">⏰ Cerrada</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {requests.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No hay solicitudes disponibles</h3>
            <p>No hay solicitudes de cotización activas en este momento.</p>
          </div>
        )}
      </div>

      {/* Modal de Respuesta */}
      {showResponseForm && selectedRequest && (
        <QuotationResponseForm
          request={selectedRequest}
          onSubmit={handleSubmitResponse}
          onClose={() => {
            setShowResponseForm(false);
            setSelectedRequest(null);
          }}
        />
      )}
    </div>
  );
};

// Componente del formulario de respuesta
interface QuotationResponseFormProps {
  request: QuotationRequest;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const QuotationResponseForm: React.FC<QuotationResponseFormProps> = ({
  request,
  onSubmit,
  onClose
}) => {
  const [formData, setFormData] = useState({
    price: '',
    deliveryTime: '',
    description: '',
    attachments: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content quotation-response-modal">
        <div className="modal-header">
          <h2>📝 Responder Cotización</h2>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>

        <div className="modal-body">
          <div className="request-summary">
            <h3>{request.title}</h3>
            <p>{request.description}</p>
          </div>

          <form onSubmit={handleSubmit} className="response-form">
            <div className="form-group">
              <label htmlFor="price">💰 Precio (USD)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label htmlFor="deliveryTime">⏰ Tiempo de Entrega</label>
              <input
                type="text"
                id="deliveryTime"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleInputChange}
                required
                placeholder="Ej: 5 días hábiles"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">📝 Descripción de la Propuesta</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Describe tu propuesta, incluyendo detalles de entrega, garantías, etc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="attachments">📎 Adjuntar Documentos</label>
              <input
                type="file"
                id="attachments"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx"
              />
              <small>Formatos permitidos: PDF, DOC, XLS (máx. 5MB cada uno)</small>
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Cotización'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotationRequestsPage; 