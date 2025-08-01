import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Payment {
  id: string;
  providerName: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  description: string;
  invoiceNumber: string;
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

  const handleStatusChange = (paymentId: string, newStatus: Payment['status']) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId ? { ...payment, status: newStatus } : payment
    ));
  };

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'paid': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
          <h1 className="hero-title">Gestión de Pagos</h1>
          <p className="hero-subtitle">
            Programa y revisa los pagos a proveedores de manera organizada y eficiente
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
                <h2 className="hero-title">Programar Nuevo Pago</h2>
              </div>
              <form className="registration-form">
                <div className="form-row">
                  <div className="form-field">
                    <label>
                      <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                      Proveedor
                    </label>
                    <select>
                      <option value="">Seleccionar proveedor</option>
                      <option value="provider1">Proveedor ABC</option>
                      <option value="provider2">Proveedor XYZ</option>
                      <option value="provider3">Proveedor DEF</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>
                      <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                      </svg>
                      Monto
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="form-field">
                    <label>
                      <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      Fecha de Vencimiento
                    </label>
                    <input
                      type="date"
                    />
                  </div>
                  <div className="form-field">
                    <label>
                      <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      Número de Factura
                    </label>
                    <input
                      type="text"
                      placeholder="INV-XXX"
                    />
                  </div>
                </div>
                <div className="form-field full-width">
                  <label>
                    <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Descripción
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Descripción del pago..."
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn-enhanced btn-enhanced-primary"
                  >
                    <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Programar Pago
                  </button>
                </div>
              </form>
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
    </div>
  );
};

export default FinancePayments; 