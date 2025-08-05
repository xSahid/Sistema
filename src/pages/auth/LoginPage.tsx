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
  Avatar,
  Container,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Lock, AdminPanelSettings, Person } from '@mui/icons-material';
import CustomAlert from '../../components/CustomAlert';
import IngenieroIcon from '../../assets/Img/ingeniero.png';

// Credenciales del administrador
const ADMIN_CREDENTIALS = {
  email: 'ADministradorAlZ3@gmail.com',
  password: 'AdMiniStrador01@'
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isDarkMode } = useAppContext();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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

  const validateAdminCredentials = (email: string, password: string) => {
    return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Validar credenciales del administrador
      if (formData.role === 'admin') {
        if (!validateAdminCredentials(formData.email, formData.password)) {
          setErrorMessage('Credenciales de administrador incorrectas');
          setShowError(true);
          return;
        }
      }

      // Simular autenticación exitosa
      const userData = {
        id: '1',
        name: formData.role === 'admin' ? 'Administrador del Sistema' : `Usuario ${formData.role}`,
        email: formData.email,
        role: formData.role as 'admin' | 'purchases' | 'finance' | 'provider'
      };

      // Mostrar alerta de éxito
      setSuccessMessage(`¡Bienvenido, ${userData.name}! Sesión iniciada correctamente.`);
      setShowSuccess(true);

      // Iniciar sesión y navegar después de un breve delay
      setTimeout(() => {
        login(userData);
        // Navegar según el rol del usuario
        if (userData.role === 'provider') {
          navigate('/providers/dashboard');
        } else {
          navigate('/dashboard');
        }
      }, 1500);
    } else {
      setErrorMessage('Por favor, completa todos los campos correctamente');
      setShowError(true);
    }
  };

  const handleDemoLogin = (role: 'admin' | 'purchases' | 'finance' | 'provider') => {
    let userData;
    
    if (role === 'admin') {
      userData = {
        id: '1',
        name: 'Administrador del Sistema',
        email: ADMIN_CREDENTIALS.email,
        role
      };
    } else {
      userData = {
        id: '1',
        name: `Usuario ${role}`,
        email: `demo@${role}.com`,
        role
      };
    }

    // Mostrar alerta de éxito
    setSuccessMessage(`¡Bienvenido, ${userData.name}! Sesión iniciada correctamente.`);
    setShowSuccess(true);

    // Iniciar sesión y navegar después de un breve delay
    setTimeout(() => {
      login(userData);
      // Navegar según el rol del usuario
      if (userData.role === 'provider') {
        navigate('/providers/dashboard');
      } else {
        navigate('/dashboard');
      }
    }, 1500);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: isDarkMode 
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4
    }}>
      <Container maxWidth="sm">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '100%'
        }}>
          <Paper sx={{ 
            p: 4, 
            width: '100%', 
            maxWidth: 450,
            borderRadius: 3,
            boxShadow: isDarkMode 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 10px 20px -5px rgba(0, 0, 0, 0.3)'
              : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            background: isDarkMode 
              ? 'linear-gradient(145deg, #1e293b 0%, #334155 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            border: isDarkMode 
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(10px)',
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
              <Avatar sx={{ 
                bgcolor: 'transparent',
                mb: 3, 
                width: 100, 
                height: 100,
                boxShadow: 'none',
              }}>
                <img 
                  src={IngenieroIcon} 
                  alt="SIP Sistema" 
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    objectFit: 'contain',
                    filter: isDarkMode ? 'brightness(1.2) contrast(1.1)' : 'none'
                  }} 
                />
              </Avatar>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, #60a5fa 0%, #8b5cf6 100%)'
                    : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: 'center',
                  mb: 1
                }}
              >
                SIP - Sistema Integral de Proveedores
              </Typography>
              <Typography 
                variant="body1" 
                sx={{
                  color: isDarkMode ? '#cbd5e1' : '#6b7280',
                  textAlign: 'center',
                  fontWeight: 500
                }}
              >
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    color: isDarkMode ? '#f8fafc' : '#1f2937',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                      borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                    },
                    '&.Mui-focused': {
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
                      boxShadow: isDarkMode 
                        ? '0 0 0 3px rgba(96, 165, 250, 0.1)' 
                        : '0 0 0 3px rgba(99, 102, 241, 0.1)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: isDarkMode ? '#e2e8f0' : '#6b7280',
                    '&.Mui-focused': {
                      color: isDarkMode ? '#60a5fa' : '#6366f1',
                    },
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                  },
                }}
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    color: isDarkMode ? '#f8fafc' : '#1f2937',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                      borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                    },
                    '&.Mui-focused': {
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
                      boxShadow: isDarkMode 
                        ? '0 0 0 3px rgba(96, 165, 250, 0.1)' 
                        : '0 0 0 3px rgba(99, 102, 241, 0.1)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: isDarkMode ? '#e2e8f0' : '#6b7280',
                    '&.Mui-focused': {
                      color: isDarkMode ? '#60a5fa' : '#6366f1',
                    },
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                  },
                }}
              />
              <FormControl fullWidth margin="normal" error={!!errors.role} sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                  color: isDarkMode ? '#f8fafc' : '#1f2937',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                    borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                  },
                  '&.Mui-focused': {
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
                    boxShadow: isDarkMode 
                      ? '0 0 0 3px rgba(96, 165, 250, 0.1)' 
                      : '0 0 0 3px rgba(99, 102, 241, 0.1)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: isDarkMode ? '#e2e8f0' : '#6b7280',
                  '&.Mui-focused': {
                    color: isDarkMode ? '#60a5fa' : '#6366f1',
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                },
              }}>
                <InputLabel>Rol</InputLabel>
                <Select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  label="Rol"
                >
                  <MenuItem value="admin">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AdminPanelSettings sx={{ mr: 1, fontSize: 20 }} />
                      Administrador
                    </Box>
                  </MenuItem>
                  <MenuItem value="purchases">Compras</MenuItem>
                  <MenuItem value="finance">Finanzas</MenuItem>
                  <MenuItem value="provider">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Person sx={{ mr: 1, fontSize: 20 }} />
                      Proveedor
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                startIcon={<Lock />}
                sx={{ 
                  mt: 3, 
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  background: isDarkMode
                    ? 'linear-gradient(135deg, #60a5fa 0%, #8b5cf6 100%)'
                    : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  boxShadow: isDarkMode 
                    ? '0 8px 32px rgba(96, 165, 250, 0.3)'
                    : '0 8px 32px rgba(99, 102, 241, 0.3)',
                  '&:hover': {
                    background: isDarkMode
                      ? 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)'
                      : 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                    boxShadow: isDarkMode 
                      ? '0 12px 40px rgba(96, 165, 250, 0.4)'
                      : '0 12px 40px rgba(99, 102, 241, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Iniciar Sesión
              </Button>
            </form>

            <Divider sx={{ my: 3, borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="body2" sx={{ color: isDarkMode ? '#cbd5e1' : '#6b7280' }}>
                Acceso Rápido (Demo)
              </Typography>
            </Divider>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleDemoLogin('admin')}
                sx={{ 
                  fontSize: '0.75rem',
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                  color: isDarkMode ? '#60a5fa' : '#6366f1',
                  backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.05)' : 'rgba(99, 102, 241, 0.05)',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                    borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease',
                }}
                startIcon={<AdminPanelSettings />}
              >
                Administrador
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleDemoLogin('purchases')}
                sx={{ 
                  fontSize: '0.75rem',
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                  color: isDarkMode ? '#60a5fa' : '#6366f1',
                  backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.05)' : 'rgba(99, 102, 241, 0.05)',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                    borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Compras
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleDemoLogin('finance')}
                sx={{ 
                  fontSize: '0.75rem',
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                  color: isDarkMode ? '#60a5fa' : '#6366f1',
                  backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.05)' : 'rgba(99, 102, 241, 0.05)',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                    borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Finanzas
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleDemoLogin('provider')}
                sx={{ 
                  fontSize: '0.75rem',
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                  color: isDarkMode ? '#60a5fa' : '#6366f1',
                  backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.05)' : 'rgba(99, 102, 241, 0.05)',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                    borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease',
                }}
                startIcon={<Person />}
              >
                Proveedor
              </Button>
            </Box>

            <Box sx={{ 
              mt: 3, 
              p: 2, 
              borderRadius: 2,
              background: isDarkMode 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.02)',
              border: isDarkMode 
                ? '1px solid rgba(255, 255, 255, 0.1)' 
                : '1px solid rgba(0, 0, 0, 0.05)',
            }}>
              <Typography variant="caption" sx={{ 
                color: isDarkMode ? '#cbd5e1' : '#6b7280', 
                textAlign: 'center', 
                display: 'block',
                fontWeight: 500,
              }}>
                <strong>Credenciales de Administrador:</strong><br />
                Email: {ADMIN_CREDENTIALS.email}<br />
                Contraseña: {ADMIN_CREDENTIALS.password}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>

      <CustomAlert
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Error de Autenticación"
        message={errorMessage}
        type="error"
      />

      <CustomAlert
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="¡Sesión Iniciada!"
        message={successMessage}
        type="success"
      />
    </Box>
  );
};

export default LoginPage; 