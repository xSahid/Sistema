import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CustomAlert from '../../components/CustomAlert';

interface Payment {
  id: string;
  paymentNumber: string;
  providerName: string;
  providerId: string;
  invoiceNumber: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  paymentDate: string;
  dueDate: string;
  status: 'pending' | 'partial' | 'completed';
  paymentType: 'full' | 'partial';
  documents: string[];
  notes?: string;
}

interface PPDComplement {
  id: string;
  complementNumber: string;
  paymentId: string;
  providerName: string;
  amount: number;
  paymentDate: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: string[];
  submittedAt: string;
  notes?: string;
}

const PaymentTrackingPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      paymentNumber: 'PAG-001-2025',
      providerName: 'Proveedor ABC',
      providerId: '1',
      invoiceNumber: 'FAC-001-2025',
      totalAmount: 52200,
      paidAmount: 52200,
      remainingAmount: 0,
      paymentDate: '2025-01-25',
      dueDate: '2025-02-20',
      status: 'completed',
      paymentType: 'full',
      documents: ['comprobante_pago_abc.pdf'],
      notes: 'Pago completo realizado'
    },
    {
      id: '2',
      paymentNumber: 'PAG-002-2025',
      providerName: 'Proveedor XYZ',
      providerId: '2',
      invoiceNumber: 'FAC-002-2025',
      totalAmount: 32480,
      paidAmount: 16240,
      remainingAmount: 16240,
      paymentDate: '2025-01-26',
      dueDate: '2025-01-21',
      status: 'partial',
      paymentType: 'partial',
      documents: ['comprobante_pago_xyz.pdf'],
      notes: 'Pago parcial - 50% del total'
    },
    {
      id: '3',
      paymentNumber: 'PAG-003-2025',
      providerName: 'Proveedor DEF',
      providerId: '3',
      invoiceNumber: 'FAC-003-2025',
      totalAmount: 40600,
      paidAmount: 0,
      remainingAmount: 40600,
      paymentDate: '',
      dueDate: '2025-02-22',
      status: 'pending',
      paymentType: 'full',
      documents: [],
      notes: 'Pendiente de pago'
    }
  ]);

  const [ppdComplements, setPpdComplements] = useState<PPDComplement[]>([
    {
      id: '1',
      complementNumber: 'PPD-001-2025',
      paymentId: '2',
      providerName: 'Proveedor XYZ',
      amount: 16240,
      paymentDate: '2025-01-26',
      status: 'pending',
      documents: ['complemento_ppd_xyz.xml', 'complemento_ppd_xyz.pdf'],
      submittedAt: '2025-01-26T15:30:00Z',
      notes: 'Complemento de pago parcial'
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

  const registerPayment = async (paymentId: string, amount: number) => {
    setIsProcessing(true);
    
    try {
      // Simular registro de pago
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPayments(prev => prev.map(payment => {
        if (payment.id === paymentId) {
          const newPaidAmount = payment.paidAmount + amount;
          const newRemainingAmount = payment.totalAmount - newPaidAmount;
          const newStatus = newRemainingAmount === 0 ? 'completed' : 'partial';
          
          return {
            ...payment,
            paidAmount: newPaidAmount,
            remainingAmount: newRemainingAmount,
            status: newStatus,
            paymentDate: new Date().toISOString().split('T')[0],
            documents: [...payment.documents, `comprobante_pago_${paymentId}.pdf`]
          };
        }
        return payment;
      }));
      
      const payment = payments.find(p => p.id === paymentId);
      
      setAlert({
        isOpen: true,
        title: 'Pago Registrado',
        message: `El pago de $${amount.toLocaleString()} ha sido registrado exitosamente para ${payment?.providerName}.`,
        type: 'success'
      });
      
    } catch (error) {
      setAlert({
        isOpen: true,
        title: 'Error de Registro',
        message: 'Error al registrar el pago. Por favor, intenta nuevamente.',
        type: 'error'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const validatePPDComplement = async (complementId: string) => {
    try {
      // Simular validación
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setPpdComplements(prev => prev.map(comp => 
        comp.id === complementId ? { ...comp, status: 'approved' } : comp
      ));
      
      const complement = ppdComplements.find(c => c.id === complementId);
      
      setAlert({
        isOpen: true,
        title: 'Complemento Aprobado',
        message: `El complemento PPD ${complement?.complementNumber} ha sido aprobado exitosamente.`,
        type: 'success'
      });
      
    } catch (error) {
      setAlert({
        isOpen: true,
        title: 'Error de Validación',
        message: 'Error al validar el complemento PPD. Por favor, intenta nuevamente.',
        type: 'error'
      });
    }
  };

  const rejectPPDComplement = async (complementId: string, reason: string) => {
    try {
      // Simular rechazo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPpdComplements(prev => prev.map(comp => 
        comp.id === complementId ? { ...comp, status: 'rejected', notes: reason } : comp
      ));
      
      const complement = ppdComplements.find(c => c.id === complementId);
      
      setAlert({
        isOpen: true,
        title: 'Complemento Rechazado',
        message: `El complemento PPD ${complement?.complementNumber} ha sido rechazado.`,
        type: 'warning'
      });
      
    } catch (error) {
      setAlert({
        isOpen: true,
        title: 'Error de Rechazo',
        message: 'Error al rechazar el complemento PPD. Por favor, intenta nuevamente.',
        type: 'error'
      });
    }
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, isOpen: false }));
  };

  const getStatusColor = (status: Payment['status'] | PPDComplement['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'partial': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Payment['status'] | PPDComplement['status']) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'partial': return 'Parcial';
      case 'completed': return 'Completado';
      case 'approved': return 'Aprobado';
      case 'rejected': return 'Rechazado';
      default: return 'Desconocido';
    }
  };

  const getStatusIcon = (status: Payment['status'] | PPDComplement['status']) => {
    switch (status) {
      case 'pending':
        return (
          <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
      case 'partial':
        return (
          <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'completed':
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="management-page">
        <div className="management-page-header">
          <div className="flex items-center justify-center mb-4">
            <div className="feature-icon">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
              </svg>
            </div>
          </div>
          <h1 className="page-main-title">PASO 7 - Seguimiento de Pagos y Complementos PPD</h1>
          <p className="page-main-subtitle">
            Registra pagos y gestiona complementos de pago para mantener la contabilidad fiscal al día
          </p>
        </div>
        
        <div className="enhanced-form">
          <div className="flex items-center gap-3 mb-6">
            <div className="feature-icon">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
              </svg>
            </div>
            <h2 className="page-form-title">Seguimiento de Pagos</h2>
          </div>
          
          <div className="payments-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="payment-card"
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
                      {payment.paymentNumber}
                    </h3>
                    <span className={`status-badge ${getStatusColor(payment.status)}`} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      {getStatusIcon(payment.status)}
                      {getStatusText(payment.status)}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#4a90e2' }}>
                      ${payment.totalAmount.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Monto Total
                    </div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Proveedor:</span>
                    <span style={{ fontWeight: '500' }}>{payment.providerName}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Factura:</span>
                    <span style={{ fontWeight: '500' }}>{payment.invoiceNumber}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Pagado:</span>
                    <span style={{ fontWeight: '500', color: '#10b981' }}>${payment.paidAmount.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Pendiente:</span>
                    <span style={{ fontWeight: '500', color: payment.remainingAmount > 0 ? '#f59e0b' : '#10b981' }}>
                      ${payment.remainingAmount.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Fecha de Vencimiento:</span>
                    <span style={{ fontWeight: '500' }}>{new Date(payment.dueDate).toLocaleDateString()}</span>
                  </div>
                  {payment.paymentDate && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Fecha de Pago:</span>
                      <span style={{ fontWeight: '500' }}>{new Date(payment.paymentDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                
                {payment.documents.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      Comprobantes:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {payment.documents.map((doc, index) => (
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
                )}
                
                {payment.status === 'pending' && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <button
                      onClick={() => registerPayment(payment.id, payment.totalAmount)}
                      className="btn-enhanced btn-enhanced-success"
                      disabled={isProcessing}
                      style={{ flex: 1 }}
                    >
                      {isProcessing ? (
                        <>
                          <svg className="icon-sm spinning" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                          </svg>
                          Registrando...
                        </>
                      ) : (
                        <>
                          <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                          </svg>
                          Registrar Pago Completo
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => registerPayment(payment.id, payment.totalAmount / 2)}
                      className="btn-enhanced btn-enhanced-secondary"
                      disabled={isProcessing}
                      style={{ flex: 1 }}
                    >
                      <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                      Pago Parcial
                    </button>
                  </div>
                )}
                
                {payment.status === 'partial' && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <button
                      onClick={() => registerPayment(payment.id, payment.remainingAmount)}
                      className="btn-enhanced btn-enhanced-success"
                      disabled={isProcessing}
                      style={{ flex: 1 }}
                    >
                      {isProcessing ? (
                        <>
                          <svg className="icon-sm spinning" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                          </svg>
                          Registrando...
                        </>
                      ) : (
                        <>
                          <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                          </svg>
                          Completar Pago
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {ppdComplements.length > 0 && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="feature-icon">
                  <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="page-form-title">Complementos PPD Pendientes</h2>
              </div>
              
              <div className="complements-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
                gap: '2rem'
              }}>
                {ppdComplements.map((complement) => (
                  <div
                    key={complement.id}
                    className="complement-card"
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
                          {complement.complementNumber}
                        </h3>
                        <span className={`status-badge ${getStatusColor(complement.status)}`} style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}>
                          {getStatusIcon(complement.status)}
                          {getStatusText(complement.status)}
                        </span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#4a90e2' }}>
                          ${complement.amount.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          Monto del Complemento
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Proveedor:</span>
                        <span style={{ fontWeight: '500' }}>{complement.providerName}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Fecha de Pago:</span>
                        <span style={{ fontWeight: '500' }}>{new Date(complement.paymentDate).toLocaleDateString()}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Enviado:</span>
                        <span style={{ fontWeight: '500' }}>{new Date(complement.submittedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                        Documentos Adjuntos:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {complement.documents.map((doc, index) => (
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
                    
                    {complement.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                        <button
                          onClick={() => validatePPDComplement(complement.id)}
                          className="btn-enhanced btn-enhanced-success"
                          style={{ flex: 1 }}
                        >
                          <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Aprobar
                        </button>
                        <button
                          onClick={() => rejectPPDComplement(complement.id, 'No cumple con los requisitos fiscales')}
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
                  </div>
                ))}
              </div>
            </>
          )}
          
          {payments.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: 'var(--text-secondary)'
            }}>
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20" style={{ width: '4rem', height: '4rem', margin: '0 auto 1rem' }}>
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                No hay pagos para registrar
              </h3>
              <p>Los pagos aparecerán aquí cuando se aprueben facturas y se programen pagos.</p>
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

export default PaymentTrackingPage; 