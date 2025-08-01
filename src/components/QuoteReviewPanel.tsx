import React, { useState } from 'react';

interface Quote {
  id: string;
  providerName: string;
  amount: number;
  description: string;
  deliveryTime: string;
  validity: string;
  status: 'pending' | 'approved' | 'rejected';
}

const QuoteReviewPanel: React.FC = () => {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [quotes] = useState<Quote[]>([
    {
      id: '1',
      providerName: 'Proveedor ABC',
      amount: 15000,
      description: 'Suministro de equipos de cómputo de alta calidad',
      deliveryTime: '15 días',
      validity: '30 días',
      status: 'pending'
    },
    {
      id: '2',
      providerName: 'Proveedor XYZ',
      amount: 18000,
      description: 'Equipos de cómputo con garantía extendida',
      deliveryTime: '10 días',
      validity: '45 días',
      status: 'pending'
    },
    {
      id: '3',
      providerName: 'Proveedor DEF',
      amount: 12000,
      description: 'Equipos básicos de cómputo',
      deliveryTime: '20 días',
      validity: '30 días',
      status: 'pending'
    }
  ]);

  const handleStatusChange = (quoteId: string, newStatus: Quote['status']) => {
    // Aquí se actualizaría el estado de la cotización
    console.log(`Cotización ${quoteId} ${newStatus}`);
  };

  const getStatusIcon = (status: Quote['status']) => {
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

  if (quotes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="feature-icon mx-auto mb-4">
          <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="hero-title mb-2">No hay cotizaciones para revisar</h3>
        <p className="hero-subtitle">Las cotizaciones recibidas aparecerán aquí para su revisión</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quotes.map((quote) => (
          <div
            key={quote.id}
            className="quote-card cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => setSelectedQuote(quote)}
          >
            <div className="quote-header">
              <div className="flex items-center justify-between mb-3">
                <h3 className="hero-title text-lg font-semibold">{quote.providerName}</h3>
                <div className="flex items-center gap-2">
                  {getStatusIcon(quote.status)}
                  <span className={`status-badge status-badge-${quote.status}`}>
                    {quote.status === 'pending' ? 'Pendiente' : 
                     quote.status === 'approved' ? 'Aprobada' : 'Rechazada'}
                  </span>
                </div>
              </div>
              <div className="quote-amount">
                <span className="hero-title text-2xl font-bold">${quote.amount.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="quote-details">
              <div className="quote-detail-item">
                <span className="quote-detail-label">
                  <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Descripción:
                </span>
                <p className="hero-subtitle">{quote.description}</p>
              </div>
              
              <div className="quote-detail-item">
                <span className="quote-detail-label">
                  <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Tiempo de Entrega:
                </span>
                <span className="hero-subtitle">{quote.deliveryTime}</span>
              </div>
              
              <div className="quote-detail-item">
                <span className="quote-detail-label">
                  <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Validez:
                </span>
                <span className="hero-subtitle">{quote.validity}</span>
              </div>
            </div>
            
            {quote.status === 'pending' && (
              <div className="quote-actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(quote.id, 'approved');
                  }}
                  className="btn-enhanced btn-enhanced-success"
                >
                  <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Aprobar
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(quote.id, 'rejected');
                  }}
                  className="btn-enhanced btn-enhanced-danger"
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

      {/* Modal para detalles de la cotización */}
      {selectedQuote && (
        <div className="enhanced-modal-overlay" onClick={() => setSelectedQuote(null)}>
          <div className="enhanced-modal" onClick={(e) => e.stopPropagation()}>
            <div className="enhanced-modal-header">
              <h3 className="enhanced-modal-title">
                <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                Detalles de la Cotización
              </h3>
              <button
                className="enhanced-modal-close"
                onClick={() => setSelectedQuote(null)}
              >
                <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="enhanced-modal-body">
              <div className="space-y-4">
                <div>
                  <h3 className="hero-title">Proveedor</h3>
                  <p className="hero-subtitle">{selectedQuote.providerName}</p>
                </div>
                <div>
                  <h3 className="hero-title">Monto</h3>
                  <p className="hero-subtitle">${selectedQuote.amount.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="hero-title">Descripción</h3>
                  <p className="hero-subtitle">{selectedQuote.description}</p>
                </div>
                <div>
                  <h3 className="hero-title">Tiempo de Entrega</h3>
                  <p className="hero-subtitle">{selectedQuote.deliveryTime}</p>
                </div>
                <div>
                  <h3 className="hero-title">Validez de la Oferta</h3>
                  <p className="hero-subtitle">{selectedQuote.validity}</p>
                </div>
              </div>
            </div>
            <div className="enhanced-modal-footer">
              <button
                className="btn-enhanced btn-enhanced-secondary"
                onClick={() => setSelectedQuote(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteReviewPanel; 