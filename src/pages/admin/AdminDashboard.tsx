import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Card, 
  CardContent, 
  Avatar, 
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import { useAppContext } from '../../context/AppContext';
import LogoutConfirmDialog from '../../components/LogoutConfirmDialog';
import { useNavigate } from 'react-router-dom';
import {
  Business,
  Assignment,
  ShoppingCart,
  Receipt,
  Payment,
  AdminPanelSettings,
  People,
  Description,
  Security,
  Settings,
  Assessment,
  Notifications,
  Refresh
} from '@mui/icons-material';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAppContext();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const adminModules = [
    {
      title: 'Gestión de Usuarios',
      description: 'Administrar usuarios del sistema',
      icon: <People />,
      color: '#1976d2',
      path: '/admin/users',
      badge: '3 nuevos'
    },
    {
      title: 'Gestión de Documentos',
      description: 'Administrar documentos del sistema',
      icon: <Description />,
      color: '#388e3c',
      path: '/admin/documents',
      badge: '12 pendientes'
    },
    {
      title: 'Configuración del Sistema',
      description: 'Configurar parámetros del sistema',
      icon: <Settings />,
      color: '#f57c00',
      path: '/admin/settings',
      badge: '2 actualizaciones'
    },
    {
      title: 'Seguridad',
      description: 'Configurar políticas de seguridad',
      icon: <Security />,
      color: '#d32f2f',
      path: '/admin/security',
      badge: '1 alerta'
    }
  ];

  const systemStats = [
    {
      title: 'Total Usuarios',
      value: '156',
      icon: <People />,
      color: '#1976d2',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Proveedores Activos',
      value: '89',
      icon: <Business />,
      color: '#388e3c',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'RFQs Pendientes',
      value: '23',
      icon: <Assignment />,
      color: '#f57c00',
      change: '-8%',
      changeType: 'negative'
    },
    {
      title: 'Facturas por Pagar',
      value: '67',
      icon: <Receipt />,
      color: '#d32f2f',
      change: '+15%',
      changeType: 'negative'
    },
    {
      title: 'Pagos Realizados',
      value: '234',
      icon: <Payment />,
      color: '#7b1fa2',
      change: '+23%',
      changeType: 'positive'
    },
    {
      title: 'Documentos Pendientes',
      value: '12',
      icon: <Description />,
      color: '#ff9800',
      change: '-3%',
      changeType: 'positive'
    }
  ];

  const quickActions = [
    {
      title: 'Registrar Proveedor',
      description: 'Agregar nuevo proveedor al sistema',
      icon: <Business />,
      path: '/providers/provider-registration',
      color: '#1976d2'
    },
    {
      title: 'Crear RFQ',
      description: 'Generar nueva solicitud de cotización',
      icon: <Assignment />,
      path: '/purchases/create-rfq',
      color: '#388e3c'
    },
    {
      title: 'Revisar Cotizaciones',
      description: 'Evaluar cotizaciones recibidas',
      icon: <ShoppingCart />,
      path: '/purchases/quotations',
      color: '#f57c00'
    },
    {
      title: 'Gestionar Facturas',
      description: 'Administrar facturas del sistema',
      icon: <Receipt />,
      path: '/finance/invoices',
      color: '#d32f2f'
    },
    {
      title: 'Configurar Pagos',
      description: 'Programar pagos automáticos',
      icon: <Payment />,
      path: '/finance/payments',
      color: '#7b1fa2'
    },
    {
      title: 'Ver Reportes',
      description: 'Generar reportes del sistema',
      icon: <Assessment />,
      path: '/admin/reports',
      color: '#ff9800'
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}>
              <AdminPanelSettings />
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Panel de Administración
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Bienvenido, {user?.name} | Control total del sistema
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Actualizar datos">
              <IconButton sx={{ color: 'white' }}>
                <Refresh />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notificaciones">
              <IconButton sx={{ color: 'white' }}>
                <Notifications />
              </IconButton>
            </Tooltip>
            <Button 
              variant="outlined" 
              color="inherit" 
              onClick={handleLogout}
              sx={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white' }}
            >
              Cerrar Sesión
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* System Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)' }, gap: 3, mb: 4 }}>
        {systemStats.map((stat, index) => (
          <Card key={index} sx={{ 
            height: '100%',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 4,
            }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Avatar sx={{ bgcolor: stat.color, width: 48, height: 48 }}>
                  {stat.icon}
                </Avatar>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: stat.changeType === 'positive' ? 'success.main' : 'error.main',
                      fontWeight: 600
                    }}
                  >
                    {stat.change}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Admin Modules */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Módulos de Administración
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
          {adminModules.map((module, index) => (
            <Card 
              key={index}
              sx={{ 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                }
              }}
              onClick={() => navigate(module.path)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: module.color, mr: 2 }}>
                    {module.icon}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {module.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {module.badge}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {module.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>

      {/* Quick Actions */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Acciones Rápidas
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {quickActions.map((action, index) => (
            <Card 
              key={index}
              sx={{ 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                }
              }}
              onClick={() => navigate(action.path)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: action.color, mr: 2 }}>
                    {action.icon}
                  </Avatar>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {action.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {action.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>

      {/* System Alerts */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Alertas del Sistema
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Alert severity="warning" sx={{ alignItems: 'center' }}>
            <Typography variant="body2">
              <strong>3 usuarios</strong> requieren verificación de documentos
            </Typography>
          </Alert>
          <Alert severity="info" sx={{ alignItems: 'center' }}>
            <Typography variant="body2">
              <strong>5 RFQs</strong> están próximas a vencer
            </Typography>
          </Alert>
          <Alert severity="error" sx={{ alignItems: 'center' }}>
            <Typography variant="body2">
              <strong>2 facturas</strong> han excedido el plazo de pago
            </Typography>
          </Alert>
          <Alert severity="success" sx={{ alignItems: 'center' }}>
            <Typography variant="body2">
              <strong>12 pagos</strong> se han procesado exitosamente hoy
            </Typography>
          </Alert>
        </Box>
      </Paper>

      {/* Logout Confirm Dialog */}
      <LogoutConfirmDialog
        open={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={() => {
          logout();
          setShowLogoutConfirm(false);
        }}
      />
    </Box>
  );
};

export default AdminDashboard; 