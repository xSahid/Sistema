import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'provider',
    status: 'active',
    permissions: []
  });

  const [users] = useState([
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan.perez@proveedor.com',
      role: 'provider',
      status: 'active',
      lastLogin: '2024-01-15 10:30',
      createdAt: '2024-01-01',
      permissions: ['view_quotations', 'submit_quotations', 'upload_invoices']
    },
    {
      id: 2,
      name: 'María García',
      email: 'maria.garcia@compras.com',
      role: 'purchaser',
      status: 'active',
      lastLogin: '2024-01-15 09:15',
      createdAt: '2024-01-02',
      permissions: ['view_quotations', 'approve_quotations', 'create_orders']
    },
    {
      id: 3,
      name: 'Carlos López',
      email: 'carlos.lopez@finanzas.com',
      role: 'finance',
      status: 'active',
      lastLogin: '2024-01-15 08:45',
      createdAt: '2024-01-03',
      permissions: ['view_payments', 'register_payments', 'create_payment_plans']
    },
    {
      id: 4,
      name: 'Ana Rodríguez',
      email: 'ana.rodriguez@admin.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-15 07:30',
      createdAt: '2024-01-04',
      permissions: ['all']
    },
    {
      id: 5,
      name: 'Luis Martínez',
      email: 'luis.martinez@proveedor.com',
      role: 'provider',
      status: 'inactive',
      lastLogin: '2024-01-10 14:20',
      createdAt: '2024-01-05',
      permissions: ['view_quotations']
    }
  ]);

  const [roles] = useState([
    {
      id: 'provider',
      name: 'Proveedor',
      description: 'Puede subir cotizaciones, facturas y ver pagos',
      permissions: ['view_quotations', 'submit_quotations', 'upload_invoices', 'view_payments']
    },
    {
      id: 'purchaser',
      name: 'Compras',
      description: 'Puede revisar cotizaciones y crear órdenes de compra',
      permissions: ['view_quotations', 'approve_quotations', 'create_orders', 'view_providers']
    },
    {
      id: 'finance',
      name: 'Finanzas',
      description: 'Puede gestionar pagos y planes de pago',
      permissions: ['view_payments', 'register_payments', 'create_payment_plans', 'view_invoices']
    },
    {
      id: 'admin',
      name: 'Administrador',
      description: 'Acceso completo al sistema',
      permissions: ['all']
    }
  ]);

  const [permissions] = useState([
    { id: 'view_quotations', name: 'Ver Cotizaciones', description: 'Puede ver todas las cotizaciones' },
    { id: 'submit_quotations', name: 'Enviar Cotizaciones', description: 'Puede crear y enviar cotizaciones' },
    { id: 'approve_quotations', name: 'Aprobar Cotizaciones', description: 'Puede aprobar o rechazar cotizaciones' },
    { id: 'create_orders', name: 'Crear Órdenes', description: 'Puede crear órdenes de compra' },
    { id: 'view_payments', name: 'Ver Pagos', description: 'Puede ver el historial de pagos' },
    { id: 'register_payments', name: 'Registrar Pagos', description: 'Puede registrar pagos parciales o completos' },
    { id: 'create_payment_plans', name: 'Crear Planes de Pago', description: 'Puede crear planes de pago a plazos' },
    { id: 'upload_invoices', name: 'Subir Facturas', description: 'Puede subir facturas y documentos' },
    { id: 'view_providers', name: 'Ver Proveedores', description: 'Puede ver información de proveedores' },
    { id: 'view_invoices', name: 'Ver Facturas', description: 'Puede ver todas las facturas' },
    { id: 'manage_users', name: 'Gestionar Usuarios', description: 'Puede crear, editar y eliminar usuarios' },
    { id: 'view_reports', name: 'Ver Reportes', description: 'Puede acceder a reportes del sistema' }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'pending': return 'Pendiente';
      default: return 'Desconocido';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-red-600 bg-red-100';
      case 'purchaser': return 'text-blue-600 bg-blue-100';
      case 'finance': return 'text-purple-600 bg-purple-100';
      case 'provider': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'purchaser': return 'Compras';
      case 'finance': return 'Finanzas';
      case 'provider': return 'Proveedor';
      default: return 'Desconocido';
    }
  };

  const filteredUsers = activeTab === 'all' 
    ? users 
    : users.filter(user => user.role === activeTab);

  const handleCreateUser = () => {
    setUserForm({
      name: '',
      email: '',
      role: 'provider',
      status: 'active',
      permissions: []
    });
    setShowCreateModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      permissions: user.permissions
    });
    setShowEditModal(true);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    // Aquí se implementaría la lógica para crear/editar usuario
    console.log('Guardando usuario:', userForm);
    setShowCreateModal(false);
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (permissionId) => {
    setUserForm(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const handleRoleChange = (roleId) => {
    const selectedRole = roles.find(role => role.id === roleId);
    setUserForm(prev => ({
      ...prev,
      role: roleId,
      permissions: selectedRole ? selectedRole.permissions : []
    }));
  };

  const handleToggleStatus = (userId) => {
    // Aquí se implementaría la lógica para cambiar el estado del usuario
    console.log('Cambiando estado del usuario:', userId);
  };

  const handleDeleteUser = (userId) => {
    // Aquí se implementaría la lógica para eliminar el usuario
    console.log('Eliminando usuario:', userId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gestión de Usuarios
        </h1>
        <p className="text-gray-600">
          Crea usuarios, asigna roles y gestiona permisos para asegurar la seguridad
        </p>
      </div>

      {/* Filtros y Acciones */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Todos ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('provider')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'provider'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Proveedores ({users.filter(u => u.role === 'provider').length})
            </button>
            <button
              onClick={() => setActiveTab('purchaser')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'purchaser'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Compras ({users.filter(u => u.role === 'purchaser').length})
            </button>
            <button
              onClick={() => setActiveTab('finance')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'finance'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Finanzas ({users.filter(u => u.role === 'finance').length})
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'admin'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Administradores ({users.filter(u => u.role === 'admin').length})
            </button>
          </div>

          <Button variant="primary" onClick={handleCreateUser}>
            Crear Usuario
          </Button>
        </div>
      </div>

      {/* Lista de Usuarios */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-gray-600">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {getRoleText(user.role)}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {getStatusText(user.status)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Último acceso</p>
                  <p className="text-sm text-gray-900">{user.lastLogin}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditUser(user)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleStatus(user.id)}
                  >
                    {user.status === 'active' ? 'Desactivar' : 'Activar'}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay usuarios</h3>
            <p className="mt-1 text-sm text-gray-500">
              No se encontraron usuarios con el filtro seleccionado.
            </p>
          </div>
        </Card>
      )}

      {/* Modal para Crear/Editar Usuario */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {showCreateModal ? 'Crear Usuario' : 'Editar Usuario'}
              </h3>
              
              <form onSubmit={handleUserSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={userForm.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userForm.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rol
                    </label>
                    <select
                      name="role"
                      value={userForm.role}
                      onChange={(e) => handleRoleChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado
                    </label>
                    <select
                      name="status"
                      value={userForm.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Activo</option>
                      <option value="inactive">Inactivo</option>
                      <option value="pending">Pendiente</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Permisos
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-300 rounded-md p-3">
                    {permissions.map((permission) => (
                      <label key={permission.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={userForm.permissions.includes(permission.id)}
                          onChange={() => handlePermissionChange(permission.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <span className="text-sm font-medium text-gray-900">
                            {permission.name}
                          </span>
                          <p className="text-xs text-gray-500">
                            {permission.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                  >
                    {showCreateModal ? 'Crear Usuario' : 'Guardar Cambios'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowCreateModal(false);
                      setShowEditModal(false);
                      setSelectedUser(null);
                    }}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement; 