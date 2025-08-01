import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CustomAlert from '../../components/CustomAlert';

interface PurchaseOrder {
  id: string;
  orderNumber: string;
  providerName: string;
  providerId: string;
  quotationId: string;
  rfqTitle: string;
  totalAmount: number;
  deliveryDate: string;
  paymentTerms: string;
  status: 'draft' | 'sent' | 'confirmed' | 'completed';
  createdAt: string;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

interface Quotation {
  id: string;
  providerName: string;
  providerId: string;
  rfqTitle: string;
  price: number;
  deliveryTime: string;
  conditions: string;
  status: 'approved' | 'pending' | 'rejected';
}

const CreateOrderPage: React.FC = () => {
  const [approvedQuotations, setApprovedQuotations] = useState<Quotation[]>([
    {
      id: '1',
      providerName: 'Proveedor ABC',
      providerId: '1',
      rfqTitle: 'Compra de equipos de cómputo',
      price: 45000,
      deliveryTime: '15 días',
      conditions: 'Pago a 30 días, garantía de 1 año',
      status: 'approved'
    },
    {
      id: '2',
      providerName: 'Proveedor XYZ',
      providerId: '2',
      rfqTitle: 'Servicios de mantenimiento',
      price: 28000,
      deliveryTime: '10 días',
      conditions: 'Pago inmediato, servicio por 6 meses',
      status: 'approved'
    }
  ]);

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [selectedQuotation, setSelectedQuotation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [alert, setAlert] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const generateOrderNumber = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `OC-${year}${month}${day}-${random}`;
  };

  const calculateDeliveryDate = (deliveryTime: string): string => {
    const days = parseInt(deliveryTime.replace(/\D/g, ''));
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + days);
    return deliveryDate.toISOString().split('T')[0];
  };

  const generatePurchaseOrder = async (quotationId: string) => {
    setIsGenerating(true);
    
    try {
      // Simular generación de orden
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const quotation = approvedQuotations.find(q => q.id === quotationId);
      if (!quotation) throw new Error('Cotización no encontrada');
      
      const newOrder: PurchaseOrder = {
        id: Date.now().toString(),
        orderNumber: generateOrderNumber(),
        providerName: quotation.providerName,
        providerId: quotation.providerId,
        quotationId: quotation.id,
        rfqTitle: quotation.rfqTitle,
        totalAmount: quotation.price,
        deliveryDate: calculateDeliveryDate(quotation.deliveryTime),
        paymentTerms: quotation.conditions,
        status: 'draft',
        createdAt: new Date().toISOString(),
        items: [
          {
            id: '1',
            description: quotation.rfqTitle,
            quantity: 1,
            unit: 'servicio',
            unitPrice: quotation.price,
            totalPrice: quotation.price
          }
        ]
      };
      
      setPurchaseOrders(prev => [...prev, newOrder]);
      
      setAlert({
        isOpen: true,
        title: 'Orden de Compra Generada',
        message: `La orden de compra ${newOrder.orderNumber} ha sido generada exitosamente y enviada al proveedor ${quotation.providerName}.`,
        type: 'success'
      });
      
    } catch (error) {
      console.error('Error al generar orden:', error);
      setAlert({
        isOpen: true,
        title: 'Error de Generación',
        message: 'Error al generar la orden de compra. Por favor, intenta nuevamente.',
        type: 'error'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const sendOrderToProvider = async (orderId: string) => {
    try {
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPurchaseOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: 'sent' } : order
      ));
      
      const order = purchaseOrders.find(o => o.id === orderId);
      
      setAlert({
        isOpen: true,
        title: 'Orden Enviada',
        message: `La orden de compra ${order?.orderNumber} ha sido enviada exitosamente al proveedor ${order?.providerName}.`,
        type: 'success'
      });
      
    } catch (error) {
      setAlert({
        isOpen: true,
        title: 'Error de Envío',
        message: 'Error al enviar la orden de compra. Por favor, intenta nuevamente.',
        type: 'error'
      });
    }
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, isOpen: false }));
  };

  const getStatusColor = (status: PurchaseOrder['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: PurchaseOrder['status']) => {
    switch (status) {
      case 'draft': return 'Borrador';
      case 'sent': return 'Enviada';
      case 'confirmed': return 'Confirmada';
      case 'completed': return 'Completada';
      default: return 'Desconocido';
    }
  };

  const getStatusIcon = (status: PurchaseOrder['status']) => {
    switch (status) {
      case 'draft':
        return (
          <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'sent':
        return (
          <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        );
      case 'confirmed':
        return (
          <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'completed':
        return (
          <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="management-page">
        <div className="management-page-header">
          <div className="flex items-center justify-center mb-4">
            <div className="feature-icon">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="page-main-title">PASO 4 - Generación de Orden de Compra</h1>
          <p className="page-main-subtitle">
            Genera órdenes de compra automáticamente para cotizaciones aprobadas
          </p>
        </div>
        
        <div className="enhanced-form">
          <div className="flex items-center gap-3 mb-6">
            <div className="feature-icon">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="page-form-title">Cotizaciones Aprobadas</h2>
          </div>
          
          <div className="quotations-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {approvedQuotations.map((quotation) => (
              <div
                key={quotation.id}
                className="quotation-card"
                style={{
                  background: 'var(--card-bg)',
                  border: '2px solid var(--border-color)',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease-in-out'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      {quotation.providerName}
                    </h3>
                    <span className="status-badge bg-green-100 text-green-800" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Aprobada
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#4a90e2' }}>
                      ${quotation.price.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Precio Aprobado
                    </div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Solicitud:</span>
                    <span style={{ fontWeight: '500' }}>{quotation.rfqTitle}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Tiempo de Entrega:</span>
                    <span style={{ fontWeight: '500' }}>{quotation.deliveryTime}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Condiciones:</span>
                    <span style={{ fontWeight: '500' }}>{quotation.conditions}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => generatePurchaseOrder(quotation.id)}
                  className="btn-enhanced btn-enhanced-primary"
                  disabled={isGenerating}
                  style={{ width: '100%' }}
                >
                  {isGenerating ? (
                    <>
                      <svg className="icon-sm spinning" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                      Generando...
                    </>
                  ) : (
                    <>
                      <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Generar Orden de Compra
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
          
          {purchaseOrders.length > 0 && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="feature-icon">
                  <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="page-form-title">Órdenes de Compra Generadas</h2>
              </div>
              
              <div className="orders-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
                gap: '2rem'
              }}>
                {purchaseOrders.map((order) => (
                  <div
                    key={order.id}
                    className="order-card"
                    style={{
                      background: 'var(--card-bg)',
                      border: '2px solid var(--border-color)',
                      borderRadius: '1rem',
                      padding: '1.5rem',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease-in-out'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                          {order.orderNumber}
                        </h3>
                        <span className={`status-badge ${getStatusColor(order.status)}`} style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}>
                          {getStatusIcon(order.status)}
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#4a90e2' }}>
                          ${order.totalAmount.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          Monto Total
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Proveedor:</span>
                        <span style={{ fontWeight: '500' }}>{order.providerName}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Fecha de Entrega:</span>
                        <span style={{ fontWeight: '500' }}>{new Date(order.deliveryDate).toLocaleDateString()}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Condiciones de Pago:</span>
                        <span style={{ fontWeight: '500' }}>{order.paymentTerms}</span>
                      </div>
                    </div>
                    
                    {order.status === 'draft' && (
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                        <button
                          onClick={() => sendOrderToProvider(order.id)}
                          className="btn-enhanced btn-enhanced-success"
                          style={{ flex: 1 }}
                        >
                          <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          Enviar al Proveedor
                        </button>
                        <button
                          className="btn-enhanced btn-enhanced-secondary"
                          style={{ flex: 1 }}
                        >
                          <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Descargar PDF
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
          
          {approvedQuotations.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: 'var(--text-secondary)'
            }}>
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20" style={{ width: '4rem', height: '4rem', margin: '0 auto 1rem' }}>
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                No hay cotizaciones aprobadas
              </h3>
              <p>Las órdenes de compra se generarán automáticamente cuando se aprueben cotizaciones.</p>
            </div>
          )}
        </div>
      </div>

      {/* Alert Modal */}
      {alert.isOpen && (
        createPortal(
          <CustomAlert
            isOpen={alert.isOpen}
            onClose={closeAlert}
            title={alert.title}
            message={alert.message}
            type={alert.type}
          />,
          document.body
        )
      )}
    </div>
  );
};

export default CreateOrderPage; 