import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Card, CardContent, Avatar } from '@mui/material';
import { useAppContext } from '../context/AppContext';
import LogoutConfirmDialog from '../components/LogoutConfirmDialog';
import { useNavigate } from 'react-router-dom';
import {
  Business,
  Assignment,
  ShoppingCart,
  Receipt,
  Payment,
  TrendingUp,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const { user, logout } = useAppContext();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* User Info Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Información del Usuario
        </Typography>
        <Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Usuario: {user?.name} | Rol: {user?.role}
          </Typography>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Box>
      </Paper>

      {/* Dashboard Content */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard del Sistema
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Bienvenido al Sistema de Gestión de Proveedores
        </Typography>

        {/* Stats Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>
                  <Business />
                </Avatar>
                <Box>
                  <Typography variant="h4">45</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Proveedores
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#f57c00', mr: 2 }}>
                  <Assignment />
                </Avatar>
                <Box>
                  <Typography variant="h4">8</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pendientes
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#388e3c', mr: 2 }}>
                  <ShoppingCart />
                </Avatar>
                <Box>
                  <Typography variant="h4">12</Typography>
                  <Typography variant="body2" color="text.secondary">
                    RFQs Activas
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#d32f2f', mr: 2 }}>
                  <Receipt />
                </Avatar>
                <Box>
                  <Typography variant="h4">23</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Facturas Pendientes
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#7b1fa2', mr: 2 }}>
                  <Payment />
                </Avatar>
                <Box>
                  <Typography variant="h4">156</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pagos Totales
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#f57c00', mr: 2 }}>
                  <TrendingUp />
                </Avatar>
                <Box>
                  <Typography variant="h4">5</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pagos Vencidos
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Workflow Steps */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Flujo del Sistema
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2 }}>
              {[
                                 {
                   id: 1,
                   title: 'Alta del Proveedor',
                   description: 'Registro y validación de documentos',
                   icon: <Business />,
                   color: '#1976d2',
                   path: '/providers/provider-registration',
                 },
                 {
                   id: 2,
                   title: 'Solicitud de Cotización',
                   description: 'Creación y envío de RFQs',
                   icon: <Assignment />,
                   color: '#388e3c',
                   path: '/purchases/create-rfq',
                 },
                {
                  id: 3,
                  title: 'Revisión de Cotizaciones',
                  description: 'Evaluación y aprobación',
                  icon: <ShoppingCart />,
                  color: '#f57c00',
                  path: '/purchases/quotations',
                },
                {
                  id: 4,
                  title: 'Orden de Compra',
                  description: 'Generación y envío automático',
                  icon: <Receipt />,
                  color: '#7b1fa2',
                  path: '/purchases/orders',
                },
                {
                  id: 5,
                  title: 'Facturación',
                  description: 'Recepción y validación',
                  icon: <Receipt />,
                  color: '#d32f2f',
                  path: '/finance/invoices',
                },
                {
                  id: 6,
                  title: 'Plan de Pagos',
                  description: 'Programación de pagos',
                  icon: <Payment />,
                  color: '#388e3c',
                  path: '/finance/payments',
                },
              ].map((step) => (
                <Card
                  key={step.id}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                  onClick={() => navigate(step.path)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: step.color, mr: 2 }}>
                        {step.icon}
                      </Avatar>
                      <Typography variant="h6">{step.id}</Typography>
                    </Box>
                    <Typography variant="subtitle1" gutterBottom>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Acciones Rápidas
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                             <Button
                 fullWidth
                 variant="contained"
                 startIcon={<Business />}
                 onClick={() => navigate('/providers/provider-registration')}
               >
                 Registrar Proveedor
               </Button>
               <Button
                 fullWidth
                 variant="outlined"
                 startIcon={<Assignment />}
                 onClick={() => navigate('/purchases/create-rfq')}
               >
                 Crear RFQ
               </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Receipt />}
                onClick={() => navigate('/finance/invoices')}
              >
                Ver Facturas
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Payment />}
                onClick={() => navigate('/finance/payments')}
              >
                Gestionar Pagos
              </Button>
            </Box>
          </Paper>
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

export default Dashboard; 