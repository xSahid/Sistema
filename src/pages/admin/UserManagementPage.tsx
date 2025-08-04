import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CustomAlert from '../../components/CustomAlert';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'provider' | 'purchases' | 'finance' | 'admin';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastLogin?: string;
  permissions: string[];
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'provider' | 'purchases' | 'finance' | 'admin';
  permissions: string[];
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  permissions?: string;
}

const UserManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'create' | 'edit'>('list');
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan.perez@empresa.com',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-15T10:30:00Z',
      lastLogin: '2025-01-20T14:30:00Z',
      permissions: ['users:read', 'users:write', 'reports:read', 'reports:write']
    },
    {
      id: '2',
      name: 'María García',
      email: 'maria.garcia@empresa.com',
      role: 'purchases',
      status: 'active',
      createdAt: '2024-02-10T09:15:00Z',
      lastLogin: '2025-01-19T16:45:00Z',
      permissions: ['quotations:read', 'quotations:write', 'orders:read', 'orders:write']
    },
    {
      id: '3',
      name: 'Carlos López',
      email: 'carlos.lopez@empresa.com',
      role: 'finance',
      status: 'active',
      createdAt: '2024-03-05T11:20:00Z',
      lastLogin: '2025-01-20T10:15:00Z',
      permissions: ['payments:read', 'payments:write', 'invoices:read', 'invoices:write']
    },
    {
      id: '4',
      name: 'Ana Rodríguez',
      email: 'ana.rodriguez@proveedor.com',
      role: 'provider',
      status: 'pending',
      createdAt: '2025-01-18T08:30:00Z',
      permissions: ['quotations:read', 'quotations:write']
    }
  ]);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'provider',
    permissions: []
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

  const availablePermissions = {
    users: ['users:read', 'users:write', 'users:delete'],
    reports: ['reports:read', 'reports:write', 'reports:export'],
    quotations: ['quotations:read', 'quotations:write', 'quotations:approve'],
    orders: ['orders:read', 'orders:write', 'orders:approve'],
    payments: ['payments:read', 'payments:write', 'payments:approve'],
    invoices: ['invoices:read', 'invoices:write', 'invoices:validate'],
    ppd: ['ppd:read', 'ppd:write', 'ppd:validate']
  };

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Funciones de validación
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return 'El nombre es requerido';
    if (name.length < 2) return 'El nombre debe tener al menos 2 caracteres';
    if (name.length > 100) return 'El nombre es demasiado largo';
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return 'El email es requerido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'El email debe tener un formato válido';
    }
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'La contraseña es requerida';
    if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'La contraseña debe contener mayúsculas, minúsculas y números';
    }
    return undefined;
  };

  const validateConfirmPassword = (confirmPassword: string): string | undefined => {
    if (!confirmPassword) return 'Confirma la contraseña';
    if (confirmPassword !== formData.password) {
      return 'Las contraseñas no coinciden';
    }
    return undefined;
  };

  const validateRole = (role: string): string | undefined => {
    if (!role) return 'El rol es requerido';
    return undefined;
  };

  const validateField = (name: string, value: string | string[]): string | undefined => {
    switch (name) {
      case 'name':
        return validateName(value as string);
      case 'email':
        return validateEmail(value as string);
      case 'password':
        return validatePassword(value as string);
      case 'confirmPassword':
        return validateConfirmPassword(value as string);
      case 'role':
        return validateRole(value as string);
      case 'permissions':
        return value.length > 0 ? undefined : 'Selecciona al menos un permiso';
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

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, permission]
        : prev.permissions.filter(p => p !== permission)
    }));
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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof UserFormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setAlert({
        isOpen: true,
        title: 'Error de Validación',
        message: 'Por favor, corrige los errores en el formulario',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envío a API
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (editingUser) {
        // Actualizar usuario existente
        setUsers(prev => 
          prev.map(user => 
            user.id === editingUser.id 
              ? {
                  ...user,
                  name: formData.name,
                  email: formData.email,
                  role: formData.role,
                  permissions: formData.permissions
                }
              : user
          )
        );
        
        setAlert({
          isOpen: true,
          title: 'Usuario Actualizado',
          message: 'El usuario se ha actualizado exitosamente',
          type: 'success'
        });
      } else {
        // Crear nuevo usuario
        const newUser: User = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: 'pending',
          createdAt: new Date().toISOString(),
          permissions: formData.permissions
        };

        setUsers(prev => [newUser, ...prev]);
        
        setAlert({
          isOpen: true,
          title: 'Usuario Creado',
          message: 'El usuario se ha creado exitosamente',
          type: 'success'
        });
      }

      handleClear();
      setActiveTab('list');
    } catch (error) {
      setAlert({
        isOpen: true,
        title: 'Error',
        message: 'Error al procesar el usuario. Intenta nuevamente.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      confirmPassword: '',
      role: user.role,
      permissions: user.permissions
    });
    setActiveTab('edit');
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      return;
    }

    try {
      setUsers(prev => prev.filter(user => user.id !== userId));
      setAlert({
        isOpen: true,
        title: 'Usuario Eliminado',
        message: 'El usuario se ha eliminado exitosamente',
        type: 'success'
      });
    } catch (error) {
      setAlert({
        isOpen: true,
        title: 'Error',
        message: 'Error al eliminar el usuario',
        type: 'error'
      });
    }
  };

  const handleStatusChange = (userId: string, newStatus: User['status']) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: newStatus }
          : user
      )
    );
  };

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'provider',
      permissions: []
    });
    setErrors({});
    setTouched({});
    setEditingUser(null);
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, isOpen: false }));
  };

  const getRoleText = (role: User['role']) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'purchases': return 'Compras';
      case 'finance': return 'Finanzas';
      case 'provider': return 'Proveedor';
      default: return 'Desconocido';
    }
  };

  const getStatusText = (status: User['status']) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'pending': return 'Pendiente';
      default: return 'Desconocido';
    }
  };

  const getStatusIcon = (status: User['status']) => {
    switch (status) {
      case 'active': return '✅';
      case 'inactive': return '❌';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active': return 'green';
      case 'inactive': return 'red';
      case 'pending': return 'yellow';
      default: return 'gray';
    }
  };

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'admin': return 'purple';
      case 'purchases': return 'blue';
      case 'finance': return 'green';
      case 'provider': return 'orange';
      default: return 'gray';
    }
  };

  const FormSkeleton = () => (
    <div className="form-skeleton">
      <div className="skeleton-input"></div>
      <div className="skeleton-input"></div>
      <div className="skeleton-input"></div>
      <div className="skeleton-input"></div>
      <div className="skeleton-input"></div>
      <div className="skeleton-input"></div>
      <div className="skeleton-checkbox"></div>
      <div className="skeleton-button"></div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container">
        <section className="hero">
          <h1 className="hero-title">Gestión de Usuarios</h1>
          <FormSkeleton />
        </section>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <section className="hero">
          <div className="hero-header">
            <div className="hero-title-section">
              <h1 className="hero-title">👥 Gestión de Usuarios</h1>
              <p className="hero-subtitle">
                Crea, edita y gestiona usuarios del sistema con sus roles y permisos
              </p>
            </div>
            <div className="hero-stats">
              <div className="stat-card">
                <span className="stat-number">{users.length}</span>
                <span className="stat-label">Total Usuarios</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{users.filter(u => u.status === 'active').length}</span>
                <span className="stat-label">Activos</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{users.filter(u => u.status === 'pending').length}</span>
                <span className="stat-label">Pendientes</span>
              </div>
            </div>
          </div>

          <div className="tabs-container">
            <div className="tabs">
              <button
                className={`tab ${activeTab === 'list' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('list');
                  handleClear();
                }}
              >
                <span className="tab-icon">👥</span>
                <span className="tab-text">Lista de Usuarios</span>
              </button>
              <button
                className={`tab ${activeTab === 'create' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('create');
                  handleClear();
                }}
              >
                <span className="tab-icon">➕</span>
                <span className="tab-text">Crear Usuario</span>
              </button>
              {editingUser && (
                <button
                  className={`tab ${activeTab === 'edit' ? 'active' : ''}`}
                  onClick={() => setActiveTab('edit')}
                >
                  <span className="tab-icon">✏️</span>
                  <span className="tab-text">Editar Usuario</span>
                </button>
              )}
            </div>
          </div>

          {activeTab === 'list' && (
            <div className="users-list">
              <div className="list-header">
                <div className="list-title-section">
                  <h3 className="list-title">📋 Usuarios del Sistema</h3>
                  <p className="list-subtitle">Gestiona todos los usuarios registrados</p>
                </div>
                <div className="list-filters">
                  <div className="filter-group">
                    <label className="filter-label">Filtrar por Rol:</label>
                    <select className="filter-select">
                      <option value="">Todos los roles</option>
                      <option value="admin">Administrador</option>
                      <option value="purchases">Compras</option>
                      <option value="finance">Finanzas</option>
                      <option value="provider">Proveedor</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label className="filter-label">Filtrar por Estado:</label>
                    <select className="filter-select">
                      <option value="">Todos los estados</option>
                      <option value="active">Activo</option>
                      <option value="inactive">Inactivo</option>
                      <option value="pending">Pendiente</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="users-grid">
                {users.map(user => (
                  <div key={user.id} className="user-card">
                    <div className="user-card-header">
                      <div className="user-avatar">
                        <span className="user-avatar-text">
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div className="user-info">
                        <h4 className="user-name">{user.name}</h4>
                        <p className="user-email">{user.email}</p>
                        <div className="user-badges">
                          <span className={`role-badge ${getRoleColor(user.role)}`}>
                            {getRoleText(user.role)}
                          </span>
                          <span className={`status-badge ${getStatusColor(user.status)}`}>
                            {getStatusIcon(user.status)} {getStatusText(user.status)}
                          </span>
                        </div>
                      </div>
                      <div className="user-actions">
                        <button
                          className="action-btn edit-btn"
                          onClick={() => handleEdit(user)}
                          title="Editar usuario"
                        >
                          ✏️
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(user.id)}
                          title="Eliminar usuario"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    <div className="user-card-body">
                      <div className="user-details">
                        <div className="detail-item">
                          <span className="detail-icon">📅</span>
                          <div className="detail-content">
                            <span className="detail-label">Creado:</span>
                            <span className="detail-value">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        {user.lastLogin && (
                          <div className="detail-item">
                            <span className="detail-icon">🕒</span>
                            <div className="detail-content">
                              <span className="detail-label">Último acceso:</span>
                              <span className="detail-value">
                                {new Date(user.lastLogin).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="detail-item">
                          <span className="detail-icon">🔐</span>
                          <div className="detail-content">
                            <span className="detail-label">Permisos:</span>
                            <span className="detail-value">
                              {user.permissions.length} permisos
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="user-permissions">
                        <h5 className="permissions-title">🔑 Permisos Asignados:</h5>
                        <div className="permissions-list">
                          {user.permissions.map(permission => (
                            <span key={permission} className="permission-tag">
                              {permission}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="user-status-actions">
                        {user.status === 'pending' && (
                          <div className="status-actions">
                            <button
                              className="status-btn approve-btn"
                              onClick={() => handleStatusChange(user.id, 'active')}
                            >
                              ✅ Activar
                            </button>
                            <button
                              className="status-btn reject-btn"
                              onClick={() => handleStatusChange(user.id, 'inactive')}
                            >
                              ❌ Rechazar
                            </button>
                          </div>
                        )}
                        {user.status === 'active' && (
                          <button
                            className="status-btn deactivate-btn"
                            onClick={() => handleStatusChange(user.id, 'inactive')}
                          >
                            ⏸️ Desactivar
                          </button>
                        )}
                        {user.status === 'inactive' && (
                          <button
                            className="status-btn activate-btn"
                            onClick={() => handleStatusChange(user.id, 'active')}
                          >
                            ✅ Activar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeTab === 'create' || activeTab === 'edit') && (
            <div className="form-container">
              <div className="form-card">
                <div className="form-header">
                  <h3 className="form-title">
                    {activeTab === 'create' ? '➕ Crear Nuevo Usuario' : '✏️ Editar Usuario'}
                  </h3>
                  <p className="form-subtitle">
                    {activeTab === 'create' 
                      ? 'Completa la información para crear un nuevo usuario' 
                      : 'Modifica la información del usuario seleccionado'
                    }
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        <span className="label-icon">👤</span>
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        placeholder="Nombre completo del usuario"
                      />
                      {errors.name && (
                        <span className="error-message">{errors.name}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        <span className="label-icon">📧</span>
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="usuario@empresa.com"
                      />
                      {errors.email && (
                        <span className="error-message">{errors.email}</span>
                      )}
                    </div>

                    {activeTab === 'create' && (
                      <>
                        <div className="form-group">
                          <label htmlFor="password" className="form-label">
                            <span className="label-icon">🔒</span>
                            Contraseña *
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className={`form-input ${errors.password ? 'error' : ''}`}
                            placeholder="Contraseña segura"
                          />
                          {errors.password && (
                            <span className="error-message">{errors.password}</span>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="confirmPassword" className="form-label">
                            <span className="label-icon">🔐</span>
                            Confirmar Contraseña *
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                            placeholder="Confirma la contraseña"
                          />
                          {errors.confirmPassword && (
                            <span className="error-message">{errors.confirmPassword}</span>
                          )}
                        </div>
                      </>
                    )}

                    <div className="form-group">
                      <label htmlFor="role" className="form-label">
                        <span className="label-icon">👑</span>
                        Rol *
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`form-input ${errors.role ? 'error' : ''}`}
                      >
                        <option value="provider">Proveedor</option>
                        <option value="purchases">Compras</option>
                        <option value="finance">Finanzas</option>
                        <option value="admin">Administrador</option>
                      </select>
                      {errors.role && (
                        <span className="error-message">{errors.role}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">🔑</span>
                      Permisos *
                    </label>
                    <div className="permissions-grid">
                      {Object.entries(availablePermissions).map(([category, permissions]) => (
                        <div key={category} className="permission-category">
                          <h5 className="permission-category-title">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </h5>
                          <div className="permission-options">
                            {permissions.map(permission => (
                              <label key={permission} className="permission-checkbox">
                                <input
                                  type="checkbox"
                                  checked={formData.permissions.includes(permission)}
                                  onChange={(e) => handlePermissionChange(permission, e.target.checked)}
                                />
                                <span className="permission-label">{permission}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {errors.permissions && (
                      <span className="error-message">{errors.permissions}</span>
                    )}
                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting 
                        ? '💾 Guardando...' 
                        : activeTab === 'create' 
                          ? '➕ Crear Usuario' 
                          : '💾 Actualizar Usuario'
                      }
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        handleClear();
                        setActiveTab('list');
                      }}
                      disabled={isSubmitting}
                    >
                      ❌ Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      </div>

      {alert.isOpen && createPortal(
        <CustomAlert
          isOpen={alert.isOpen}
          title={alert.title}
          message={alert.message}
          type={alert.type}
          onClose={closeAlert}
        />,
        document.body
      )}
    </>
  );
};

export default UserManagementPage; 