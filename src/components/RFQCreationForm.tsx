import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CustomAlert from './CustomAlert';

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

interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
  quantity?: string;
  unit?: string;
  deadline?: string;
  budget?: string;
  requirements?: string;
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
  const validateTitle = (title: string): string | undefined => {
    if (!title.trim()) return 'El título de la solicitud es requerido';
    if (title.length < 10) return 'El título debe tener al menos 10 caracteres';
    if (title.length > 200) return 'El título es demasiado largo';
    return undefined;
  };

  const validateDescription = (description: string): string | undefined => {
    if (!description.trim()) return 'La descripción es requerida';
    if (description.length < 50) return 'La descripción debe tener al menos 50 caracteres';
    if (description.length > 2000) return 'La descripción es demasiado larga';
    return undefined;
  };

  const validateCategory = (category: string): string | undefined => {
    if (!category.trim()) return 'La categoría es requerida';
    return undefined;
  };

  const validateQuantity = (quantity: number): string | undefined => {
    if (!quantity || quantity <= 0) return 'La cantidad debe ser mayor a 0';
    if (quantity > 999999) return 'La cantidad es demasiado alta';
    return undefined;
  };

  const validateUnit = (unit: string): string | undefined => {
    if (unit && unit.length > 50) return 'La unidad es demasiado larga';
    return undefined;
  };

  const validateDeadline = (deadline: string): string | undefined => {
    if (!deadline) return 'La fecha límite es requerida';
    
    const selectedDate = new Date(deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate <= today) return 'La fecha límite debe ser posterior a hoy';
    
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 2);
    if (selectedDate > maxDate) return 'La fecha límite no puede ser más de 2 años en el futuro';
    
    return undefined;
  };

  const validateBudget = (budget: number): string | undefined => {
    if (budget < 0) return 'El presupuesto no puede ser negativo';
    if (budget > 999999999) return 'El presupuesto es demasiado alto';
    return undefined;
  };

  const validateRequirements = (requirements: string): string | undefined => {
    if (requirements && requirements.length > 1000) return 'Los requisitos son demasiado largos';
    return undefined;
  };

  const validateField = (name: string, value: string | number): string | undefined => {
    switch (name) {
      case 'title':
        return validateTitle(value as string);
      
      case 'description':
        return validateDescription(value as string);
      
      case 'category':
        return validateCategory(value as string);
      
      case 'quantity':
        return validateQuantity(value as number);
      
      case 'unit':
        return validateUnit(value as string);
      
      case 'deadline':
        return validateDeadline(value as string);
      
      case 'budget':
        return validateBudget(value as number);
      
      case 'requirements':
        return validateRequirements(value as string);
      
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
      const error = validateField(key, formData[key as keyof RFQFormData]);
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
        
        console.log('RFQ Data:', formData);
        
        setAlert({
          isOpen: true,
          title: 'Solicitud Creada',
          message: 'Tu solicitud de cotización ha sido creada exitosamente. Los proveedores recibirán tu solicitud y podrás revisar las cotizaciones en la sección correspondiente.',
          type: 'success'
        });
        
        // Limpiar formulario después del éxito
        handleClear();
        
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        setAlert({
          isOpen: true,
          title: 'Error de Envío',
          message: 'Error al enviar el formulario. Por favor, intenta nuevamente.',
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
      title: '',
      description: '',
      category: '',
      quantity: 0,
      unit: '',
      deadline: '',
      budget: 0,
      requirements: '',
    });
    setErrors({});
    setTouched({});
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, isOpen: false }));
  };

  // Componente Skeleton
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
      
      <div className="skeleton-form-field full-width">
        <div className="skeleton-label skeleton"></div>
        <div className="skeleton-textarea skeleton"></div>
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

  if (isLoading) {
    return <FormSkeleton />;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="registration-form form-entrance-animation">
        <div className="form-row form-row-entrance">
          <div className="form-field form-field-entrance">
            <label>Título de la Solicitud *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              placeholder="Ej: Suministro de equipos de cómputo"
              className={errors.title && touched.title ? 'error' : ''}
            />
            {errors.title && touched.title && (
              <span className="error-message">{errors.title}</span>
            )}
          </div>
          
          <div className="form-field form-field-entrance">
            <label>Categoría *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              className={errors.category && touched.category ? 'error' : ''}
            >
              <option value="">Seleccionar categoría</option>
              <option value="equipment">Equipos y Tecnología</option>
              <option value="services">Servicios</option>
              <option value="materials">Materiales</option>
              <option value="supplies">Suministros</option>
              <option value="construction">Construcción</option>
            </select>
            {errors.category && touched.category && (
              <span className="error-message">{errors.category}</span>
            )}
          </div>
        </div>

        <div className="form-field full-width form-field-entrance">
          <label>Descripción Detallada *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
            rows={4}
            placeholder="Describe detalladamente lo que necesitas, incluyendo especificaciones técnicas, características requeridas, etc."
            className={errors.description && touched.description ? 'error' : ''}
          />
          {errors.description && touched.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>

        <div className="form-row form-row-entrance">
          <div className="form-field form-field-entrance">
            <label>Cantidad *</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              min="1"
              className={errors.quantity && touched.quantity ? 'error' : ''}
            />
            {errors.quantity && touched.quantity && (
              <span className="error-message">{errors.quantity}</span>
            )}
          </div>
          
          <div className="form-field form-field-entrance">
            <label>Unidad</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Ej: piezas, kg, horas"
              className={errors.unit && touched.unit ? 'error' : ''}
            />
            {errors.unit && touched.unit && (
              <span className="error-message">{errors.unit}</span>
            )}
          </div>
        </div>

        <div className="form-row form-row-entrance">
          <div className="form-field form-field-entrance">
            <label>Presupuesto Estimado</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              onBlur={handleBlur}
              min="0"
              placeholder="0.00"
              className={errors.budget && touched.budget ? 'error' : ''}
            />
            {errors.budget && touched.budget && (
              <span className="error-message">{errors.budget}</span>
            )}
          </div>
          
          <div className="form-field form-field-entrance">
            <label>Fecha Límite *</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              className={errors.deadline && touched.deadline ? 'error' : ''}
            />
            {errors.deadline && touched.deadline && (
              <span className="error-message">{errors.deadline}</span>
            )}
          </div>
        </div>

        <div className="form-field full-width form-field-entrance">
          <label>Requisitos Específicos</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            onBlur={handleBlur}
            rows={3}
            placeholder="Especificaciones técnicas, certificaciones requeridas, estándares de calidad, etc."
            className={errors.requirements && touched.requirements ? 'error' : ''}
          />
          {errors.requirements && touched.requirements && (
            <span className="error-message">{errors.requirements}</span>
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
                Crear Solicitud
              </>
            )}
          </button>
        </div>
      </form>

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
    </>
  );
};

export default RFQCreationForm; 