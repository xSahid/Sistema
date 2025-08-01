import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CustomAlert from '../../components/CustomAlert';

interface ProviderFormData {
  rfc: string;
  businessName: string;
  address: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  taxStatus: string;
  constitutiveAct: File | null;
  satOpinion: File | null;
  legalRepresentative: File | null;
  taxCertificate: File | null;
}

interface FormErrors {
  rfc?: string;
  businessName?: string;
  address?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  taxStatus?: string;
  constitutiveAct?: string;
  satOpinion?: string;
  legalRepresentative?: string;
  taxCertificate?: string;
}

const ProviderRegistration: React.FC = () => {
  const [formData, setFormData] = useState<ProviderFormData>({
    rfc: '',
    businessName: '',
    address: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    taxStatus: '',
    constitutiveAct: null,
    satOpinion: null,
    legalRepresentative: null,
    taxCertificate: null,
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

  // Validaciones específicas
  const validateRFC = (rfc: string): string | undefined => {
    if (!rfc.trim()) return 'El RFC es requerido';
    if (rfc.length < 12 || rfc.length > 13) return 'El RFC debe tener 12 o 13 caracteres';
    if (!/^[A-Z&Ñ]{3,4}[0-9]{6}[A-Z0-9]{3}$/.test(rfc)) {
      return 'El RFC debe tener un formato válido';
    }
    return undefined;
  };

  const validateBusinessName = (name: string): string | undefined => {
    if (!name.trim()) return 'La razón social es requerida';
    if (name.length < 3) return 'La razón social debe tener al menos 3 caracteres';
    if (name.length > 200) return 'La razón social es demasiado larga';
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return 'El email es requerido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'El email debe tener un formato válido';
    }
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    if (!phone.trim()) return 'El teléfono es requerido';
    if (!/^[0-9]{10}$/.test(phone.replace(/\s/g, ''))) {
      return 'El teléfono debe tener 10 dígitos';
    }
    return undefined;
  };

  const validateFile = (file: File | null, fieldName: string): string | undefined => {
    if (!file) return `El documento ${fieldName} es requerido`;
    if (file.size > 10 * 1024 * 1024) return 'El archivo no puede ser mayor a 10MB';
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      return 'Solo se permiten archivos PDF, JPEG o PNG';
    }
    return undefined;
  };

  const validateField = (name: string, value: string | File | null): string | undefined => {
    switch (name) {
      case 'rfc':
        return validateRFC(value as string);
      case 'businessName':
        return validateBusinessName(value as string);
      case 'address':
        if (!value || !(value as string).trim()) return 'El domicilio es requerido';
        if ((value as string).length < 10) return 'El domicilio debe tener al menos 10 caracteres';
        return undefined;
      case 'contactName':
        if (!value || !(value as string).trim()) return 'El nombre de contacto es requerido';
        if ((value as string).length < 2) return 'El nombre debe tener al menos 2 caracteres';
        return undefined;
      case 'contactEmail':
        return validateEmail(value as string);
      case 'contactPhone':
        return validatePhone(value as string);
      case 'taxStatus':
        if (!value || !(value as string).trim()) return 'La situación fiscal es requerida';
        return undefined;
      case 'constitutiveAct':
        return validateFile(value as File, 'Acta Constitutiva');
      case 'satOpinion':
        return validateFile(value as File, 'Opinión SAT');
      case 'legalRepresentative':
        return validateFile(value as File, 'Identificación del Representante Legal');
      case 'taxCertificate':
        return validateFile(value as File, 'Constancia de Situación Fiscal');
      default:
        return undefined;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (touched[name]) {
      const error = validateField(name, value);
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
      const error = validateField(name, file);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleFileBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files ? files[0] : null;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = validateField(name, file);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof ProviderFormData]);
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
        
        console.log('Provider Data:', formData);
        
        setAlert({
          isOpen: true,
          title: 'Solicitud Enviada',
          message: 'Tu solicitud de registro ha sido enviada exitosamente. El área de Compras/Administración la revisará y te notificará el resultado en los próximos días.',
          type: 'success'
        });
        
        // Limpiar formulario después del éxito
        handleClear();
        
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        setAlert({
          isOpen: true,
          title: 'Error de Envío',
          message: 'Error al enviar la solicitud. Por favor, intenta nuevamente.',
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
      rfc: '',
      businessName: '',
      address: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      taxStatus: '',
      constitutiveAct: null,
      satOpinion: null,
      legalRepresentative: null,
      taxCertificate: null,
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
        <div className="skeleton-input skeleton"></div>
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
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
          </div>
          <h1 className="page-main-title">PASO 1 - Alta de Proveedor</h1>
          <p className="page-main-subtitle">
            Registra tu empresa como proveedor y carga los documentos necesarios para la validación
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
                    RFC *
                  </label>
                  <input
                    type="text"
                    name="rfc"
                    value={formData.rfc}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    placeholder="XAXX010101000"
                    className={errors.rfc && touched.rfc ? 'error' : ''}
                  />
                  {errors.rfc && touched.rfc && (
                    <span className="error-message">{errors.rfc}</span>
                  )}
                </div>
                <div className="form-field form-field-entrance">
                  <label>
                    <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                    Razón Social *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    placeholder="Nombre de la empresa"
                    className={errors.businessName && touched.businessName ? 'error' : ''}
                  />
                  {errors.businessName && touched.businessName && (
                    <span className="error-message">{errors.businessName}</span>
                  )}
                </div>
              </div>
              
              <div className="form-field full-width form-field-entrance">
                <label>
                  <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Domicilio Fiscal *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  rows={3}
                  placeholder="Dirección completa de la empresa"
                  className={errors.address && touched.address ? 'error' : ''}
                />
                {errors.address && touched.address && (
                  <span className="error-message">{errors.address}</span>
                )}
              </div>
              
              <div className="form-row form-row-entrance">
                <div className="form-field form-field-entrance">
                  <label>
                    <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                    Nombre del Contacto *
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    placeholder="Nombre completo"
                    className={errors.contactName && touched.contactName ? 'error' : ''}
                  />
                  {errors.contactName && touched.contactName && (
                    <span className="error-message">{errors.contactName}</span>
                  )}
                </div>
                <div className="form-field form-field-entrance">
                  <label>
                    <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Email de Contacto *
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    placeholder="contacto@empresa.com"
                    className={errors.contactEmail && touched.contactEmail ? 'error' : ''}
                  />
                  {errors.contactEmail && touched.contactEmail && (
                    <span className="error-message">{errors.contactEmail}</span>
                  )}
                </div>
              </div>
              
              <div className="form-row form-row-entrance">
                <div className="form-field form-field-entrance">
                  <label>
                    <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Teléfono de Contacto *
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    placeholder="5551234567"
                    className={errors.contactPhone && touched.contactPhone ? 'error' : ''}
                  />
                  {errors.contactPhone && touched.contactPhone && (
                    <span className="error-message">{errors.contactPhone}</span>
                  )}
                </div>
                <div className="form-field form-field-entrance">
                  <label>
                    <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    Situación Fiscal *
                  </label>
                  <select
                    name="taxStatus"
                    value={formData.taxStatus}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    className={errors.taxStatus && touched.taxStatus ? 'error' : ''}
                  >
                    <option value="">Seleccionar situación fiscal</option>
                    <option value="active">Activo</option>
                    <option value="suspended">Suspendido</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                  {errors.taxStatus && touched.taxStatus && (
                    <span className="error-message">{errors.taxStatus}</span>
                  )}
                </div>
              </div>
              
              <div className="form-row form-row-entrance">
                <div className="form-field form-field-entrance">
                  <label>
                    <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Acta Constitutiva *
                  </label>
                  <input
                    type="file"
                    name="constitutiveAct"
                    onChange={handleFileChange}
                    onBlur={handleFileBlur}
                    required
                    accept=".pdf,.jpg,.jpeg,.png"
                    className={errors.constitutiveAct && touched.constitutiveAct ? 'error' : ''}
                  />
                  {errors.constitutiveAct && touched.constitutiveAct && (
                    <span className="error-message">{errors.constitutiveAct}</span>
                  )}
                </div>
                <div className="form-field form-field-entrance">
                  <label>
                    <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Opinión Positiva SAT *
                  </label>
                  <input
                    type="file"
                    name="satOpinion"
                    onChange={handleFileChange}
                    onBlur={handleFileBlur}
                    required
                    accept=".pdf,.jpg,.jpeg,.png"
                    className={errors.satOpinion && touched.satOpinion ? 'error' : ''}
                  />
                  {errors.satOpinion && touched.satOpinion && (
                    <span className="error-message">{errors.satOpinion}</span>
                  )}
                </div>
              </div>
              
              <div className="form-row form-row-entrance">
                <div className="form-field form-field-entrance">
                  <label>
                    <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Identificación del Representante Legal *
                  </label>
                  <input
                    type="file"
                    name="legalRepresentative"
                    onChange={handleFileChange}
                    onBlur={handleFileBlur}
                    required
                    accept=".pdf,.jpg,.jpeg,.png"
                    className={errors.legalRepresentative && touched.legalRepresentative ? 'error' : ''}
                  />
                  {errors.legalRepresentative && touched.legalRepresentative && (
                    <span className="error-message">{errors.legalRepresentative}</span>
                  )}
                </div>
                <div className="form-field form-field-entrance">
                  <label>
                    <svg className="icon-sm inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Constancia de Situación Fiscal *
                  </label>
                  <input
                    type="file"
                    name="taxCertificate"
                    onChange={handleFileChange}
                    onBlur={handleFileBlur}
                    required
                    accept=".pdf,.jpg,.jpeg,.png"
                    className={errors.taxCertificate && touched.taxCertificate ? 'error' : ''}
                  />
                  {errors.taxCertificate && touched.taxCertificate && (
                    <span className="error-message">{errors.taxCertificate}</span>
                  )}
                </div>
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
                      Enviando...
                    </>
                  ) : (
                    <>
                      <svg className="icon-sm" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Enviar Solicitud
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

export default ProviderRegistration; 