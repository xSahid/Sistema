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
  rating?: number;
  notes?: string;
}

const QuotationManagementPage: React.FC = () => {
  const { user } = useAppContext();
  const [requests, setRequests] = useState<QuotationRequest[]>([]);
  const [responses, setResponses] = useState<QuotationResponse[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<QuotationRequest | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

  // Simular datos
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
        status: 'awarded',
        createdBy: 'Departamento de Compras',
        createdAt: '2024-01-22',
        budget: '$15,000 - $25,000',
        category: 'Servicios',
        priority: 'high'
      }
    ];

    const mockResponses: QuotationResponse[] = [
      {
        id: '1',
        requestId: '1',
        providerId: '1',
        providerName: 'Proveedor A',
        price: 6500,
        deliveryTime: '5 días hábiles',
        description: 'Suministro completo con entrega semanal y facturación mensual',
        status: 'pending',
        submittedAt: '2024-01-25',
        attachments: ['cotizacion_1.pdf', 'catalogo_productos.pdf'],
        rating: 4.5,
        notes: 'Proveedor confiable con buena experiencia'
      },
      {
        id: '2',
        requestId: '1',
        providerId: '2',
        providerName: 'Proveedor B',
        price: 7200,
        deliveryTime: '3 días hábiles',
        description: 'Suministro premium con entrega inmediata',
        status: 'pending',
        submittedAt: '2024-01-26',
        attachments: ['cotizacion_2.pdf'],
        rating: 4.2,
        notes: 'Precio alto pero entrega rápida'
      },
      {
        id: '3',
        requestId: '1',
        providerId: '3',
        providerName: 'Proveedor C',
        price: 5800,
        deliveryTime: '7 días hábiles',
        description: 'Suministro básico con precio competitivo',
        status: 'approved',
        submittedAt: '2024-01-27',
        attachments: ['cotizacion_3.pdf'],
        rating: 4.8,
        notes: 'Mejor relación precio-calidad'
      },
      {
        id: '4',
        requestId: '2',
        providerId: '4',
        providerName: 'Servicios de Limpieza Pro',
        price: 22000,
        deliveryTime: 'Inmediato',
        description: 'Servicio completo con personal capacitado y suministros incluidos',
        status: 'approved',
        submittedAt: '2024-01-28',
        attachments: ['cotizacion_limpieza.pdf'],
        rating: 4.6,
        notes: 'Servicio premium aprobado'
      }
    ];

    setTimeout(() => {
      setRequests(mockRequests);
      setResponses(mockResponses);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleApproveQuotation = (responseId: string) => {
    setResponses(prev => 
      prev.map(response => 
        response.id === responseId 
          ? { ...response, status: 'approved' as const }
          : response
      )
    );
  };

  const handleRejectQuotation = (responseId: string) => {
    setResponses(prev => 
      prev.map(response => 
        response.id === responseId 
          ? { ...response, status: 'rejected' as const }
          : response
      )
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { text: 'Pendiente', class: 'status-badge-yellow' },
      approved: { text: 'Aprobada', class: 'status-badge-green' },
      rejected: { text: 'Rechazada', class: 'status-badge-red' }
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

  const filteredResponses = responses.filter(response => {
    if (filter === 'all') return true;
    return response.status === filter;
  });

  const getResponsesForRequest = (requestId: string) => {
    return responses.filter(response => response.requestId === requestId);
  };

  if (isLoading) {
    return (
      <div className="management-page">
        <div className="management-page-header">
          <h1 className="management-page-title">📊 Gestión de Cotizaciones</h1>
          <p className="management-page-subtitle">
            Revisa, compara y aprueba las cotizaciones recibidas
          </p>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando cotizaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="management-page">
      <div className="management-page-header">
        <h1 className="management-page-title">📊 Gestión de Cotizaciones</h1>
        <p className="management-page-subtitle">
          Revisa, compara y aprueba las cotizaciones recibidas
        </p>
      </div>

      {/* Estadísticas */}
      <div className="quotation-stats">
        <div className="stat-card">
          <span className="stat-number">{responses.length}</span>
          <span className="stat-label">Total Cotizaciones</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{responses.filter(r => r.status === 'pending').length}</span>
          <span className="stat-label">Pendientes</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{responses.filter(r => r.status === 'approved').length}</span>
          <span className="stat-label">Aprobadas</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{requests.filter(r => r.status === 'awarded').length}</span>
          <span className="stat-label">Adjudicadas</span>
        </div>
      </div>

      {/* Filtros */}
      <div className="quotation-filters">
        <div className="filter-group">
          <label htmlFor="status-filter" className="filter-label">Filtrar por estado:</label>
          <select
            id="status-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todas las cotizaciones</option>
            <option value="pending">Pendientes</option>
            <option value="approved">Aprobadas</option>
            <option value="rejected">Rechazadas</option>
          </select>
        </div>
      </div>

      {/* Lista de solicitudes con cotizaciones */}
      <div className="quotation-requests-list">
        {requests.map((request) => {
          const requestResponses = getResponsesForRequest(request.id);
          
          return (
            <div key={request.id} className="request-with-quotations">
              <div className="request-summary">
                <div className="request-header">
                  <h3 className="request-title">{request.title}</h3>
                  <div className="request-badges">
                    {getPriorityBadge(request.priority)}
                    <span className={`status-badge ${request.status === 'awarded' ? 'status-badge-blue' : 'status-badge-green'}`}>
                      {request.status === 'awarded' ? 'Adjudicada' : 'Activa'}
                    </span>
                  </div>
                </div>
                <p className="request-description">{request.description}</p>
                <div className="request-meta">
                  <span>📅 Límite: {new Date(request.deadline).toLocaleDateString()}</span>
                  <span>💰 Presupuesto: {request.budget}</span>
                  <span>📋 {requestResponses.length} cotizaciones recibidas</span>
                </div>
              </div>

              {requestResponses.length > 0 && (
                <div className="quotations-section">
                  <h4>📊 Cotizaciones Recibidas</h4>
                  <div className="quotations-grid">
                    {requestResponses.map((response) => (
                      <div key={response.id} className="quotation-card">
                        <div className="quotation-header">
                          <h5 className="provider-name">{response.providerName}</h5>
                          {getStatusBadge(response.status)}
                        </div>
                        
                        <div className="quotation-details">
                          <div className="detail-row">
                            <span className="detail-label">💰 Precio:</span>
                            <span className="detail-value price">${response.price.toLocaleString()}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">⏰ Entrega:</span>
                            <span className="detail-value">{response.deliveryTime}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">📅 Enviada:</span>
                            <span className="detail-value">{new Date(response.submittedAt).toLocaleDateString()}</span>
                          </div>
                          {response.rating && (
                            <div className="detail-row">
                              <span className="detail-label">⭐ Rating:</span>
                              <span className="detail-value">{response.rating}/5</span>
                            </div>
                          )}
                        </div>

                        <div className="quotation-description">
                          <p>{response.description}</p>
                        </div>

                        {response.attachments.length > 0 && (
                          <div className="quotation-attachments">
                            <span className="attachments-label">📎 Adjuntos:</span>
                            <div className="attachments-list">
                              {response.attachments.map((attachment, index) => (
                                <span key={index} className="attachment-item">{attachment}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {response.notes && (
                          <div className="quotation-notes">
                            <span className="notes-label">📝 Notas:</span>
                            <p>{response.notes}</p>
                          </div>
                        )}

                        <div className="quotation-actions">
                          {response.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApproveQuotation(response.id)}
                                className="btn btn-success btn-sm"
                              >
                                ✅ Aprobar
                              </button>
                              <button
                                onClick={() => handleRejectQuotation(response.id)}
                                className="btn btn-danger btn-sm"
                              >
                                ❌ Rechazar
                              </button>
                            </>
                          )}
                          {response.status === 'approved' && (
                            <span className="approved-badge">✅ Aprobada</span>
                          )}
                          {response.status === 'rejected' && (
                            <span className="rejected-badge">❌ Rechazada</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {requestResponses.length > 1 && (
                    <div className="comparison-section">
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowComparison(true);
                        }}
                        className="btn btn-primary"
                      >
                        📊 Comparar Cotizaciones
                      </button>
                    </div>
                  )}
                </div>
              )}

              {requestResponses.length === 0 && (
                <div className="no-quotations">
                  <span className="no-quotations-icon">📋</span>
                  <p>No se han recibido cotizaciones para esta solicitud</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal de Comparación */}
      {showComparison && selectedRequest && (
        <QuotationComparisonModal
          request={selectedRequest}
          responses={getResponsesForRequest(selectedRequest.id)}
          onClose={() => {
            setShowComparison(false);
            setSelectedRequest(null);
          }}
          onApprove={handleApproveQuotation}
          onReject={handleRejectQuotation}
        />
      )}
    </div>
  );
};

// Modal de Comparación de Cotizaciones
interface QuotationComparisonModalProps {
  request: QuotationRequest;
  responses: QuotationResponse[];
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const QuotationComparisonModal: React.FC<QuotationComparisonModalProps> = ({
  request,
  responses,
  onClose,
  onApprove,
  onReject
}) => {
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);

  const sortedResponses = [...responses].sort((a, b) => a.price - b.price);

  return (
    <div className="modal-overlay">
      <div className="modal-content comparison-modal">
        <div className="modal-header">
          <h2>📊 Comparación de Cotizaciones</h2>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>

        <div className="modal-body">
          <div className="request-summary">
            <h3>{request.title}</h3>
            <p>{request.description}</p>
          </div>

          <div className="comparison-table">
            <table className="comparison-table-content">
              <thead>
                <tr>
                  <th>Proveedor</th>
                  <th>Precio</th>
                  <th>Entrega</th>
                  <th>Rating</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sortedResponses.map((response) => (
                  <tr key={response.id} className={selectedResponse === response.id ? 'selected-row' : ''}>
                    <td>
                      <div className="provider-info">
                        <strong>{response.providerName}</strong>
                        <small>{response.description.substring(0, 50)}...</small>
                      </div>
                    </td>
                    <td className="price-cell">
                      <strong>${response.price.toLocaleString()}</strong>
                    </td>
                    <td>{response.deliveryTime}</td>
                    <td>
                      {response.rating ? (
                        <div className="rating">
                          <span className="stars">{'⭐'.repeat(Math.floor(response.rating))}</span>
                          <span className="rating-value">{response.rating}/5</span>
                        </div>
                      ) : (
                        <span className="no-rating">N/A</span>
                      )}
                    </td>
                    <td>{getStatusBadge(response.status)}</td>
                    <td>
                      <div className="action-buttons">
                        {response.status === 'pending' && (
                          <>
                            <button
                              onClick={() => onApprove(response.id)}
                              className="btn btn-success btn-sm"
                              title="Aprobar"
                            >
                              ✅
                            </button>
                            <button
                              onClick={() => onReject(response.id)}
                              className="btn btn-danger btn-sm"
                              title="Rechazar"
                            >
                              ❌
                            </button>
                          </>
                        )}
                        {response.status === 'approved' && (
                          <span className="approved-badge">✅ Aprobada</span>
                        )}
                        {response.status === 'rejected' && (
                          <span className="rejected-badge">❌ Rechazada</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="comparison-summary">
            <h4>📈 Resumen de Comparación</h4>
            <div className="summary-stats">
              <div className="summary-stat">
                <span className="stat-label">Precio más bajo:</span>
                <span className="stat-value">${Math.min(...responses.map(r => r.price)).toLocaleString()}</span>
              </div>
              <div className="summary-stat">
                <span className="stat-label">Precio más alto:</span>
                <span className="stat-value">${Math.max(...responses.map(r => r.price)).toLocaleString()}</span>
              </div>
              <div className="summary-stat">
                <span className="stat-label">Precio promedio:</span>
                <span className="stat-value">${(responses.reduce((sum, r) => sum + r.price, 0) / responses.length).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-secondary">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotationManagementPage; 