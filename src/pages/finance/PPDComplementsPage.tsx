import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CustomAlert from '../../components/CustomAlert';

interface PPDComplement {
  id: string;
  providerName: string;
  paymentId: string;
  invoiceNumber: string;
  complementType: 'PPD' | 'PUE';
  amount: number;
  originalAmount: number;
  remainingAmount: number;
  uploadDate: string;
  status: 'pending' | 'validated' | 'rejected';
  documents: {
    xml: string;
    pdf: string;
  };
  notes?: string;
}

interface PPDFormData {
  provider: string;
  paymentId: string;
  invoiceNumber: string;
  complementType: 'PPD' | 'PUE';
  amount: number;
  originalAmount: number;
  xmlFile: File | null;
  pdfFile: File | null;
  notes: string;
}

interface FormErrors {
  provider?: string;
  paymentId?: string;
  invoiceNumber?: string;
  complementType?: string;
  amount?: string;
  originalAmount?: string;
  xmlFile?: string;
  pdfFile?: string;
  notes?: string;
}

const PPDComplementsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'list'>('upload');
  const [complements, setComplements] = useState<PPDComplement[]>([
    {
      id: '1',
      providerName: 'Proveedor ABC',
      paymentId: 'PAY-001',
      invoiceNumber: 'INV-001',
      complementType: 'PPD',
      amount: 5000,
      originalAmount: 15000,
      remainingAmount: 10000,
      uploadDate: '2025-01-15T10:30:00Z',
      status: 'validated',
      documents: {
        xml: 'complemento_001.xml',
        pdf: 'complemento_001.pdf'
      },
      notes: 'Complemento de pago parcial por servicios de mantenimiento'
    },
    {
      id: '2',
      providerName: 'Proveedor XYZ',
      paymentId: 'PAY-002',
      invoiceNumber: 'INV-002',
      complementType: 'PPD',
      amount: 8000,
      originalAmount: 25000,
      remainingAmount: 17000,
      uploadDate: '2025-01-16T14:20:00Z',
      status: 'pending',
      documents: {
        xml: 'complemento_002.xml',
        pdf: 'complemento_002.pdf'
      },
      notes: 'Pago parcial por materiales de construcción'
    },
    {
      id: '3',
      providerName: 'Proveedor DEF',
      paymentId: 'PAY-003',
      invoiceNumber: 'INV-003',
      complementType: 'PUE',
      amount: 3000,
      originalAmount: 8000,
      remainingAmount: 5000,
      uploadDate: '2025-01-17T09:15:00Z',
      status: 'rejected',
      documents: {
        xml: 'complemento_003.xml',
        pdf: 'complemento_003.pdf'
      },
      notes: 'Complemento rechazado por formato incorrecto'
    }
  ]);

  const [formData, setFormData] = useState<PPDFormData>({
    provider: '',
    paymentId: '',
    invoiceNumber: '',
    complementType: 'PPD',
    amount: 0,
    originalAmount: 0,
    xmlFile: null,
    pdfFile: null,
    notes: ''
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

  const validatePaymentId = (paymentId: string): string | undefined => {
    if (!paymentId.trim()) return 'El ID de pago es requerido';
    if (!/^PAY-\d{3}$/.test(paymentId)) {
      return 'El ID de pago debe tener formato PAY-XXX';
    }
    return undefined;
  };

  const validateInvoiceNumber = (invoiceNumber: string): string | undefined => {
    if (!invoiceNumber.trim()) return 'El número de factura es requerido';
    return undefined;
  };

  const validateAmount = (amount: number): string | undefined => {
    if (amount <= 0) return 'El monto debe ser mayor a 0';
    if (amount > 1000000) return 'El monto es demasiado alto';
    return undefined;
  };

  const validateOriginalAmount = (originalAmount: number): string | undefined => {
    if (originalAmount <= 0) return 'El monto original debe ser mayor a 0';
    if (originalAmount < formData.amount) {
      return 'El monto original debe ser mayor o igual al monto del complemento';
    }
    return undefined;
  };

  const validateFile = (file: File | null, fieldName: string): string | undefined => {
    if (!file) return `El archivo ${fieldName} es requerido`;
    
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return `El archivo ${fieldName} no debe exceder 10MB`;
    }

    if (fieldName === 'XML' && !file.name.toLowerCase().endsWith('.xml')) {
      return 'El archivo XML debe tener extensión .xml';
    }

    if (fieldName === 'PDF' && !file.name.toLowerCase().endsWith('.pdf')) {
      return 'El archivo PDF debe tener extensión .pdf';
    }

    return undefined;
  };

  const validateField = (name: string, value: string | number | File | null): string | undefined => {
    switch (name) {
      case 'provider':
        return validateProvider(value as string);
      case 'paymentId':
        return validatePaymentId(value as string);
      case 'invoiceNumber':
        return validateInvoiceNumber(value as string);
      case 'complementType':
        return value ? undefined : 'El tipo de complemento es requerido';
      case 'amount':
        return validateAmount(value as number);
      case 'originalAmount':
        return validateOriginalAmount(value as number);
      case 'xmlFile':
        return validateFile(value as File, 'XML');
      case 'pdfFile':
        return validateFile(value as File, 'PDF');
      case 'notes':
        return value ? undefined : undefined; // Opcional
      default:
        return undefined;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const numValue = type === 'number' ? parseFloat(value) || 0 : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: numValue
    }));

    if (touched[name]) {
      const error = validateField(name, numValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files ? files[0] : null;
    
    setFormData(prev => ({
      ...prev,
      [name]: file
    }));

    if (touched[name]) {
      const error = validateFile(file, name === 'xmlFile' ? 'XML' : 'PDF');
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const numValue = type === 'number' ? parseFloat(value) || 0 : value;
    
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

  const handleFileBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = formData[name as keyof PPDFormData] as File | null;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateFile(file, name === 'xmlFile' ? 'XML' : 'PDF');
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof PPDFormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setAlert({
        isOpen: true,
        title: 'Error de Validación',
        message: 'Por favor, corrige los errores en el formulario',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envío a API
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newComplement: PPDComplement = {
        id: Date.now().toString(),
        providerName: formData.provider,
        paymentId: formData.paymentId,
        invoiceNumber: formData.invoiceNumber,
        complementType: formData.complementType,
        amount: formData.amount,
        originalAmount: formData.originalAmount,
        remainingAmount: formData.originalAmount - formData.amount,
        uploadDate: new Date().toISOString(),
        status: 'pending',
        documents: {
          xml: formData.xmlFile?.name || '',
          pdf: formData.pdfFile?.name || ''
        },
        notes: formData.notes
      };

      setComplements(prev => [newComplement, ...prev]);
      
      setAlert({
        isOpen: true,
        title: 'Complemento Cargado',
        message: 'El complemento de pago se ha cargado exitosamente',
        type: 'success'
      });

      handleClear();
    } catch (error) {
      setAlert({
        isOpen: true,
        title: 'Error',
        message: 'Error al cargar el complemento. Intenta nuevamente.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      provider: '',
      paymentId: '',
      invoiceNumber: '',
      complementType: 'PPD',
      amount: 0,
      originalAmount: 0,
      xmlFile: null,
      pdfFile: null,
      notes: ''
    });
    setErrors({});
    setTouched({});
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, isOpen: false }));
  };

  const handleStatusChange = (complementId: string, newStatus: PPDComplement['status']) => {
    setComplements(prev => 
      prev.map(comp => 
        comp.id === complementId 
          ? { ...comp, status: newStatus }
          : comp
      )
    );
  };

  const getStatusText = (status: PPDComplement['status']) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'validated': return 'Validado';
      case 'rejected': return 'Rechazado';
      default: return 'Desconocido';
    }
  };

  const getStatusIcon = (status: PPDComplement['status']) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'validated': return '✅';
      case 'rejected': return '❌';
      default: return '❓';
    }
  };

  const getStatusColor = (status: PPDComplement['status']) => {
    switch (status) {
      case 'pending': return 'yellow';
      case 'validated': return 'green';
      case 'rejected': return 'red';
      default: return 'gray';
    }
  };

  const FormSkeleton = () => (
    <div className="form-skeleton">
      <div className="skeleton-input"></div>
      <div className="skeleton-input"></div>
      <div className="skeleton-input"></div>
      <div className="skeleton-input"></div>
      <div className="skeleton-input"></div>
      <div className="skeleton-input"></div>
      <div className="skeleton-file"></div>
      <div className="skeleton-file"></div>
      <div className="skeleton-textarea"></div>
      <div className="skeleton-button"></div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container">
        <section className="hero">
          <h1 className="hero-title">Complementos de Pago (PPD)</h1>
          <FormSkeleton />
        </section>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <section className="hero">
          <h1 className="hero-title">Complementos de Pago (PPD)</h1>
          <p className="hero-subtitle">
            Gestiona los complementos de pago parcial y PUE para mantener la contabilidad al día
          </p>

          <div className="tabs">
            <button
              className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
              onClick={() => setActiveTab('upload')}
            >
              📤 Cargar Complemento
            </button>
            <button
              className={`tab ${activeTab === 'list' ? 'active' : ''}`}
              onClick={() => setActiveTab('list')}
            >
              📋 Lista de Complementos
            </button>
          </div>

          {activeTab === 'upload' && (
            <div className="form-container">
              <form onSubmit={handleSubmit} className="form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="provider" className="form-label">
                      Proveedor *
                    </label>
                    <input
                      type="text"
                      id="provider"
                      name="provider"
                      value={formData.provider}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.provider ? 'error' : ''}`}
                      placeholder="Nombre del proveedor"
                    />
                    {errors.provider && (
                      <span className="error-message">{errors.provider}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="paymentId" className="form-label">
                      ID de Pago *
                    </label>
                    <input
                      type="text"
                      id="paymentId"
                      name="paymentId"
                      value={formData.paymentId}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.paymentId ? 'error' : ''}`}
                      placeholder="PAY-001"
                    />
                    {errors.paymentId && (
                      <span className="error-message">{errors.paymentId}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="invoiceNumber" className="form-label">
                      Número de Factura *
                    </label>
                    <input
                      type="text"
                      id="invoiceNumber"
                      name="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.invoiceNumber ? 'error' : ''}`}
                      placeholder="INV-001"
                    />
                    {errors.invoiceNumber && (
                      <span className="error-message">{errors.invoiceNumber}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="complementType" className="form-label">
                      Tipo de Complemento *
                    </label>
                    <select
                      id="complementType"
                      name="complementType"
                      value={formData.complementType}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.complementType ? 'error' : ''}`}
                    >
                      <option value="PPD">PPD - Pago en Parcialidades o Diferido</option>
                      <option value="PUE">PUE - Pago en Una Sola Exhibición</option>
                    </select>
                    {errors.complementType && (
                      <span className="error-message">{errors.complementType}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="amount" className="form-label">
                      Monto del Complemento *
                    </label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.amount ? 'error' : ''}`}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                    {errors.amount && (
                      <span className="error-message">{errors.amount}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="originalAmount" className="form-label">
                      Monto Original *
                    </label>
                    <input
                      type="number"
                      id="originalAmount"
                      name="originalAmount"
                      value={formData.originalAmount}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.originalAmount ? 'error' : ''}`}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                    {errors.originalAmount && (
                      <span className="error-message">{errors.originalAmount}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="xmlFile" className="form-label">
                    Archivo XML *
                  </label>
                  <input
                    type="file"
                    id="xmlFile"
                    name="xmlFile"
                    accept=".xml"
                    onChange={handleFileChange}
                    onBlur={handleFileBlur}
                    className={`form-input ${errors.xmlFile ? 'error' : ''}`}
                  />
                  {errors.xmlFile && (
                    <span className="error-message">{errors.xmlFile}</span>
                  )}
                  <small className="form-help">
                    Solo archivos XML válidos, máximo 10MB
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="pdfFile" className="form-label">
                    Archivo PDF *
                  </label>
                  <input
                    type="file"
                    id="pdfFile"
                    name="pdfFile"
                    accept=".pdf"
                    onChange={handleFileChange}
                    onBlur={handleFileBlur}
                    className={`form-input ${errors.pdfFile ? 'error' : ''}`}
                  />
                  {errors.pdfFile && (
                    <span className="error-message">{errors.pdfFile}</span>
                  )}
                  <small className="form-help">
                    Solo archivos PDF, máximo 10MB
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="notes" className="form-label">
                    Notas
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`form-input ${errors.notes ? 'error' : ''}`}
                    placeholder="Notas adicionales sobre el complemento..."
                    rows={3}
                  />
                  {errors.notes && (
                    <span className="error-message">{errors.notes}</span>
                  )}
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Cargando...' : 'Cargar Complemento'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClear}
                    disabled={isSubmitting}
                  >
                    Limpiar
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'list' && (
            <div className="complements-list">
              <div className="list-header">
                <h3>Complementos Registrados</h3>
                <div className="list-filters">
                  <select className="form-input">
                    <option value="">Todos los estados</option>
                    <option value="pending">Pendiente</option>
                    <option value="validated">Validado</option>
                    <option value="rejected">Rechazado</option>
                  </select>
                </div>
              </div>

              <div className="complements-grid">
                {complements.map(complement => (
                  <div key={complement.id} className="complement-card">
                    <div className="complement-header">
                      <div className="complement-info">
                        <h4>{complement.providerName}</h4>
                        <p className="complement-id">ID: {complement.paymentId}</p>
                        <p className="complement-invoice">Factura: {complement.invoiceNumber}</p>
                      </div>
                      <div className={`status-badge ${getStatusColor(complement.status)}`}>
                        {getStatusIcon(complement.status)} {getStatusText(complement.status)}
                      </div>
                    </div>

                    <div className="complement-details">
                      <div className="detail-row">
                        <span className="detail-label">Tipo:</span>
                        <span className="detail-value">{complement.complementType}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Monto:</span>
                        <span className="detail-value">${complement.amount.toLocaleString()}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Original:</span>
                        <span className="detail-value">${complement.originalAmount.toLocaleString()}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Restante:</span>
                        <span className="detail-value">${complement.remainingAmount.toLocaleString()}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Fecha:</span>
                        <span className="detail-value">
                          {new Date(complement.uploadDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="complement-documents">
                      <h5>Documentos:</h5>
                      <div className="document-links">
                        <a href="#" className="document-link">
                          📄 {complement.documents.xml}
                        </a>
                        <a href="#" className="document-link">
                          📄 {complement.documents.pdf}
                        </a>
                      </div>
                    </div>

                    {complement.notes && (
                      <div className="complement-notes">
                        <h5>Notas:</h5>
                        <p>{complement.notes}</p>
                      </div>
                    )}

                    <div className="complement-actions">
                      {complement.status === 'pending' && (
                        <>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleStatusChange(complement.id, 'validated')}
                          >
                            ✅ Validar
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleStatusChange(complement.id, 'rejected')}
                          >
                            ❌ Rechazar
                          </button>
                        </>
                      )}
                      <button className="btn btn-secondary btn-sm">
                        📋 Ver Detalles
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {alert.isOpen && createPortal(
        <CustomAlert
          isOpen={alert.isOpen}
          title={alert.title}
          message={alert.message}
          type={alert.type}
          onClose={closeAlert}
        />,
        document.body
      )}
    </>
  );
};

export default PPDComplementsPage; 