import React, { useState, useEffect } from 'react';
import { useLoading } from '../../hooks/useLoading';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import RegistrationSkeleton from '../../components/RegistrationSkeleton';
import PasswordStrength from '../../components/PasswordStrength';
import CustomAlert from '../../components/CustomAlert';

interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
  businessType: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
  taxId?: string;
  businessType?: string;
  password?: string;
  confirmPassword?: string;
}

const ProviderRegistration: React.FC = () => {
  const { isLoading } = useLoading({ delay: 200, minDuration: 500 });
  useScrollToTop();
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    taxId: '',
    businessType: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Funciones de validación
  const validateEmail = (email: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'El email es requerido';
    if (!emailRegex.test(email)) return 'El email no tiene un formato válido';
    if (email.length > 254) return 'El email es demasiado largo';
    return undefined;
  };

  const calculatePasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
    if (!password) return 'weak';
    
    let score = 0;
    
    // Longitud
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complejidad
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[@$!%*?&]/.test(password)) score += 1;
    
    // Caracteres especiales adicionales
    if (/[^a-zA-Z0-9@$!%*?&]/.test(password)) score += 1;
    
    if (score <= 2) return 'weak';
    if (score <= 4) return 'medium';
    return 'strong';
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'La contraseña es requerida';
    if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
    if (password.length > 128) return 'La contraseña es demasiado larga';
    if (!/(?=.*[a-z])/.test(password)) return 'La contraseña debe contener al menos una letra minúscula';
    if (!/(?=.*[A-Z])/.test(password)) return 'La contraseña debe contener al menos una letra mayúscula';
    if (!/(?=.*\d)/.test(password)) return 'La contraseña debe contener al menos un número';
    if (!/(?=.*[@$!%*?&])/.test(password)) return 'La contraseña debe contener al menos un carácter especial (@$!%*?&)';
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phone) return 'El teléfono es requerido';
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) return 'El teléfono no tiene un formato válido';
    return undefined;
  };

  const validateRFC = (rfc: string): string | undefined => {
    const rfcRegex = /^[A-Z&Ñ]{3,4}[0-9]{6}[A-Z0-9]{3}$/;
    if (!rfc) return 'El RFC es requerido';
    if (!rfcRegex.test(rfc.toUpperCase())) return 'El RFC no tiene un formato válido';
    return undefined;
  };

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'companyName':
        if (!value.trim()) return 'El nombre de la empresa es requerido';
        if (value.length < 2) return 'El nombre de la empresa debe tener al menos 2 caracteres';
        if (value.length > 100) return 'El nombre de la empresa es demasiado largo';
        return undefined;
      
      case 'contactName':
        if (!value.trim()) return 'El nombre del contacto es requerido';
        if (value.length < 2) return 'El nombre del contacto debe tener al menos 2 caracteres';
        if (value.length > 100) return 'El nombre del contacto es demasiado largo';
        return undefined;
      
      case 'email':
        return validateEmail(value);
      
      case 'phone':
        return validatePhone(value);
      
      case 'address':
        if (!value.trim()) return 'La dirección es requerida';
        if (value.length < 10) return 'La dirección debe tener al menos 10 caracteres';
        if (value.length > 200) return 'La dirección es demasiado larga';
        return undefined;
      
      case 'taxId':
        return validateRFC(value);
      
      case 'businessType':
        if (!value.trim()) return 'El tipo de negocio es requerido';
        if (value.length < 3) return 'El tipo de negocio debe tener al menos 3 caracteres';
        if (value.length > 50) return 'El tipo de negocio es demasiado largo';
        return undefined;
      
      case 'password':
        return validatePassword(value);
      
      case 'confirmPassword':
        if (!value) return 'Confirma tu contraseña';
        if (value !== formData.password) return 'Las contraseñas no coinciden';
        return undefined;
      
      default:
        return undefined;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Calcular fortaleza de contraseña
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Validar en tiempo real si el campo ha sido tocado
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);
    
    // Validar todos los campos
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });
    
    setErrors(newErrors);
    
    // Si no hay errores, enviar el formulario
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        // Simular envío al backend
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('Datos del formulario válidos:', formData);
        
        // Mostrar alerta personalizada de éxito
        setAlert({
          isOpen: true,
          title: '¡Registro Exitoso!',
          message: 'Tu información ha sido enviada correctamente. Nos pondremos en contacto contigo pronto.',
          type: 'success'
        });
        
        // Resetear formulario inmediatamente después de la alerta
        setFormData({
          companyName: '',
          contactName: '',
          email: '',
          phone: '',
          address: '',
          taxId: '',
          businessType: '',
          password: '',
          confirmPassword: '',
        });
        setErrors({});
        setTouched({});
        setPasswordStrength('');
        setShowPassword(false);
        setShowConfirmPassword(false);
        
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
      console.log('Errores de validación:', newErrors);
      setAlert({
        isOpen: true,
        title: 'Errores de Validación',
        message: 'Por favor, corrige los errores en el formulario antes de enviar.',
        type: 'warning'
      });
    }
  };

  if (isLoading) {
    return <RegistrationSkeleton />;
  }

  return (
    <div className="container">
      <section className="hero">
        <h1 className="hero-title">Registro de Proveedor</h1>
        <p className="hero-subtitle">
          Completa el formulario para registrarte como proveedor en nuestro sistema
        </p>
        
        <div className="registration-form-container">
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-row">
              <div className="form-field">
                <label>Nombre de la Empresa *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Ingresa el nombre de tu empresa"
                  className={errors.companyName && touched.companyName ? 'error' : ''}
                />
                {errors.companyName && touched.companyName && (
                  <span className="error-message">{errors.companyName}</span>
                )}
              </div>
              
              <div className="form-field">
                <label>Nombre del Contacto *</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Nombre completo del contacto principal"
                  className={errors.contactName && touched.contactName ? 'error' : ''}
                />
                {errors.contactName && touched.contactName && (
                  <span className="error-message">{errors.contactName}</span>
                )}
              </div>
            </div>
            
            <div className="form-row">
                             <div className="form-field">
                 <label>Email *</label>
                 <input
                   type="email"
                   name="email"
                   value={formData.email}
                   onChange={handleInputChange}
                   onBlur={handleBlur}
                   required
                   placeholder="email@empresa.com"
                   className={errors.email && touched.email ? 'error' : ''}
                 />
                 {errors.email && touched.email && (
                   <span className="error-message">{errors.email}</span>
                 )}
               </div>
              
              <div className="form-field">
                <label>Teléfono *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  placeholder="+52 55 1234 5678"
                  className={errors.phone && touched.phone ? 'error' : ''}
                />
                {errors.phone && touched.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label>Dirección *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Dirección completa de la empresa"
                  className={errors.address && touched.address ? 'error' : ''}
                />
                {errors.address && touched.address && (
                  <span className="error-message">{errors.address}</span>
                )}
              </div>
              
              <div className="form-field">
                <label>RFC *</label>
                <input
                  type="text"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  placeholder="RFC de la empresa"
                  className={errors.taxId && touched.taxId ? 'error' : ''}
                />
                {errors.taxId && touched.taxId && (
                  <span className="error-message">{errors.taxId}</span>
                )}
              </div>
            </div>
            
            <div className="form-field full-width">
              <label>Tipo de Negocio *</label>
              <input
                type="text"
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                placeholder="Ej: Manufactura, Servicios, Distribución, etc."
                className={errors.businessType && touched.businessType ? 'error' : ''}
              />
              {errors.businessType && touched.businessType && (
                <span className="error-message">{errors.businessType}</span>
              )}
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label>Contraseña *</label>
                                 <div className={`password-input-container ${errors.password && touched.password ? 'error' : ''}`}>
                   <input
                     type={showPassword ? 'text' : 'password'}
                     name="password"
                     value={formData.password}
                     onChange={handleInputChange}
                     onBlur={handleBlur}
                     required
                     placeholder="Mínimo 8 caracteres"
                   />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    style={{ 
                      display: 'flex', 
                      opacity: 1, 
                      visibility: 'visible',
                      position: 'relative',
                      zIndex: 10,
                      background: 'var(--bg-secondary)',
                      border: 'none',
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      margin: '0.25rem',
                      cursor: 'pointer',
                      minWidth: '2.5rem',
                      height: '2.5rem',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', opacity: 1, visibility: 'visible' }}>
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', opacity: 1, visibility: 'visible' }}>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
                                 {formData.password && (
                   <PasswordStrength strength={passwordStrength} />
                 )}
                 {errors.password && touched.password && (
                   <span className="error-message">{errors.password}</span>
                 )}
              </div>
              
              <div className="form-field">
                <label>Confirmar Contraseña *</label>
                                 <div className={`password-input-container ${errors.confirmPassword && touched.confirmPassword ? 'error' : ''}`}>
                   <input
                     type={showConfirmPassword ? 'text' : 'password'}
                     name="confirmPassword"
                     value={formData.confirmPassword}
                     onChange={handleInputChange}
                     onBlur={handleBlur}
                     required
                     placeholder="Repite tu contraseña"
                   />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    style={{ 
                      display: 'flex', 
                      opacity: 1, 
                      visibility: 'visible',
                      position: 'relative',
                      zIndex: 10,
                      background: 'var(--bg-secondary)',
                      border: 'none',
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      margin: '0.25rem',
                      cursor: 'pointer',
                      minWidth: '2.5rem',
                      height: '2.5rem',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {showConfirmPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', opacity: 1, visibility: 'visible' }}>
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', opacity: 1, visibility: 'visible' }}>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
                {formData.confirmPassword && (
                  <PasswordStrength strength={formData.confirmPassword === formData.password && formData.password ? 'strong' : 'weak'} />
                )}
                {errors.confirmPassword && touched.confirmPassword && (
                  <span className="error-message">{errors.confirmPassword}</span>
                )}
              </div>
            </div>
            
            <button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Enviando...
                </>
              ) : (
                'Enviar Registro'
              )}
                         </button>
           </form>
         </div>
       </section>
       
       <CustomAlert
         isOpen={alert.isOpen}
         onClose={() => setAlert(prev => ({ ...prev, isOpen: false }))}
         title={alert.title}
         message={alert.message}
         type={alert.type}
       />
     </div>
   );
 };

export default ProviderRegistration; 