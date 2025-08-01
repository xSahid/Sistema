import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface ApprovedQuote {
  id: string;
  providerName: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  deliveryDate: string;
  status: 'approved' | 'pending';
}

const CreateOrderPage: React.FC = () => {
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);
  const [orderDetails, setOrderDetails] = useState({
    orderNumber: '',
    department: '',
    priority: 'normal',
    notes: ''
  });

  // Datos de ejemplo de cotizaciones aprobadas
  const approvedQuotes: ApprovedQuote[] = [
    {
      id: '1',
      providerName: 'Proveedor ABC',
      productName: 'Material de Construcción',
      quantity: 100,
      unitPrice: 150.00,
      totalPrice: 15000.00,
      deliveryDate: '2024-02-15',
      status: 'approved'
    },
    {
      id: '2',
      providerName: 'Suministros XYZ',
      productName: 'Equipos de Oficina',
      quantity: 50,
      unitPrice: 75.50,
      totalPrice: 3775.00,
      deliveryDate: '2024-02-20',
      status: 'approved'
    },
    {
      id: '3',
      providerName: 'Tecnología Pro',
      productName: 'Dispositivos Electrónicos',
      quantity: 25,
      unitPrice: 1200.00,
      totalPrice: 30000.00,
      deliveryDate: '2024-02-25',
      status: 'approved'
    }
  ];

  const handleQuoteSelection = (quoteId: string) => {
    setSelectedQuotes(prev => 
      prev.includes(quoteId) 
        ? prev.filter(id => id !== quoteId)
        : [...prev, quoteId]
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setOrderDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateOrder = () => {
    if (selectedQuotes.length === 0) {
      alert('Por favor selecciona al menos una cotización');
      return;
    }
    
    if (!orderDetails.orderNumber || !orderDetails.department) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    // Aquí se procesaría la creación de la orden
    console.log('Creando orden con:', { selectedQuotes, orderDetails });
    alert('Orden de compra creada exitosamente');
  };

  const getStatusIcon = (status: string) => {
    if (status === 'approved') {
      return (
        <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="management-page">
        <div className="management-page-header">
          <div className="flex items-center justify-center mb-4">
            <div className="feature-icon">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="hero-title">Crear Orden de Compra</h1>
          <p className="hero-subtitle">
            Genera órdenes de compra basadas en cotizaciones aprobadas
          </p>
        </div>

        <div className="enhanced-form">
          <div className="flex items-center gap-3 mb-6">
            <div className="feature-icon">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="hero-title">Detalles de la Orden</h2>
          </div>

          <div className="registration-form">
            <div className="form-row">
              <div className="form-field">
                <label className="hero-subtitle">
                  <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Número de Orden *
                </label>
                <input
                  type="text"
                  value={orderDetails.orderNumber}
                  onChange={(e) => handleInputChange('orderNumber', e.target.value)}
                  placeholder="PO-2024-001"
                  className="form-input"
                />
              </div>

              <div className="form-field">
                <label className="hero-subtitle">
                  <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Departamento *
                </label>
                <select
                  value={orderDetails.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="form-input"
                >
                  <option value="">Seleccionar departamento</option>
                  <option value="compras">Compras</option>
                  <option value="logistica">Logística</option>
                  <option value="mantenimiento">Mantenimiento</option>
                  <option value="tecnologia">Tecnología</option>
                  <option value="administracion">Administración</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="hero-subtitle">
                  <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                  </svg>
                  Prioridad
                </label>
                <select
                  value={orderDetails.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="form-input"
                >
                  <option value="low">Baja</option>
                  <option value="normal">Normal</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>

              <div className="form-field">
                <label className="hero-subtitle">
                  <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Notas Adicionales
                </label>
                <textarea
                  value={orderDetails.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Observaciones especiales..."
                  className="form-input"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="enhanced-form mt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="feature-icon">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="hero-title">Cotizaciones Aprobadas</h2>
          </div>

          <div className="enhanced-table">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="hero-subtitle">
                    <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Proveedor
                  </th>
                  <th className="hero-subtitle">
                    <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    Producto
                  </th>
                  <th className="hero-subtitle">
                    <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    Cantidad
                  </th>
                  <th className="hero-subtitle">
                    <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Precio Unitario
                  </th>
                  <th className="hero-subtitle">
                    <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Total
                  </th>
                  <th className="hero-subtitle">
                    <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Fecha Entrega
                  </th>
                  <th className="hero-subtitle">
                    <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Estado
                  </th>
                  <th className="hero-subtitle">Seleccionar</th>
                </tr>
              </thead>
              <tbody>
                {approvedQuotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-opacity-50">
                    <td className="hero-subtitle">{quote.providerName}</td>
                    <td className="hero-subtitle">{quote.productName}</td>
                    <td className="hero-subtitle">{quote.quantity}</td>
                    <td className="hero-subtitle">${quote.unitPrice.toFixed(2)}</td>
                    <td className="hero-subtitle">${quote.totalPrice.toFixed(2)}</td>
                    <td className="hero-subtitle">{quote.deliveryDate}</td>
                    <td>
                      <span className="status-badge approved">
                        {getStatusIcon(quote.status)}
                        Aprobada
                      </span>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedQuotes.includes(quote.id)}
                        onChange={() => handleQuoteSelection(quote.id)}
                        className="form-checkbox"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleCreateOrder}
              className="btn-enhanced"
              disabled={selectedQuotes.length === 0}
            >
              <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Crear Orden de Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage; 