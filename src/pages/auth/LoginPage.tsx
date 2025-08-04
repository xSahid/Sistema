import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Avatar,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Lock, Business } from '@mui/icons-material';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showError, setShowError] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = 'Email es requerido';
    if (!formData.password) newErrors.password = 'Contraseña es requerida';
    if (!formData.role) newErrors.role = 'Rol es requerido';

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simular autenticación exitosa
      const userData = {
        id: '1',
        name: `Usuario ${formData.role}`,
        email: formData.email,
        role: formData.role as 'admin' | 'purchases' | 'finance' | 'provider'
      };

      login(userData);
      navigate('/dashboard');
    } else {
      setShowError(true);
    }
  };

  const handleDemoLogin = (role: 'admin' | 'purchases' | 'finance' | 'provider') => {
    const userData = {
      id: '1',
      name: `Usuario ${role}`,
      email: `demo@${role}.com`,
      role
    };

    login(userData);
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh',
        py: 4
      }}>
        <Paper sx={{ p: 4, width: '100%', maxWidth: 400 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ bgcolor: '#1976d2', mb: 2, width: 56, height: 56 }}>
              <Business />
            </Avatar>
            <Typography variant="h4" gutterBottom>
              SIP - Sistema Integral de Proveedores
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              Inicia sesión para acceder al sistema
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal" error={!!errors.role}>
              <InputLabel>Rol</InputLabel>
              <Select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                label="Rol"
              >
                <MenuItem value="admin">Administrador</MenuItem>
                <MenuItem value="purchases">Compras</MenuItem>
                <MenuItem value="finance">Finanzas</MenuItem>
                <MenuItem value="provider">Proveedor</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              startIcon={<Lock />}
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión
            </Button>
          </form>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom align="center">
              Acceso Rápido (Demo)
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleDemoLogin('admin')}
                sx={{ fontSize: '0.75rem' }}
              >
                Admin
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleDemoLogin('purchases')}
                sx={{ fontSize: '0.75rem' }}
              >
                Compras
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleDemoLogin('finance')}
                sx={{ fontSize: '0.75rem' }}
              >
                Finanzas
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleDemoLogin('provider')}
                sx={{ fontSize: '0.75rem' }}
              >
                Proveedor
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Por favor, completa todos los campos correctamente.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage; 