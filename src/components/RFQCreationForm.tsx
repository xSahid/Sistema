import React, { useState } from 'react';

interface RFQFormData {
  title: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  deadline: string;
  budget: number;
  requirements: string;
}

const RFQCreationForm: React.FC = () => {
  const [formData, setFormData] = useState<RFQFormData>({
    title: '',
    description: '',
    category: '',
    quantity: 0,
    unit: '',
    deadline: '',
    budget: 0,
    requirements: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('RFQ Data:', formData);
    // Aquí se enviaría la data al backend
    alert('Solicitud de cotización creada exitosamente');
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <div className="form-row">
        <div className="form-field">
          <label>
            <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            Título de la Solicitud *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Ej: Suministro de equipos de cómputo"
          />
        </div>
        
        <div className="form-field">
          <label>
            <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Categoría *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar categoría</option>
            <option value="equipment">Equipos y Tecnología</option>
            <option value="services">Servicios</option>
            <option value="materials">Materiales</option>
            <option value="supplies">Suministros</option>
            <option value="construction">Construcción</option>
          </select>
        </div>
      </div>

      <div className="form-field full-width">
        <label>
          <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Descripción Detallada *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={4}
          placeholder="Describe detalladamente lo que necesitas..."
        />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label>
            <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Cantidad *
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
            min="1"
          />
        </div>
        
        <div className="form-field">
          <label>
            <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Unidad
          </label>
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleInputChange}
            placeholder="Ej: piezas, kg, horas"
          />
        </div>
        
        <div className="form-field">
          <label>
            <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
            </svg>
            Presupuesto Estimado
          </label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            min="0"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="form-field full-width">
        <label>
          <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Fecha Límite para Cotizaciones *
        </label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-field full-width">
        <label>
          <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Requisitos Específicos
        </label>
        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleInputChange}
          rows={3}
          placeholder="Especificaciones técnicas, certificaciones requeridas, etc."
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => setFormData({
            title: '',
            description: '',
            category: '',
            quantity: 0,
            unit: '',
            deadline: '',
            budget: 0,
            requirements: '',
          })}
          className="btn-enhanced btn-enhanced-secondary"
        >
          <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Limpiar
        </button>
        <button
          type="submit"
          className="btn-enhanced btn-enhanced-primary"
        >
          <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Crear Solicitud
        </button>
      </div>
    </form>
  );
};

export default RFQCreationForm; 