import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CustomAlert from '../../components/CustomAlert';

interface Payment {
  id: string;
  providerName: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  description: string;
  invoiceNumber: string;
}

interface PaymentFormData {
  provider: string;
  amount: number;
  dueDate: string;
  invoiceNumber: string;
  description: string;
}

interface FormErrors {
  provider?: string;
  amount?: string;
  dueDate?: string;
  invoiceNumber?: string;
  description?: string;
}

const FinancePayments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'review'>('schedule');
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      providerName: 'Proveedor ABC',
      amount: 15000,
      dueDate: '2025-02-15',
      status: 'pending',
      description: 'Servicios de mantenimiento',
      invoiceNumber: 'INV-001'
    },
    {
      id: '2',
      providerName: 'Proveedor XYZ',
      amount: 25000,
      dueDate: '2025-02-20',
      status: 'approved',
      description: 'Materiales de construcción',
      invoiceNumber: 'INV-002'
    },
    {
      id: '3',
      providerName: 'Proveedor DEF',
      amount: 8000,
      dueDate: '2025-02-25',
      status: 'rejected',
      description: 'Servicios de limpieza',
      invoiceNumber: 'INV-003'
    }
  ]);

  // Estados del formulario
  const [formData, setFormData] = useState<PaymentFormData>({
    provider: '',
    amount: 0,
    dueDate: '',
    invoiceNumber: '',
    description: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Funciones de validación
  const validateProvider = (provider: string): string | undefined => {
    if (!provider.trim()) return 'El proveedor es requerido';
    return undefined;
  };

  const validateAmount = (amount: number): string | undefined => {
    if (!amount || amount <= 0) return 'El monto debe ser mayor a 0';
    if (amount > 999999999) return 'El monto es demasiado alto';
    return undefined;
  };

  const validateDueDate = (dueDate: string): string | undefined => {
    if (!dueDate) return 'La fecha de vencimiento es requerida';
    
    const selectedDate = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate <= today) return 'La fecha de vencimiento debe ser posterior a hoy';
    
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 2);
    if (selectedDate > maxDate) return 'La fecha de vencimiento no puede ser más de 2 años en el futuro';
    
    return undefined;
  };

  const validateInvoiceNumber = (invoiceNumber: string): string | undefined => {
    if (!invoiceNumber.trim()) return 'El número de factura es requerido';
    if (invoiceNumber.length < 3) return 'El número de factura debe tener al menos 3 caracteres';
    if (invoiceNumber.length > 50) return 'El número de factura es demasiado largo';
    return undefined;
  };

  const validateDescription = (description: string): string | undefined => {
    if (!description.trim()) return 'La descripción es requerida';
    if (description.length < 10) return 'La descripción debe tener al menos 10 caracteres';
    if (description.length > 500) return 'La descripción es demasiado larga';
    return undefined;
  };

  const validateField = (name: string, value: string | number): string | undefined => {
    switch (name) {
      case 'provider':
        return validateProvider(value as string);
      
      case 'amount':
        return validateAmount(value as number);
      
      case 'dueDate':
        return validateDueDate(value as string);
      
      case 'invoiceNumber':
        return validateInvoiceNumber(value as string);
      
      case 'description':
        return validateDescription(value as string);
      
      default:
        return undefined;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numValue = e.target.type === 'number' ? Number(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: numValue
    }));
    
    // Validar en tiempo real si el campo ha sido tocado
    if (touched[name]) {
      const error = validateField(name, numValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numValue = e.target.type === 'number' ? Number(value) : value;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = validateField(name, numValue);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof PaymentFormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Simular envío al backend
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('Payment Data:', formData);
        
        setAlert({
          isOpen: true,
          title: 'Pago Programado',
          message: 'El pago ha sido programado exitosamente. Se notificará al proveedor y podrás hacer seguimiento en la sección de revisión.',
          type: 'success'
        });
        
        // Limpiar formulario después del éxito
        handleClear();
        
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        setAlert({
          isOpen: true,
          title: 'Error de Envío',
          message: 'Error al programar el pago. Por favor, intenta nuevamente.',
          type: 'error'
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setAlert({
        isOpen: true,
        title: 'Errores de Validación',
        message: 'Por favor, corrige los errores en el formulario antes de enviar.',
        type: 'warning'
      });
    }
  };

  const handleClear = () => {
    setFormData({
      provider: '',
      amount: 0,
      dueDate: '',
      invoiceNumber: '',
      description: '',
    });
    setErrors({});
    setTouched({});
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, isOpen: false }));
  };

  // Componente Skeleton para el formulario
  const FormSkeleton = () => (
    <div className="skeleton-form-container">
      <div className="skeleton-form-row">
        <div className="skeleton-form-field">
          <div className="skeleton-label skeleton"></div>
          <div className="skeleton-input skeleton"></div>
        </div>
        <div className="skeleton-form-field">
          <div className="skeleton-label skeleton"></div>
          <div className="skeleton-input skeleton"></div>
        </div>
      </div>
      
      <div className="skeleton-form-row">
        <div className="skeleton-form-field">
          <div className="skeleton-label skeleton"></div>
          <div className="skeleton-input skeleton"></div>
        </div>
        <div className="skeleton-form-field">
          <div className="skeleton-label skeleton"></div>
          <div className="skeleton-input skeleton"></div>
        </div>
      </div>
      
      <div className="skeleton-form-field full-width">
        <div className="skeleton-label skeleton"></div>
        <div className="skeleton-textarea skeleton"></div>
      </div>
      
      <div className="skeleton-buttons">
        <div className="skeleton-button skeleton"></div>
        <div className="skeleton-button primary skeleton"></div>
      </div>
    </div>
  );

  const handleStatusChange = (paymentId: string, newStatus: Payment['status']) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId ? { ...payment, status: newStatus } : payment
    ));
  };

  const getStatusText = (status: Payment['status']) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'approved': return 'Aprobado';
      case 'rejected': return 'Rechazado';
      case 'paid': return 'Pagado';
      default: return 'Desconocido';
    }
  };

  const getStatusIcon = (status: Payment['status']) => {
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
      case 'paid':
        return (
          <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
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
          <h1 className="page-main-title">PASO 6 - Programación de Plan de Pagos</h1>
          <p className="page-main-subtitle">
            Programa las fechas y montos de pago para facturas aprobadas
          </p>
        </div>
        
        <div className="tab-navigation">
          <ul className="tab-list">
            <li className="tab-item">
              <button
                onClick={() => setActiveTab('schedule')}
                className={`tab-button ${activeTab === 'schedule' ? 'active' : ''}`}
              >
                <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Programar Pago
              </button>
            </li>
            <li className="tab-item">
              <button
                onClick={() => setActiveTab('review')}
                className={`tab-button ${activeTab === 'review' ? 'active' : ''}`}
              >
                <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Revisar Pagos
              </button>
            </li>
          </ul>
        </div>
        
        <div className="tab-content">
          <div className={`tab-panel ${activeTab === 'schedule' ? 'active' : ''}`}>
            <div className="enhanced-form">
              <div className="flex items-center gap-3 mb-6">
                <div className="feature-icon">
                  <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="page-form-title">Programar Nuevo Pago</h2>
              </div>
              
              {isLoading ? (
                <FormSkeleton />
              ) : (
                <div className="registration-form-container">
                  <form onSubmit={handleSubmit} className="registration-form form-entrance-animation">
                    <div className="form-row form-row-entrance">
                      <div className="form-field form-field-entrance">
                        <label>
                          <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                          </svg>
                          Proveedor *
                        </label>
                        <select
                          name="provider"
                          value={formData.provider}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          required
                          className={errors.provider && touched.provider ? 'error' : ''}
                        >
                          <option value="">Seleccionar proveedor</option>
                          <option value="provider1">Proveedor ABC</option>
                          <option value="provider2">Proveedor XYZ</option>
                          <option value="provider3">Proveedor DEF</option>
                        </select>
                        {errors.provider && touched.provider && (
                          <span className="error-message">{errors.provider}</span>
                        )}
                      </div>
                      <div className="form-field form-field-entrance">
                        <label>
                          <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                          </svg>
                          Monto *
                        </label>
                        <input
                          type="number"
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          required
                          min="0.01"
                          step="0.01"
                          placeholder="0.00"
                          className={errors.amount && touched.amount ? 'error' : ''}
                        />
                        {errors.amount && touched.amount && (
                          <span className="error-message">{errors.amount}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="form-row form-row-entrance">
                      <div className="form-field form-field-entrance">
                        <label>
                          <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          Fecha de Vencimiento *
                        </label>
                        <input
                          type="date"
                          name="dueDate"
                          value={formData.dueDate}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          required
                          className={errors.dueDate && touched.dueDate ? 'error' : ''}
                        />
                        {errors.dueDate && touched.dueDate && (
                          <span className="error-message">{errors.dueDate}</span>
                        )}
                      </div>
                      <div className="form-field form-field-entrance">
                        <label>
                          <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                          Número de Factura *
                        </label>
                        <input
                          type="text"
                          name="invoiceNumber"
                          value={formData.invoiceNumber}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          required
                          placeholder="INV-XXX"
                          className={errors.invoiceNumber && touched.invoiceNumber ? 'error' : ''}
                        />
                        {errors.invoiceNumber && touched.invoiceNumber && (
                          <span className="error-message">{errors.invoiceNumber}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="form-field full-width form-field-entrance">
                      <label>
                        <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Descripción *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        rows={4}
                        placeholder="Descripción del pago..."
                        className={errors.description && touched.description ? 'error' : ''}
                      />
                      {errors.description && touched.description && (
                        <span className="error-message">{errors.description}</span>
                      )}
                    </div>
                    
                    <div className="flex justify-end space-x-4 buttons-entrance">
                      <button
                        type="button"
                        onClick={handleClear}
                        className="btn-enhanced btn-enhanced-secondary"
                        disabled={isSubmitting}
                      >
                        <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Limpiar
                      </button>
                      <button
                        type="submit"
                        className={`btn-enhanced btn-enhanced-primary ${isSubmitting ? 'submitting' : ''}`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="icon-sm spinning" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                            Procesando...
                          </>
                        ) : (
                          <>
                            <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Programar Pago
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
          
          <div className={`tab-panel ${activeTab === 'review' ? 'active' : ''}`}>
            <div className="enhanced-form">
              <div className="flex items-center gap-3 mb-6">
                <div className="feature-icon">
                  <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="hero-title">Revisar Pagos Programados</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="enhanced-table">
                  <thead>
                    <tr>
                      <th>Proveedor</th>
                      <th>Monto</th>
                      <th>Vencimiento</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td>
                          <div>
                            <div className="hero-title text-sm font-medium">
                              {payment.providerName}
                            </div>
                            <div className="hero-subtitle text-sm">
                              {payment.invoiceNumber}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="hero-title text-sm">
                            ${payment.amount.toLocaleString()}
                          </div>
                        </td>
                        <td>
                          <div className="hero-title text-sm">
                            {new Date(payment.dueDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge status-badge-${payment.status} flex items-center gap-2`}>
                            {getStatusIcon(payment.status)}
                            {getStatusText(payment.status)}
                          </span>
                        </td>
                        <td>
                          {payment.status === 'pending' && (
                            <div className="space-x-2">
                              <button
                                onClick={() => handleStatusChange(payment.id, 'approved')}
                                className="btn-enhanced btn-enhanced-success"
                              >
                                <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Aprobar
                              </button>
                              <button
                                onClick={() => handleStatusChange(payment.id, 'rejected')}
                                className="btn-enhanced btn-enhanced-danger"
                              >
                                <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Rechazar
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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

export default FinancePayments; 