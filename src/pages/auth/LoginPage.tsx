import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import CustomAlert from '../../components/CustomAlert';

const LoginPage: React.FC = () => {
  const { login } = useAppContext();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('error');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin' as 'admin' | 'provider' | 'purchases' | 'finance'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulación de validación de credenciales
      const validCredentials = {
        admin: { email: 'admin@sip.com', password: 'admin123' },
        provider: { email: 'provider@sip.com', password: 'provider123' },
        purchases: { email: 'compras@sip.com', password: 'compras123' },
        finance: { email: 'finanzas@sip.com', password: 'finanzas123' }
      };

      const credentials = validCredentials[formData.role];
      
      if (formData.email === credentials.email && formData.password === credentials.password) {
        // Login exitoso
        const user = {
          id: '1',
          name: getRoleName(formData.role),
          email: formData.email,
          role: formData.role,
          status: 'active' as const,
          createdAt: new Date().toISOString(),
          permissions: getRolePermissions(formData.role)
        };

        login(user);
        setAlertMessage('¡Inicio de sesión exitoso!');
        setAlertType('success');
        setShowAlert(true);

        // Redirigir según el rol
        setTimeout(() => {
          switch (formData.role) {
            case 'admin':
              navigate('/admin/dashboard');
              break;
            case 'provider':
              navigate('/providers/dashboard');
              break;
            case 'purchases':
              navigate('/purchases/dashboard');
              break;
            case 'finance':
              navigate('/finance/dashboard');
              break;
            default:
              navigate('/');
          }
        }, 1500);
      } else {
        setAlertMessage('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
        setAlertType('error');
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage('Error al iniciar sesión. Por favor, intenta nuevamente.');
      setAlertType('error');
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleName = (role: string) => {
    const names = {
      admin: 'Administrador del Sistema',
      provider: 'Proveedor Ejemplo',
      purchases: 'Departamento de Compras',
      finance: 'Departamento de Finanzas'
    };
    return names[role as keyof typeof names] || role;
  };

  const getRolePermissions = (role: string) => {
    const permissions = {
      admin: ['users:manage', 'documents:manage', 'system:admin'],
      provider: ['payments:view', 'profile:edit'],
      purchases: ['quotations:manage', 'orders:create', 'requests:create'],
      finance: ['payments:manage', 'ppd:manage', 'reports:view']
    };
    return permissions[role as keyof typeof permissions] || [];
  };

  const getRoleDescription = (role: string) => {
    const descriptions = {
      admin: 'Acceso completo al sistema. Gestión de usuarios, documentos y configuración.',
      provider: 'Acceso a información de pagos y gestión de perfil.',
      purchases: 'Gestión de cotizaciones, órdenes de compra y solicitudes.',
      finance: 'Gestión de pagos, complementos PPD y reportes financieros.'
    };
    return descriptions[role as keyof typeof descriptions] || '';
  };

  return (
    <div className="container">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">
              <span className="login-icon">🔐</span>
              Iniciar Sesión
            </h1>
            <p className="login-subtitle">
              Accede al Sistema Integral de Proveedores
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">
                  <span>👤</span>
                </div>
                <div>
                  <h3 className="section-title">Credenciales de Acceso</h3>
                  <p className="section-description">
                    Selecciona tu rol y ingresa tus credenciales
                  </p>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-field-modern full-width">
                  <label className="field-label">
                    <span className="label-text">Rol de Usuario</span>
                    <span className="required-indicator">*</span>
                  </label>
                  <div className="input-container">
                    <span className="input-icon">🎭</span>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="modern-select"
                      required
                    >
                      <option value="admin">Administrador</option>
                      <option value="provider">Proveedor</option>
                      <option value="purchases">Compras</option>
                      <option value="finance">Finanzas</option>
                    </select>
                  </div>
                </div>

                <div className="form-field-modern">
                  <label className="field-label">
                    <span className="label-text">Email</span>
                    <span className="required-indicator">*</span>
                  </label>
                  <div className="input-container">
                    <span className="input-icon">📧</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="modern-input"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-field-modern">
                  <label className="field-label">
                    <span className="label-text">Contraseña</span>
                    <span className="required-indicator">*</span>
                  </label>
                  <div className="input-container">
                    <span className="input-icon">🔒</span>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="modern-input"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">
                  <span>💡</span>
                </div>
                <div>
                  <h3 className="section-title">Credenciales de Prueba</h3>
                  <p className="section-description">
                    Usa estas credenciales para probar el sistema
                  </p>
                </div>
              </div>

              <div className="credentials-info">
                <div className="credential-item">
                  <strong>Administrador:</strong> admin@sip.com / admin123
                </div>
                <div className="credential-item">
                  <strong>Proveedor:</strong> provider@sip.com / provider123
                </div>
                <div className="credential-item">
                  <strong>Compras:</strong> compras@sip.com / compras123
                </div>
                <div className="credential-item">
                  <strong>Finanzas:</strong> finanzas@sip.com / finanzas123
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
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Iniciar Sesión
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="login-footer">
            <p className="login-footer-text">
              ¿No tienes cuenta?{' '}
              <a href="/providers/register" className="login-footer-link">
                Regístrate como Proveedor
              </a>
            </p>
          </div>
        </div>
      </div>

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

export default LoginPage; 