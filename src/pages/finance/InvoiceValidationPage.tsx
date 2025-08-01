import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CustomAlert from '../../components/CustomAlert';

interface Invoice {
  id: string;
  invoiceNumber: string;
  providerName: string;
  providerId: string;
  orderNumber: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  issueDate: string;
  dueDate: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: string[];
  submittedAt: string;
  notes?: string;
  validationErrors?: string[];
}

const InvoiceValidationPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'FAC-001-2025',
      providerName: 'Proveedor ABC',
      providerId: '1',
      orderNumber: 'OC-20250115-001',
      amount: 45000,
      taxAmount: 7200,
      totalAmount: 52200,
      issueDate: '2025-01-20',
      dueDate: '2025-02-20',
      status: 'pending',
      documents: ['factura_abc.xml', 'factura_abc.pdf'],
      submittedAt: '2025-01-20T10:30:00Z',
      validationErrors: []
    },
    {
      id: '2',
      invoiceNumber: 'FAC-002-2025',
      providerName: 'Proveedor XYZ',
      providerId: '2',
      orderNumber: 'OC-20250116-002',
      amount: 28000,
      taxAmount: 4480,
      totalAmount: 32480,
      issueDate: '2025-01-21',
      dueDate: '2025-01-21',
      status: 'pending',
      documents: ['factura_xyz.xml'],
      submittedAt: '2025-01-21T14:20:00Z',
      validationErrors: ['RFC del emisor no coincide con el proveedor registrado']
    },
    {
      id: '3',
      invoiceNumber: 'FAC-003-2025',
      providerName: 'Proveedor DEF',
      providerId: '3',
      orderNumber: 'OC-20250117-003',
      amount: 35000,
      taxAmount: 5600,
      totalAmount: 40600,
      issueDate: '2025-01-22',
      dueDate: '2025-02-22',
      status: 'pending',
      documents: ['factura_def.xml', 'factura_def.pdf'],
      submittedAt: '2025-01-22T09:15:00Z',
      validationErrors: []
    }
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
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

  const validateInvoice = async (invoiceId: string) => {
    setIsProcessing(true);
    
    try {
      // Simular validación
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const invoice = invoices.find(i => i.id === invoiceId);
      if (!invoice) throw new Error('Factura no encontrada');
      
      // Simular validación fiscal
      const hasErrors = invoice.validationErrors && invoice.validationErrors.length > 0;
      
      setInvoices(prev => prev.map(inv => 
        inv.id === invoiceId 
          ? { ...inv, status: hasErrors ? 'rejected' : 'approved' }
          : inv
      ));
      
      setAlert({
        isOpen: true,
        title: hasErrors ? 'Factura Rechazada' : 'Factura Aprobada',
        message: hasErrors 
          ? `La factura ${invoice.invoiceNumber} ha sido rechazada por errores de validación fiscal.`
          : `La factura ${invoice.invoiceNumber} ha sido aprobada exitosamente y pasará al plan de pagos.`,
        type: hasErrors ? 'warning' : 'success'
      });
      
    } catch (error) {
      setAlert({
        isOpen: true,
        title: 'Error de Validación',
        message: 'Error al validar la factura. Por favor, intenta nuevamente.',
        type: 'error'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const rejectInvoice = async (invoiceId: string, reason: string) => {
    try {
      // Simular rechazo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setInvoices(prev => prev.map(inv => 
        inv.id === invoiceId ? { ...inv, status: 'rejected', notes: reason } : inv
      ));
      
      const invoice = invoices.find(i => i.id === invoiceId);
      
      setAlert({
        isOpen: true,
        title: 'Factura Rechazada',
        message: `La factura ${invoice?.invoiceNumber} ha sido rechazada. El proveedor será notificado.`,
        type: 'warning'
      });
      
    } catch (error) {
      setAlert({
        isOpen: true,
        title: 'Error de Rechazo',
        message: 'Error al rechazar la factura. Por favor, intenta nuevamente.',
        type: 'error'
      });
    }
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, isOpen: false }));
  };

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Invoice['status']) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'approved': return 'Aprobada';
      case 'rejected': return 'Rechazada';
      default: return 'Desconocido';
    }
  };

  const getStatusIcon = (status: Invoice['status']) => {
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

  const pendingInvoices = invoices.filter(inv => inv.status === 'pending');

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
          <h1 className="page-main-title">PASO 5 - Validación de Facturas</h1>
          <p className="page-main-subtitle">
            Revisa y valida las facturas subidas por los proveedores
          </p>
        </div>
        
        <div className="enhanced-form">
          <div className="flex items-center gap-3 mb-6">
            <div className="feature-icon">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="page-form-title">Facturas Pendientes de Validación</h2>
          </div>
          
          <div className="invoices-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '2rem'
          }}>
            {pendingInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="invoice-card"
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
                      {invoice.invoiceNumber}
                    </h3>
                    <span className={`status-badge ${getStatusColor(invoice.status)}`} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      {getStatusIcon(invoice.status)}
                      {getStatusText(invoice.status)}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#4a90e2' }}>
                      ${invoice.totalAmount.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Monto Total
                    </div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Proveedor:</span>
                    <span style={{ fontWeight: '500' }}>{invoice.providerName}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Orden de Compra:</span>
                    <span style={{ fontWeight: '500' }}>{invoice.orderNumber}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Subtotal:</span>
                    <span style={{ fontWeight: '500' }}>${invoice.amount.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>IVA:</span>
                    <span style={{ fontWeight: '500' }}>${invoice.taxAmount.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Fecha de Emisión:</span>
                    <span style={{ fontWeight: '500' }}>{new Date(invoice.issueDate).toLocaleDateString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Fecha de Vencimiento:</span>
                    <span style={{ fontWeight: '500' }}>{new Date(invoice.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Documentos Adjuntos:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {invoice.documents.map((doc, index) => (
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
                
                {invoice.validationErrors && invoice.validationErrors.length > 0 && (
                  <div style={{
                    marginBottom: '1rem',
                    padding: '0.75rem',
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    color: '#dc2626'
                  }}>
                    <strong>Errores de Validación:</strong>
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
                      {invoice.validationErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button
                    onClick={() => validateInvoice(invoice.id)}
                    className="btn-enhanced btn-enhanced-success"
                    disabled={isProcessing}
                    style={{ flex: 1 }}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="icon-sm spinning" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                        Validando...
                      </>
                    ) : (
                      <>
                        <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Validar Factura
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => rejectInvoice(invoice.id, 'No cumple con los requisitos fiscales')}
                    className="btn-enhanced btn-enhanced-danger"
                    disabled={isProcessing}
                    style={{ flex: 1 }}
                  >
                    <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {pendingInvoices.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: 'var(--text-secondary)'
            }}>
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20" style={{ width: '4rem', height: '4rem', margin: '0 auto 1rem' }}>
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                No hay facturas pendientes de validación
              </h3>
              <p>Las facturas aparecerán aquí cuando los proveedores las suban al sistema.</p>
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

export default InvoiceValidationPage; 