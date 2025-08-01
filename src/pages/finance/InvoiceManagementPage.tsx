import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CustomAlert from '../../components/CustomAlert';

interface Invoice {
  id: string;
  providerId: string;
  providerName: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  status: 'pending' | 'approved' | 'rejected' | 'paid' | 'partial';
  xmlFile: string;
  pdfFile: string;
  uploadedBy: string;
  uploadDate: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectionReason?: string;
  paymentPlan?: {
    totalAmount: number;
    paidAmount: number;
    remainingAmount: number;
    installments: PaymentInstallment[];
  };
}

interface PaymentInstallment {
  id: string;
  invoiceId: string;
  installmentNumber: number;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  paymentDate?: string;
}

const InvoiceManagementPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showPaymentPlanModal, setShowPaymentPlanModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'upload'>('list');

  const [formData, setFormData] = useState({
    providerId: '',
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    amount: '',
    taxAmount: '',
    description: '',
    xmlFile: null as File | null,
    pdfFile: null as File | null
  });

  const [paymentPlanData, setPaymentPlanData] = useState({
    totalAmount: 0,
    numberOfInstallments: 1,
    firstPaymentDate: '',
    paymentFrequency: 'monthly' as 'monthly' | 'biweekly' | 'weekly'
  });

  // Datos de ejemplo
  useEffect(() => {
    const mockInvoices: Invoice[] = [
      {
        id: '1',
        providerId: '1',
        providerName: 'Proveedor ABC S.A. de C.V.',
        invoiceNumber: 'FAC-2025-001',
        invoiceDate: '2025-01-15',
        dueDate: '2025-02-15',
        amount: 50000.00,
        taxAmount: 8000.00,
        totalAmount: 58000.00,
        status: 'approved',
        xmlFile: 'factura_001.xml',
        pdfFile: 'factura_001.pdf',
        uploadedBy: 'Proveedor ABC',
        uploadDate: '2025-01-15T10:30:00',
        approvedBy: 'Finanzas',
        approvedDate: '2025-01-16T14:20:00',
        paymentPlan: {
          totalAmount: 58000.00,
          paidAmount: 29000.00,
          remainingAmount: 29000.00,
          installments: [
            {
              id: '1',
              invoiceId: '1',
              installmentNumber: 1,
              amount: 29000.00,
              dueDate: '2025-02-15',
              status: 'paid',
              paymentDate: '2025-02-10'
            },
            {
              id: '2',
              invoiceId: '1',
              installmentNumber: 2,
              amount: 29000.00,
              dueDate: '2025-03-15',
              status: 'pending'
            }
          ]
        }
      },
      {
        id: '2',
        providerId: '2',
        providerName: 'Servicios XYZ Ltda.',
        invoiceNumber: 'FAC-2025-002',
        invoiceDate: '2025-01-20',
        dueDate: '2025-02-20',
        amount: 75000.00,
        taxAmount: 12000.00,
        totalAmount: 87000.00,
        status: 'pending',
        xmlFile: 'factura_002.xml',
        pdfFile: 'factura_002.pdf',
        uploadedBy: 'Servicios XYZ',
        uploadDate: '2025-01-20T09:15:00'
      }
    ];
    setInvoices(mockInvoices);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const validateForm = () => {
    if (!formData.providerId || !formData.invoiceNumber || !formData.invoiceDate || 
        !formData.amount || !formData.xmlFile || !formData.pdfFile) {
      setAlertMessage('Por favor, completa todos los campos obligatorios.');
      setAlertType('error');
      setShowAlert(true);
      return false;
    }

    if (parseFloat(formData.amount) <= 0) {
      setAlertMessage('El monto debe ser mayor a 0.');
      setAlertType('error');
      setShowAlert(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulación de carga de factura
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newInvoice: Invoice = {
        id: Date.now().toString(),
        providerId: formData.providerId,
        providerName: 'Proveedor Ejemplo',
        invoiceNumber: formData.invoiceNumber,
        invoiceDate: formData.invoiceDate,
        dueDate: formData.dueDate,
        amount: parseFloat(formData.amount),
        taxAmount: parseFloat(formData.taxAmount) || 0,
        totalAmount: parseFloat(formData.amount) + (parseFloat(formData.taxAmount) || 0),
        status: 'pending',
        xmlFile: formData.xmlFile?.name || '',
        pdfFile: formData.pdfFile?.name || '',
        uploadedBy: 'Proveedor',
        uploadDate: new Date().toISOString()
      };

      setInvoices(prev => [newInvoice, ...prev]);
      setFormData({
        providerId: '',
        invoiceNumber: '',
        invoiceDate: '',
        dueDate: '',
        amount: '',
        taxAmount: '',
        description: '',
        xmlFile: null,
        pdfFile: null
      });

      setAlertMessage('Factura cargada exitosamente. Pendiente de aprobación.');
      setAlertType('success');
      setShowAlert(true);
      setActiveTab('list');
    } catch (error) {
      setAlertMessage('Error al cargar la factura. Por favor, intenta nuevamente.');
      setAlertType('error');
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApproveInvoice = (invoiceId: string) => {
    setInvoices(prev => prev.map(invoice => 
      invoice.id === invoiceId 
        ? { ...invoice, status: 'approved', approvedBy: 'Finanzas', approvedDate: new Date().toISOString() }
        : invoice
    ));
    setAlertMessage('Factura aprobada exitosamente.');
    setAlertType('success');
    setShowAlert(true);
  };

  const handleRejectInvoice = (invoiceId: string, reason: string) => {
    setInvoices(prev => prev.map(invoice => 
      invoice.id === invoiceId 
        ? { ...invoice, status: 'rejected', rejectionReason: reason }
        : invoice
    ));
    setAlertMessage('Factura rechazada.');
    setAlertType('error');
    setShowAlert(true);
  };

  const handleCreatePaymentPlan = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setPaymentPlanData({
      totalAmount: invoice.totalAmount,
      numberOfInstallments: 1,
      firstPaymentDate: '',
      paymentFrequency: 'monthly'
    });
    setShowPaymentPlanModal(true);
  };

  const handlePaymentPlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;

    // Simulación de creación de plan de pagos
    const installments: PaymentInstallment[] = [];
    const installmentAmount = paymentPlanData.totalAmount / paymentPlanData.numberOfInstallments;
    
    for (let i = 0; i < paymentPlanData.numberOfInstallments; i++) {
      const dueDate = new Date(paymentPlanData.firstPaymentDate);
      dueDate.setDate(dueDate.getDate() + (i * 30)); // Aproximado

      installments.push({
        id: `${selectedInvoice.id}-${i + 1}`,
        invoiceId: selectedInvoice.id,
        installmentNumber: i + 1,
        amount: installmentAmount,
        dueDate: dueDate.toISOString().split('T')[0],
        status: 'pending'
      });
    }

    setInvoices(prev => prev.map(invoice => 
      invoice.id === selectedInvoice.id 
        ? {
            ...invoice,
            paymentPlan: {
              totalAmount: paymentPlanData.totalAmount,
              paidAmount: 0,
              remainingAmount: paymentPlanData.totalAmount,
              installments
            }
          }
        : invoice
    ));

    setShowPaymentPlanModal(false);
    setAlertMessage('Plan de pagos creado exitosamente.');
    setAlertType('success');
    setShowAlert(true);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'status-badge-pending',
      approved: 'status-badge-approved',
      rejected: 'status-badge-rejected',
      paid: 'status-badge-paid',
      partial: 'status-badge-partial'
    };
    return badges[status as keyof typeof badges] || 'status-badge-pending';
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: 'Pendiente',
      approved: 'Aprobada',
      rejected: 'Rechazada',
      paid: 'Pagada',
      partial: 'Pago Parcial'
    };
    return texts[status as keyof typeof texts] || status;
  };

  return (
    <div className="container">
      <div className="management-page">
        <div className="management-page-header">
          <h1 className="management-page-title">
            <span className="feature-icon">📄</span>
            Gestión de Facturas
          </h1>
          <p className="management-page-subtitle">
            Registra, valida y gestiona facturas de proveedores
          </p>
        </div>

        <div className="tab-navigation">
          <ul className="tab-list">
            <li className="tab-item">
              <button 
                className={`tab-button ${activeTab === 'list' ? 'active' : ''}`}
                onClick={() => setActiveTab('list')}
              >
                📋 Lista de Facturas
              </button>
            </li>
            <li className="tab-item">
              <button 
                className={`tab-button ${activeTab === 'upload' ? 'active' : ''}`}
                onClick={() => setActiveTab('upload')}
              >
                📤 Cargar Factura
              </button>
            </li>
          </ul>
        </div>

        <div className="tab-content">
          {activeTab === 'list' && (
            <div className="tab-panel active">
              <div className="enhanced-table-container">
                <table className="enhanced-table">
                  <thead>
                    <tr>
                      <th>Proveedor</th>
                      <th>Número</th>
                      <th>Fecha</th>
                      <th>Monto</th>
                      <th>Estatus</th>
                      <th>Plan de Pagos</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td>
                          <div>
                            <div className="hero-title">{invoice.providerName}</div>
                            <div className="hero-subtitle">ID: {invoice.providerId}</div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <div className="hero-title">{invoice.invoiceNumber}</div>
                            <div className="hero-subtitle">Vence: {new Date(invoice.dueDate).toLocaleDateString()}</div>
                          </div>
                        </td>
                        <td>
                          <div className="hero-subtitle">
                            {new Date(invoice.invoiceDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td>
                          <div>
                            <div className="hero-title">${invoice.totalAmount.toLocaleString()}</div>
                            <div className="hero-subtitle">Base: ${invoice.amount.toLocaleString()}</div>
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge ${getStatusBadge(invoice.status)}`}>
                            {getStatusText(invoice.status)}
                          </span>
                        </td>
                        <td>
                          {invoice.paymentPlan ? (
                            <div>
                              <div className="hero-title">${invoice.paymentPlan.paidAmount.toLocaleString()} / ${invoice.paymentPlan.totalAmount.toLocaleString()}</div>
                              <div className="hero-subtitle">{invoice.paymentPlan.installments.filter(i => i.status === 'paid').length} de {invoice.paymentPlan.installments.length} pagos</div>
                            </div>
                          ) : (
                            <span className="hero-subtitle">Sin plan</span>
                          )}
                        </td>
                        <td>
                          <div className="space-x-2">
                            {invoice.status === 'pending' && (
                              <>
                                <button 
                                  className="btn-enhanced btn-enhanced-success"
                                  onClick={() => handleApproveInvoice(invoice.id)}
                                >
                                  <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Aprobar
                                </button>
                                <button 
                                  className="btn-enhanced btn-enhanced-danger"
                                  onClick={() => handleRejectInvoice(invoice.id, 'Rechazada por validación')}
                                >
                                  <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  Rechazar
                                </button>
                              </>
                            )}
                            {invoice.status === 'approved' && !invoice.paymentPlan && (
                              <button 
                                className="btn-enhanced btn-enhanced-primary"
                                onClick={() => handleCreatePaymentPlan(invoice)}
                              >
                                <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                                Crear Plan de Pagos
                              </button>
                            )}
                            <button className="btn-enhanced btn-enhanced-secondary">
                              <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              Ver
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="tab-panel active">
              <form onSubmit={handleSubmit} className="enhanced-form">
                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <span>📄</span>
                    </div>
                    <div>
                      <h3 className="section-title">Información de la Factura</h3>
                      <p className="section-description">
                        Completa los datos de la factura y adjunta los archivos
                      </p>
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-field-modern">
                      <label className="field-label">
                        <span className="label-text">Proveedor</span>
                        <span className="required-indicator">*</span>
                      </label>
                      <div className="input-container">
                        <span className="input-icon">🏢</span>
                        <select
                          name="providerId"
                          value={formData.providerId}
                          onChange={handleInputChange}
                          className="modern-select"
                          required
                        >
                          <option value="">Seleccionar proveedor</option>
                          <option value="1">Proveedor ABC S.A. de C.V.</option>
                          <option value="2">Servicios XYZ Ltda.</option>
                          <option value="3">Suministros 123</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-field-modern">
                      <label className="field-label">
                        <span className="label-text">Número de Factura</span>
                        <span className="required-indicator">*</span>
                      </label>
                      <div className="input-container">
                        <span className="input-icon">🔢</span>
                        <input
                          type="text"
                          name="invoiceNumber"
                          value={formData.invoiceNumber}
                          onChange={handleInputChange}
                          className="modern-input"
                          placeholder="FAC-2025-001"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-field-modern">
                      <label className="field-label">
                        <span className="label-text">Fecha de Factura</span>
                        <span className="required-indicator">*</span>
                      </label>
                      <div className="input-container">
                        <span className="input-icon">📅</span>
                        <input
                          type="date"
                          name="invoiceDate"
                          value={formData.invoiceDate}
                          onChange={handleInputChange}
                          className="modern-input"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-field-modern">
                      <label className="field-label">
                        <span className="label-text">Fecha de Vencimiento</span>
                        <span className="required-indicator">*</span>
                      </label>
                      <div className="input-container">
                        <span className="input-icon">⏰</span>
                        <input
                          type="date"
                          name="dueDate"
                          value={formData.dueDate}
                          onChange={handleInputChange}
                          className="modern-input"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-field-modern">
                      <label className="field-label">
                        <span className="label-text">Monto Base</span>
                        <span className="required-indicator">*</span>
                      </label>
                      <div className="input-container">
                        <span className="input-icon">💰</span>
                        <input
                          type="number"
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          className="modern-input"
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-field-modern">
                      <label className="field-label">
                        <span className="label-text">IVA</span>
                      </label>
                      <div className="input-container">
                        <span className="input-icon">📊</span>
                        <input
                          type="number"
                          name="taxAmount"
                          value={formData.taxAmount}
                          onChange={handleInputChange}
                          className="modern-input"
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-field-modern full-width">
                    <label className="field-label">
                      <span className="label-text">Descripción</span>
                    </label>
                    <div className="input-container">
                      <span className="input-icon">📝</span>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="modern-textarea"
                        placeholder="Descripción de los servicios o productos facturados"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <span>📎</span>
                    </div>
                    <div>
                      <h3 className="section-title">Archivos de la Factura</h3>
                      <p className="section-description">
                        Adjunta el XML y PDF de la factura
                      </p>
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-field-modern">
                      <label className="field-label">
                        <span className="label-text">Archivo XML</span>
                        <span className="required-indicator">*</span>
                      </label>
                      <div className="input-container">
                        <span className="input-icon">📄</span>
                        <input
                          type="file"
                          name="xmlFile"
                          onChange={handleFileChange}
                          className="modern-input"
                          accept=".xml"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-field-modern">
                      <label className="field-label">
                        <span className="label-text">Archivo PDF</span>
                        <span className="required-indicator">*</span>
                      </label>
                      <div className="input-container">
                        <span className="input-icon">📄</span>
                        <input
                          type="file"
                          name="pdfFile"
                          onChange={handleFileChange}
                          className="modern-input"
                          accept=".pdf"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className={`action-btn primary-btn ${isSubmitting ? 'submitting' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="btn-icon spinning" fill="none" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="31.416" strokeDashoffset="31.416">
                            <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                            <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                          </circle>
                        </svg>
                        Cargando factura...
                      </>
                    ) : (
                      <>
                        <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Cargar Factura
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Plan de Pagos */}
      {showPaymentPlanModal && selectedInvoice && (
        <div className="enhanced-modal-overlay">
          <div className="enhanced-modal">
            <div className="enhanced-modal-header">
              <h3 className="enhanced-modal-title">Crear Plan de Pagos</h3>
              <button 
                className="enhanced-modal-close"
                onClick={() => setShowPaymentPlanModal(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handlePaymentPlanSubmit} className="enhanced-modal-body">
              <div className="form-section">
                <div className="form-grid">
                  <div className="form-field-modern">
                    <label className="field-label">
                      <span className="label-text">Monto Total</span>
                    </label>
                    <div className="input-container">
                      <span className="input-icon">💰</span>
                      <input
                        type="number"
                        value={paymentPlanData.totalAmount}
                        onChange={(e) => setPaymentPlanData(prev => ({ ...prev, totalAmount: parseFloat(e.target.value) }))}
                        className="modern-input"
                        step="0.01"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field-modern">
                    <label className="field-label">
                      <span className="label-text">Número de Pagos</span>
                    </label>
                    <div className="input-container">
                      <span className="input-icon">🔢</span>
                      <input
                        type="number"
                        value={paymentPlanData.numberOfInstallments}
                        onChange={(e) => setPaymentPlanData(prev => ({ ...prev, numberOfInstallments: parseInt(e.target.value) }))}
                        className="modern-input"
                        min="1"
                        max="12"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field-modern">
                    <label className="field-label">
                      <span className="label-text">Frecuencia</span>
                    </label>
                    <div className="input-container">
                      <span className="input-icon">📅</span>
                      <select
                        value={paymentPlanData.paymentFrequency}
                        onChange={(e) => setPaymentPlanData(prev => ({ ...prev, paymentFrequency: e.target.value as any }))}
                        className="modern-select"
                        required
                      >
                        <option value="monthly">Mensual</option>
                        <option value="biweekly">Quincenal</option>
                        <option value="weekly">Semanal</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field-modern">
                    <label className="field-label">
                      <span className="label-text">Primer Pago</span>
                    </label>
                    <div className="input-container">
                      <span className="input-icon">📅</span>
                      <input
                        type="date"
                        value={paymentPlanData.firstPaymentDate}
                        onChange={(e) => setPaymentPlanData(prev => ({ ...prev, firstPaymentDate: e.target.value }))}
                        className="modern-input"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="enhanced-modal-footer">
              <button 
                className="action-btn secondary-btn"
                onClick={() => setShowPaymentPlanModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="action-btn primary-btn"
                onClick={handlePaymentPlanSubmit}
              >
                Crear Plan de Pagos
              </button>
            </div>
          </div>
        </div>
      )}

      {showAlert && (
        <CustomAlert
          type={alertType}
          title={alertType === 'success' ? '¡Éxito!' : 'Error'}
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default InvoiceManagementPage; 