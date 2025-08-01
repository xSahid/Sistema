import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CustomAlert from '../../components/CustomAlert';

interface Quotation {
  id: string;
  providerName: string;
  providerId: string;
  rfqId: string;
  rfqTitle: string;
  price: number;
  deliveryTime: string;
  conditions: string;
  documents: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  notes?: string;
}

interface RFQ {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  status: 'open' | 'closed' | 'awarded';
  quotationsCount: number;
}

const QuotationsPage: React.FC = () => {
  const [quotations, setQuotations] = useState<Quotation[]>([
    {
      id: '1',
      providerName: 'Proveedor ABC',
      providerId: '1',
      rfqId: 'RFQ-001',
      rfqTitle: 'Compra de equipos de cómputo',
      price: 45000,
      deliveryTime: '15 días',
      conditions: 'Pago a 30 días, garantía de 1 año',
      documents: ['cotizacion_abc.pdf', 'catalogo_abc.pdf'],
      status: 'pending',
      submittedAt: '2025-01-15T10:30:00Z'
    },
    {
      id: '2',
      providerName: 'Proveedor XYZ',
      providerId: '2',
      rfqId: 'RFQ-001',
      rfqTitle: 'Compra de equipos de cómputo',
      price: 52000,
      deliveryTime: '10 días',
      conditions: 'Pago inmediato, garantía de 2 años',
      documents: ['cotizacion_xyz.pdf'],
      status: 'pending',
      submittedAt: '2025-01-16T14:20:00Z'
    },
    {
      id: '3',
      providerName: 'Proveedor DEF',
      providerId: '3',
      rfqId: 'RFQ-001',
      rfqTitle: 'Compra de equipos de cómputo',
      price: 48000,
      deliveryTime: '20 días',
      conditions: 'Pago a 45 días, garantía de 1 año',
      documents: ['cotizacion_def.pdf', 'especificaciones_def.pdf'],
      status: 'pending',
      submittedAt: '2025-01-17T09:15:00Z'
    }
  ]);

  const [rfqs, setRfqs] = useState<RFQ[]>([
    {
      id: 'RFQ-001',
      title: 'Compra de equipos de cómputo',
      description: 'Solicitud de cotización para equipos de cómputo para oficina',
      budget: 50000,
      deadline: '2025-01-20',
      status: 'open',
      quotationsCount: 3
    }
  ]);

  const [selectedRFQ, setSelectedRFQ] = useState<string>('RFQ-001');
  const [isLoading, setIsLoading] = useState(true);
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

  const handleApproveQuotation = async (quotationId: string) => {
    try {
      // Simular aprobación
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setQuotations(prev => prev.map(q => 
        q.id === quotationId ? { ...q, status: 'approved' } : { ...q, status: 'rejected' }
      ));
      
      setAlert({
        isOpen: true,
        title: 'Cotización Aprobada',
        message: 'La cotización ha sido aprobada exitosamente. Se generará automáticamente la orden de compra.',
        type: 'success'
      });
      
    } catch (error) {
      setAlert({
        isOpen: true,
        title: 'Error de Aprobación',
        message: 'Error al aprobar la cotización. Por favor, intenta nuevamente.',
        type: 'error'
      });
    }
  };

  const handleRejectQuotation = async (quotationId: string, reason: string) => {
    try {
      // Simular rechazo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setQuotations(prev => prev.map(q => 
        q.id === quotationId ? { ...q, status: 'rejected', notes: reason } : q
      ));
      
      setAlert({
        isOpen: true,
        title: 'Cotización Rechazada',
        message: 'La cotización ha sido rechazada. El proveedor será notificado.',
        type: 'warning'
      });
      
    } catch (error) {
      setAlert({
        isOpen: true,
        title: 'Error de Rechazo',
        message: 'Error al rechazar la cotización. Por favor, intenta nuevamente.',
        type: 'error'
      });
    }
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, isOpen: false }));
  };

  const getStatusColor = (status: Quotation['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Quotation['status']) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'approved': return 'Aprobada';
      case 'rejected': return 'Rechazada';
      default: return 'Desconocido';
    }
  };

  const getStatusIcon = (status: Quotation['status']) => {
    switch (status) {
      case 'pending':
        return (
          <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
      case 'approved':
        return (
          <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'rejected':
        return (
          <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  const filteredQuotations = quotations.filter(q => q.rfqId === selectedRFQ);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="management-page">
        <div className="management-page-header">
          <div className="flex items-center justify-center mb-4">
            <div className="feature-icon">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h1 className="page-main-title">PASO 3 - Revisión de Cotizaciones</h1>
          <p className="page-main-subtitle">
            Compara y evalúa las cotizaciones recibidas para seleccionar la mejor opción
          </p>
        </div>
        
        <div className="enhanced-form">
          <div className="flex items-center gap-3 mb-6">
            <div className="feature-icon">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="page-form-title">Cotizaciones Recibidas</h2>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Solicitud de Cotización:
            </label>
            <select
              value={selectedRFQ}
              onChange={(e) => setSelectedRFQ(e.target.value)}
              className="form-select"
            >
              {rfqs.map(rfq => (
                <option key={rfq.id} value={rfq.id}>
                  {rfq.title} - {rfq.quotationsCount} cotizaciones
                </option>
              ))}
            </select>
          </div>
          
          <div className="quotations-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem'
          }}>
            {filteredQuotations.map((quotation) => (
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
                    <span className={`status-badge ${getStatusColor(quotation.status)}`} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      {getStatusIcon(quotation.status)}
                      {getStatusText(quotation.status)}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#4a90e2' }}>
                      ${quotation.price.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Precio
                    </div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Tiempo de Entrega:</span>
                    <span style={{ fontWeight: '500' }}>{quotation.deliveryTime}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Condiciones:</span>
                    <span style={{ fontWeight: '500' }}>{quotation.conditions}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Enviada:</span>
                    <span style={{ fontWeight: '500' }}>
                      {new Date(quotation.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Documentos Adjuntos:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {quotation.documents.map((doc, index) => (
                      <span
                        key={index}
                        style={{
                          background: '#f3f4f6',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem',
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer'
                        }}
                        onClick={() => console.log('Descargar:', doc)}
                      >
                        📎 {doc}
                      </span>
                    ))}
                  </div>
                </div>
                
                {quotation.status === 'pending' && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <button
                      onClick={() => handleApproveQuotation(quotation.id)}
                      className="btn-enhanced btn-enhanced-success"
                      style={{ flex: 1 }}
                    >
                      <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Aprobar
                    </button>
                    <button
                      onClick={() => handleRejectQuotation(quotation.id, 'No cumple con los requisitos')}
                      className="btn-enhanced btn-enhanced-danger"
                      style={{ flex: 1 }}
                    >
                      <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Rechazar
                    </button>
                  </div>
                )}
                
                {quotation.status === 'rejected' && quotation.notes && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '0.75rem',
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    color: '#dc2626'
                  }}>
                    <strong>Motivo del rechazo:</strong> {quotation.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {filteredQuotations.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: 'var(--text-secondary)'
            }}>
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20" style={{ width: '4rem', height: '4rem', margin: '0 auto 1rem' }}>
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                No hay cotizaciones para esta solicitud
              </h3>
              <p>Las cotizaciones aparecerán aquí cuando los proveedores las envíen.</p>
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

export default QuotationsPage; 