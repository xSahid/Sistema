import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CustomAlert from '../../components/CustomAlert';

interface RFQFormData {
  title: string;
  description: string;
  category: string;
  budget: number;
  deadline: string;
  requirements: string;
  selectedProviders: string[];
}

interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
  budget?: string;
  deadline?: string;
  requirements?: string;
  selectedProviders?: string;
}

interface Provider {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'pending' | 'inactive';
}

const NewRequestPage: React.FC = () => {
  const [formData, setFormData] = useState<RFQFormData>({
    title: '',
    description: '',
    category: '',
    budget: 0,
    deadline: '',
    requirements: '',
    selectedProviders: [],
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

  // Simular proveedores disponibles
  const [availableProviders, setAvailableProviders] = useState<Provider[]>([
    { id: '1', name: 'Proveedor ABC', category: 'tecnologia', status: 'active' },
    { id: '2', name: 'Proveedor XYZ', category: 'servicios', status: 'active' },
    { id: '3', name: 'Proveedor DEF', category: 'materiales', status: 'active' },
    { id: '4', name: 'Proveedor GHI', category: 'tecnologia', status: 'active' },
    { id: '5', name: 'Proveedor JKL', category: 'servicios', status: 'active' },
  ]);

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Validaciones específicas
  const validateTitle = (title: string): string | undefined => {
    if (!title.trim()) return 'El título es requerido';
    if (title.length < 5) return 'El título debe tener al menos 5 caracteres';
    if (title.length > 100) return 'El título es demasiado largo';
    return undefined;
  };

  const validateDescription = (description: string): string | undefined => {
    if (!description.trim()) return 'La descripción es requerida';
    if (description.length < 20) return 'La descripción debe tener al menos 20 caracteres';
    if (description.length > 1000) return 'La descripción es demasiado larga';
    return undefined;
  };

  const validateBudget = (budget: number): string | undefined => {
    if (!budget || budget <= 0) return 'El presupuesto debe ser mayor a 0';
    if (budget > 999999999) return 'El presupuesto es demasiado alto';
    return undefined;
  };

  const validateDeadline = (deadline: string): string | undefined => {
    if (!deadline) return 'La fecha límite es requerida';
    
    const selectedDate = new Date(deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate <= today) return 'La fecha límite debe ser posterior a hoy';
    
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    if (selectedDate > maxDate) return 'La fecha límite no puede ser más de 1 año en el futuro';
    
    return undefined;
  };

  const validateRequirements = (requirements: string): string | undefined => {
    if (!requirements.trim()) return 'Los requisitos son requeridos';
    if (requirements.length < 10) return 'Los requisitos deben tener al menos 10 caracteres';
    if (requirements.length > 2000) return 'Los requisitos son demasiado largos';
    return undefined;
  };

  const validateSelectedProviders = (providers: string[]): string | undefined => {
    if (providers.length === 0) return 'Debes seleccionar al menos un proveedor';
    if (providers.length > 10) return 'No puedes seleccionar más de 10 proveedores';
    return undefined;
  };

  const validateField = (name: string, value: string | number | string[]): string | undefined => {
    switch (name) {
      case 'title':
        return validateTitle(value as string);
      case 'description':
        return validateDescription(value as string);
      case 'category':
        if (!value || !(value as string).trim()) return 'La categoría es requerida';
        return undefined;
      case 'budget':
        return validateBudget(value as number);
      case 'deadline':
        return validateDeadline(value as string);
      case 'requirements':
        return validateRequirements(value as string);
      case 'selectedProviders':
        return validateSelectedProviders(value as string[]);
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
    
    if (touched[name]) {
      const error = validateField(name, numValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleProviderSelection = (providerId: string) => {
    setFormData(prev => {
      const newProviders = prev.selectedProviders.includes(providerId)
        ? prev.selectedProviders.filter(id => id !== providerId)
        : [...prev.selectedProviders, providerId];
      
      return {
        ...prev,
        selectedProviders: newProviders
      };
    });
    
    if (touched.selectedProviders) {
      const error = validateSelectedProviders(formData.selectedProviders);
      setErrors(prev => ({
        ...prev,
        selectedProviders: error
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
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        console.log('RFQ Data:', formData);
        
        setAlert({
          isOpen: true,
          title: 'Solicitud de Cotización Creada',
          message: `La solicitud "${formData.title}" ha sido creada exitosamente y enviada a ${formData.selectedProviders.length} proveedor(es). Los proveedores recibirán una notificación y podrán cargar sus cotizaciones.`,
          type: 'success'
        });
        
        // Limpiar formulario después del éxito
        handleClear();
        
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        setAlert({
          isOpen: true,
          title: 'Error de Envío',
          message: 'Error al crear la solicitud de cotización. Por favor, intenta nuevamente.',
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
      budget: 0,
      deadline: '',
      requirements: '',
      selectedProviders: [],
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
      
      <div className="skeleton-form-field full-width">
        <div className="skeleton-label skeleton"></div>
        <div className="skeleton-textarea skeleton"></div>
      </div>
      
      <div className="skeleton-form-field full-width">
        <div className="skeleton-label skeleton"></div>
        <div className="skeleton-input skeleton"></div>
      </div>
      
      <div className="skeleton-buttons">
        <div className="skeleton-button skeleton"></div>
        <div className="skeleton-button primary skeleton"></div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="management-page">
        <div className="management-page-header">
          <div className="flex items-center justify-center mb-4">
            <div className="feature-icon">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="page-main-title">PASO 2 - Solicitud de Cotización</h1>
          <p className="page-main-subtitle">
            Crea una solicitud de cotización y selecciona los proveedores que recibirán la invitación
          </p>
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
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    Título de la Solicitud *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    placeholder="Ej: Compra de equipos de cómputo"
                    className={errors.title && touched.title ? 'error' : ''}
                  />
                  {errors.title && touched.title && (
                    <span className="error-message">{errors.title}</span>
                  )}
                </div>
                <div className="form-field form-field-entrance">
                  <label>
                    <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                    Categoría *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    className={errors.category && touched.category ? 'error' : ''}
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="tecnologia">Tecnología</option>
                    <option value="servicios">Servicios</option>
                    <option value="materiales">Materiales</option>
                    <option value="equipos">Equipos</option>
                    <option value="otros">Otros</option>
                  </select>
                  {errors.category && touched.category && (
                    <span className="error-message">{errors.category}</span>
                  )}
                </div>
              </div>
              
              <div className="form-field full-width form-field-entrance">
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
                  onBlur={handleBlur}
                  required
                  rows={4}
                  placeholder="Describe detalladamente lo que necesitas..."
                  className={errors.description && touched.description ? 'error' : ''}
                />
                {errors.description && touched.description && (
                  <span className="error-message">{errors.description}</span>
                )}
              </div>
              
              <div className="form-row form-row-entrance">
                <div className="form-field form-field-entrance">
                  <label>
                    <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                    </svg>
                    Presupuesto Estimado *
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    min="0.01"
                    step="0.01"
                    placeholder="0.00"
                    className={errors.budget && touched.budget ? 'error' : ''}
                  />
                  {errors.budget && touched.budget && (
                    <span className="error-message">{errors.budget}</span>
                  )}
                </div>
                <div className="form-field form-field-entrance">
                  <label>
                    <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Fecha Límite *
                  </label>
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
                <label>
                  <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Requisitos Específicos *
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  rows={4}
                  placeholder="Especifica los requisitos técnicos, condiciones, plazos de entrega, etc..."
                  className={errors.requirements && touched.requirements ? 'error' : ''}
                />
                {errors.requirements && touched.requirements && (
                  <span className="error-message">{errors.requirements}</span>
                )}
              </div>
              
              <div className="form-field full-width form-field-entrance">
                <label>
                  <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  Seleccionar Proveedores *
                </label>
                <div className="providers-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '1rem',
                  marginTop: '0.5rem'
                }}>
                  {availableProviders.map(provider => (
                    <div
                      key={provider.id}
                      className={`provider-card ${formData.selectedProviders.includes(provider.id) ? 'selected' : ''}`}
                      style={{
                        padding: '1rem',
                        border: formData.selectedProviders.includes(provider.id) 
                          ? '2px solid #4a90e2' 
                          : '2px solid var(--border-color)',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-in-out',
                        backgroundColor: formData.selectedProviders.includes(provider.id) 
                          ? '#f0f8ff' 
                          : 'var(--card-bg)'
                      }}
                      onClick={() => handleProviderSelection(provider.id)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="checkbox"
                          checked={formData.selectedProviders.includes(provider.id)}
                          onChange={() => handleProviderSelection(provider.id)}
                          style={{ margin: 0 }}
                        />
                        <div>
                          <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                            {provider.name}
                          </div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Categoría: {provider.category}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.selectedProviders && touched.selectedProviders && (
                  <span className="error-message">{errors.selectedProviders}</span>
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
                      Creando...
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
          </div>
        )}
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

export default NewRequestPage; 