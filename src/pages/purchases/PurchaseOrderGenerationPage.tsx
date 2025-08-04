import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

interface ApprovedQuotation {
  id: string;
  requestId: string;
  requestTitle: string;
  providerId: string;
  providerName: string;
  price: number;
  deliveryTime: string;
  description: string;
  approvedAt: string;
  approvedBy: string;
}

interface PurchaseOrder {
  id: string;
  quotationId: string;
  orderNumber: string;
  providerId: string;
  providerName: string;
  requestTitle: string;
  totalAmount: number;
  deliveryDate: string;
  status: 'draft' | 'sent' | 'confirmed' | 'delivered';
  createdAt: string;
  sentAt?: string;
  confirmedAt?: string;
  deliveredAt?: string;
}

const PurchaseOrderGenerationPage: React.FC = () => {
  const { user } = useAppContext();
  const [approvedQuotations, setApprovedQuotations] = useState<ApprovedQuotation[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [selectedQuotation, setSelectedQuotation] = useState<ApprovedQuotation | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simular datos
  useEffect(() => {
    const mockApprovedQuotations: ApprovedQuotation[] = [
      {
        id: '1',
        requestId: '1',
        requestTitle: 'Suministro de Materiales de Oficina',
        providerId: '3',
        providerName: 'Proveedor C',
        price: 5800,
        deliveryTime: '7 días hábiles',
        description: 'Suministro básico con precio competitivo',
        approvedAt: '2024-01-28T10:30:00Z',
        approvedBy: 'Juan Pérez'
      },
      {
        id: '2',
        requestId: '2',
        requestTitle: 'Servicio de Limpieza Corporativa',
        providerId: '4',
        providerName: 'Servicios de Limpieza Pro',
        price: 22000,
        deliveryTime: 'Inmediato',
        description: 'Servicio completo con personal capacitado y suministros incluidos',
        approvedAt: '2024-01-29T14:15:00Z',
        approvedBy: 'María García'
      }
    ];

    const mockPurchaseOrders: PurchaseOrder[] = [
      {
        id: '1',
        quotationId: '1',
        orderNumber: 'OC-2024-001',
        providerId: '3',
        providerName: 'Proveedor C',
        requestTitle: 'Suministro de Materiales de Oficina',
        totalAmount: 5800,
        deliveryDate: '2024-02-15',
        status: 'sent',
        createdAt: '2024-01-28T11:00:00Z',
        sentAt: '2024-01-28T11:00:00Z'
      }
    ];

    setTimeout(() => {
      setApprovedQuotations(mockApprovedQuotations);
      setPurchaseOrders(mockPurchaseOrders);
      setIsLoading(false);
    }, 1000);
  }, []);

  const generateOrderNumber = () => {
    const year = new Date().getFullYear();
    const orderCount = purchaseOrders.length + 1;
    return `OC-${year}-${orderCount.toString().padStart(3, '0')}`;
  };

  const handleGenerateOrder = (quotation: ApprovedQuotation) => {
    const newOrder: PurchaseOrder = {
      id: Date.now().toString(),
      quotationId: quotation.id,
      orderNumber: generateOrderNumber(),
      providerId: quotation.providerId,
      providerName: quotation.providerName,
      requestTitle: quotation.requestTitle,
      totalAmount: quotation.price,
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 días
      status: 'draft',
      createdAt: new Date().toISOString()
    };

    setPurchaseOrders(prev => [...prev, newOrder]);
    setShowOrderForm(false);
    setSelectedQuotation(null);
  };

  const handleSendOrder = (orderId: string) => {
    setPurchaseOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              status: 'sent' as const,
              sentAt: new Date().toISOString()
            }
          : order
      )
    );
  };

  const handleConfirmOrder = (orderId: string) => {
    setPurchaseOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              status: 'confirmed' as const,
              confirmedAt: new Date().toISOString()
            }
          : order
      )
    );
  };

  const handleMarkDelivered = (orderId: string) => {
    setPurchaseOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              status: 'delivered' as const,
              deliveredAt: new Date().toISOString()
            }
          : order
      )
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { text: 'Borrador', class: 'status-badge-gray' },
      sent: { text: 'Enviada', class: 'status-badge-blue' },
      confirmed: { text: 'Confirmada', class: 'status-badge-yellow' },
      delivered: { text: 'Entregada', class: 'status-badge-green' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="management-page">
        <div className="management-page-header">
          <h1 className="management-page-title">📦 Generación de Órdenes de Compra</h1>
          <p className="management-page-subtitle">
            Genera órdenes de compra a partir de cotizaciones aprobadas
          </p>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando cotizaciones aprobadas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="management-page">
      <div className="management-page-header">
        <h1 className="management-page-title">📦 Generación de Órdenes de Compra</h1>
        <p className="management-page-subtitle">
          Genera órdenes de compra a partir de cotizaciones aprobadas
        </p>
      </div>

      {/* Estadísticas */}
      <div className="purchase-order-stats">
        <div className="stat-card">
          <span className="stat-number">{approvedQuotations.length}</span>
          <span className="stat-label">Cotizaciones Aprobadas</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{purchaseOrders.length}</span>
          <span className="stat-label">Órdenes Generadas</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{purchaseOrders.filter(o => o.status === 'sent').length}</span>
          <span className="stat-label">Órdenes Enviadas</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{purchaseOrders.filter(o => o.status === 'delivered').length}</span>
          <span className="stat-label">Entregadas</span>
        </div>
      </div>

      {/* Cotizaciones Aprobadas */}
      <div className="approved-quotations-section">
        <h2>📋 Cotizaciones Aprobadas Pendientes de Orden</h2>
        <div className="quotations-grid">
          {approvedQuotations
            .filter(quotation => !purchaseOrders.some(order => order.quotationId === quotation.id))
            .map((quotation) => (
              <div key={quotation.id} className="quotation-card approved">
                <div className="quotation-header">
                  <h3 className="quotation-title">{quotation.requestTitle}</h3>
                  <span className="approved-badge">✅ Aprobada</span>
                </div>
                
                <div className="quotation-details">
                  <div className="detail-row">
                    <span className="detail-label">🏢 Proveedor:</span>
                    <span className="detail-value">{quotation.providerName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">💰 Precio:</span>
                    <span className="detail-value price">${quotation.price.toLocaleString()}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">⏰ Entrega:</span>
                    <span className="detail-value">{quotation.deliveryTime}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">✅ Aprobada por:</span>
                    <span className="detail-value">{quotation.approvedBy}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">📅 Fecha de aprobación:</span>
                    <span className="detail-value">{formatDate(quotation.approvedAt)}</span>
                  </div>
                </div>

                <div className="quotation-description">
                  <p>{quotation.description}</p>
                </div>

                <div className="quotation-actions">
                  <button
                    onClick={() => {
                      setSelectedQuotation(quotation);
                      setShowOrderForm(true);
                    }}
                    className="btn btn-primary"
                  >
                    📦 Generar Orden de Compra
                  </button>
                </div>
              </div>
            ))}
        </div>

        {approvedQuotations.filter(q => !purchaseOrders.some(o => o.quotationId === q.id)).length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No hay cotizaciones pendientes</h3>
            <p>Todas las cotizaciones aprobadas ya tienen órdenes de compra generadas.</p>
          </div>
        )}
      </div>

      {/* Órdenes de Compra Generadas */}
      <div className="purchase-orders-section">
        <h2>📦 Órdenes de Compra Generadas</h2>
        <div className="orders-grid">
          {purchaseOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-title-section">
                  <h3 className="order-title">{order.requestTitle}</h3>
                  <div className="order-number">{order.orderNumber}</div>
                </div>
                {getStatusBadge(order.status)}
              </div>
              
              <div className="order-details">
                <div className="detail-row">
                  <span className="detail-label">🏢 Proveedor:</span>
                  <span className="detail-value">{order.providerName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">💰 Monto Total:</span>
                  <span className="detail-value price">${order.totalAmount.toLocaleString()}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">📅 Fecha de Entrega:</span>
                  <span className="detail-value">{formatDate(order.deliveryDate)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">📅 Creada:</span>
                  <span className="detail-value">{formatDate(order.createdAt)}</span>
                </div>
                {order.sentAt && (
                  <div className="detail-row">
                    <span className="detail-label">📤 Enviada:</span>
                    <span className="detail-value">{formatDate(order.sentAt)}</span>
                  </div>
                )}
                {order.confirmedAt && (
                  <div className="detail-row">
                    <span className="detail-label">✅ Confirmada:</span>
                    <span className="detail-value">{formatDate(order.confirmedAt)}</span>
                  </div>
                )}
                {order.deliveredAt && (
                  <div className="detail-row">
                    <span className="detail-label">📦 Entregada:</span>
                    <span className="detail-value">{formatDate(order.deliveredAt)}</span>
                  </div>
                )}
              </div>

              <div className="order-actions">
                {order.status === 'draft' && (
                  <button
                    onClick={() => handleSendOrder(order.id)}
                    className="btn btn-primary btn-sm"
                  >
                    📤 Enviar Orden
                  </button>
                )}
                {order.status === 'sent' && (
                  <button
                    onClick={() => handleConfirmOrder(order.id)}
                    className="btn btn-success btn-sm"
                  >
                    ✅ Confirmar Recibida
                  </button>
                )}
                {order.status === 'confirmed' && (
                  <button
                    onClick={() => handleMarkDelivered(order.id)}
                    className="btn btn-success btn-sm"
                  >
                    📦 Marcar como Entregada
                  </button>
                )}
                {order.status === 'delivered' && (
                  <span className="delivered-badge">✅ Entregada</span>
                )}
                
                <button className="btn btn-secondary btn-sm">
                  📄 Ver PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        {purchaseOrders.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No hay órdenes de compra</h3>
            <p>Las órdenes de compra generadas aparecerán aquí.</p>
          </div>
        )}
      </div>

      {/* Modal de Generación de Orden */}
      {showOrderForm && selectedQuotation && (
        <PurchaseOrderForm
          quotation={selectedQuotation}
          onGenerate={handleGenerateOrder}
          onClose={() => {
            setShowOrderForm(false);
            setSelectedQuotation(null);
          }}
        />
      )}
    </div>
  );
};

// Modal de Formulario de Orden de Compra
interface PurchaseOrderFormProps {
  quotation: ApprovedQuotation;
  onGenerate: (quotation: ApprovedQuotation) => void;
  onClose: () => void;
}

const PurchaseOrderForm: React.FC<PurchaseOrderFormProps> = ({
  quotation,
  onGenerate,
  onClose
}) => {
  const [formData, setFormData] = useState({
    deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    specialInstructions: '',
    paymentTerms: '30 días'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(quotation);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content purchase-order-modal">
        <div className="modal-header">
          <h2>📦 Generar Orden de Compra</h2>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>

        <div className="modal-body">
          <div className="quotation-summary">
            <h3>{quotation.requestTitle}</h3>
            <div className="summary-details">
              <div className="summary-item">
                <span className="summary-label">Proveedor:</span>
                <span className="summary-value">{quotation.providerName}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Precio:</span>
                <span className="summary-value price">${quotation.price.toLocaleString()}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Tiempo de Entrega:</span>
                <span className="summary-value">{quotation.deliveryTime}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="order-form">
            <div className="form-group">
              <label htmlFor="deliveryDate">📅 Fecha de Entrega</label>
              <input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="paymentTerms">💳 Condiciones de Pago</label>
              <select
                id="paymentTerms"
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleInputChange}
                required
              >
                <option value="30 días">30 días</option>
                <option value="45 días">45 días</option>
                <option value="60 días">60 días</option>
                <option value="Contado">Contado</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="specialInstructions">📝 Instrucciones Especiales</label>
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                rows={3}
                placeholder="Instrucciones adicionales para la entrega..."
              />
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            📦 Generar Orden de Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderGenerationPage; 