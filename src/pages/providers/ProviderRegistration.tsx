import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Snackbar,
  Container,
  Avatar,
  LinearProgress,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowBack, 
  Business, 
  Assignment, 
  Description, 
  ContactMail, 
  CheckCircle,
  ArrowForward,
  Check,
} from '@mui/icons-material';
import { useAppContext } from '../../context/AppContext';

const steps = ['Información Fiscal', 'Datos de Contacto', 'Documentos Requeridos', 'Revisión Final'];

const ProviderRegistration: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useAppContext();
  // Force dark mode update - v2
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    taxId: '',
    businessType: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    bankAccount: '',
    bankName: '',
    documents: [] as File[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    switch (activeStep) {
      case 0:
        if (!formData.companyName) newErrors.companyName = 'Nombre de empresa es requerido';
        if (!formData.taxId) newErrors.taxId = 'RFC es requerido';
        if (!formData.businessType) newErrors.businessType = 'Tipo de negocio es requerido';
        break;
      case 1:
        if (!formData.address) newErrors.address = 'Dirección es requerida';
        if (!formData.city) newErrors.city = 'Ciudad es requerida';
        if (!formData.state) newErrors.state = 'Estado es requerido';
        break;
      case 2:
        if (!formData.phone) newErrors.phone = 'Teléfono es requerido';
        if (!formData.email) newErrors.email = 'Email es requerido';
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Email inválido';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateStep()) {
      // Simular envío de datos
      setTimeout(() => {
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }, 1000);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ p: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 4,
              p: 3,
              backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
              borderRadius: 2,
              border: `1px solid ${isDarkMode ? '#334155' : '#e9ecef'}`,
            }}>
              <Avatar sx={{
                bgcolor: isDarkMode ? '#60a5fa' : '#6366f1',
                color: '#ffffff',
                mr: 3,
                width: 56,
                height: 56,
                boxShadow: isDarkMode 
                  ? '0 4px 16px rgba(96, 165, 250, 0.3)' 
                  : '0 4px 16px rgba(99, 102, 241, 0.3)',
              }}>
                <Assignment />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ 
                  color: isDarkMode ? '#f8fafc' : '#1f2937',
                  fontWeight: 600,
                  mb: 1,
                }}>
                  Información Fiscal
                </Typography>
                <Typography variant="body2" sx={{
                  color: isDarkMode ? '#cbd5e1' : '#6b7280',
                }}>
                  Complete los datos fiscales de su empresa
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4 
            }}>
                              <TextField
                  fullWidth
                  label="RFC"
                  value={formData.taxId}
                  onChange={(e) => handleInputChange('taxId', e.target.value)}
                  error={!!errors.taxId}
                  helperText={errors.taxId}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                      color: isDarkMode ? '#f8fafc' : '#1f2937',
                      borderRadius: 1.5,
                      '&:hover': {
                        backgroundColor: isDarkMode ? '#334155' : '#f9fafb',
                        borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                      },
                      '&.Mui-focused': {
                        backgroundColor: isDarkMode ? '#334155' : '#ffffff',
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
                      borderColor: isDarkMode ? '#475569' : '#d1d5db',
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
                label="Razón Social"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                error={!!errors.companyName}
                helperText={errors.companyName}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    color: isDarkMode ? '#f8fafc' : '#1f2937',
                    borderRadius: 1.5,
                    '&:hover': {
                      backgroundColor: isDarkMode ? '#334155' : '#f9fafb',
                      borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                    },
                    '&.Mui-focused': {
                      backgroundColor: isDarkMode ? '#334155' : '#ffffff',
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
                    borderColor: isDarkMode ? '#475569' : '#d1d5db',
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
                label="Domicilio Fiscal"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                error={!!errors.address}
                helperText={errors.address}
                required
                variant="outlined"
                sx={{
                  gridColumn: { xs: '1', md: '1 / -1' },
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    color: isDarkMode ? '#f8fafc' : '#1f2937',
                    borderRadius: 1.5,
                    '&:hover': {
                      backgroundColor: isDarkMode ? '#334155' : '#f9fafb',
                      borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                    },
                    '&.Mui-focused': {
                      backgroundColor: isDarkMode ? '#334155' : '#ffffff',
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
                    borderColor: isDarkMode ? '#475569' : '#d1d5db',
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                  },
                }}
              />
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ p: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 4,
              p: 3,
              backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
              borderRadius: 2,
              border: `1px solid ${isDarkMode ? '#334155' : '#e9ecef'}`,
            }}>
              <Avatar sx={{
                bgcolor: isDarkMode ? '#60a5fa' : '#6366f1',
                color: '#ffffff',
                mr: 3,
                width: 56,
                height: 56,
                boxShadow: isDarkMode 
                  ? '0 4px 16px rgba(96, 165, 250, 0.3)' 
                  : '0 4px 16px rgba(99, 102, 241, 0.3)',
              }}>
                <ContactMail />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ 
                  color: isDarkMode ? '#f8fafc' : '#1f2937',
                  fontWeight: 600,
                  mb: 1,
                }}>
                  Datos de Contacto
                </Typography>
                <Typography variant="body2" sx={{
                  color: isDarkMode ? '#cbd5e1' : '#6b7280',
                }}>
                  Información de contacto de la empresa
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4 
            }}>
              <TextField
                fullWidth
                label="Teléfono de la Empresa"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                error={!!errors.phone}
                helperText={errors.phone}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    color: isDarkMode ? '#f8fafc' : '#1f2937',
                    borderRadius: 1.5,
                    '&:hover': {
                      backgroundColor: isDarkMode ? '#334155' : '#f9fafb',
                      borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                    },
                    '&.Mui-focused': {
                      backgroundColor: isDarkMode ? '#334155' : '#ffffff',
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
                    borderColor: isDarkMode ? '#475569' : '#d1d5db',
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
                label="Email de la Empresa"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    color: isDarkMode ? '#f8fafc' : '#1f2937',
                    borderRadius: 1.5,
                    '&:hover': {
                      backgroundColor: isDarkMode ? '#334155' : '#f9fafb',
                      borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                    },
                    '&.Mui-focused': {
                      backgroundColor: isDarkMode ? '#334155' : '#ffffff',
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
                    borderColor: isDarkMode ? '#475569' : '#d1d5db',
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
                label="Persona de Contacto"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                variant="outlined"
                sx={{
                  gridColumn: { xs: '1', md: '1 / -1' },
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    color: isDarkMode ? '#f8fafc' : '#1f2937',
                    borderRadius: 1.5,
                    '&:hover': {
                      backgroundColor: isDarkMode ? '#334155' : '#f9fafb',
                      borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                    },
                    '&.Mui-focused': {
                      backgroundColor: isDarkMode ? '#334155' : '#ffffff',
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
                    borderColor: isDarkMode ? '#475569' : '#d1d5db',
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                  },
                }}
              />
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ p: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 4,
              p: 3,
              backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f9fa',
              borderRadius: 2,
              border: `1px solid ${isDarkMode ? '#333' : '#e9ecef'}`,
            }}>
              <Avatar sx={{
                bgcolor: isDarkMode ? '#6366f1' : '#6366f1',
                color: '#ffffff',
                mr: 3,
                width: 56,
                height: 56,
              }}>
                <Description />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ 
                  color: isDarkMode ? '#ffffff' : '#1f2937',
                  fontWeight: 600,
                  mb: 1,
                }}>
                  Documentos Requeridos
                </Typography>
                <Typography variant="body2" sx={{
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                }}>
                  Suba los documentos necesarios para completar el registro
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4 
            }}>
              <TextField
                fullWidth
                label="Acta Constitutiva"
                type="file"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    color: isDarkMode ? '#f8fafc' : '#1f2937',
                    borderRadius: 1.5,
                    '&:hover': {
                      backgroundColor: isDarkMode ? '#334155' : '#f9fafb',
                      borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                    },
                    '&.Mui-focused': {
                      backgroundColor: isDarkMode ? '#334155' : '#ffffff',
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
                    borderColor: isDarkMode ? '#475569' : '#d1d5db',
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
                label="RFC"
                type="file"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    color: isDarkMode ? '#f8fafc' : '#1f2937',
                    borderRadius: 1.5,
                    '&:hover': {
                      backgroundColor: isDarkMode ? '#334155' : '#f9fafb',
                      borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                    },
                    '&.Mui-focused': {
                      backgroundColor: isDarkMode ? '#334155' : '#ffffff',
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
                    borderColor: isDarkMode ? '#475569' : '#d1d5db',
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                  },
                }}
              />
            </Box>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ p: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 4,
              p: 3,
              backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f9fa',
              borderRadius: 2,
              border: `1px solid ${isDarkMode ? '#333' : '#e9ecef'}`,
            }}>
              <Avatar sx={{
                bgcolor: isDarkMode ? '#10b981' : '#10b981',
                color: '#ffffff',
                mr: 3,
                width: 56,
                height: 56,
              }}>
                <CheckCircle />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ 
                  color: isDarkMode ? '#ffffff' : '#1f2937',
                  fontWeight: 600,
                  mb: 1,
                }}>
                  Revisión Final
                </Typography>
                <Typography variant="body2" sx={{
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                }}>
                  Revise la información antes de completar el registro
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4 
            }}>
              <Box sx={{
                p: 3,
                backgroundColor: isDarkMode ? '#334155' : '#f9fafb',
                borderRadius: 2,
                border: `1px solid ${isDarkMode ? '#475569' : '#e5e7eb'}`,
              }}>
                <Typography variant="subtitle2" sx={{ 
                  color: isDarkMode ? '#60a5fa' : '#6366f1',
                  mb: 2,
                  fontWeight: 600,
                }}>
                  RFC
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: isDarkMode ? '#f8fafc' : '#1f2937',
                  fontWeight: 500,
                }}>
                  {formData.taxId || 'No especificado'}
                </Typography>
              </Box>
              <Box sx={{
                p: 3,
                backgroundColor: isDarkMode ? '#1e293b' : '#f9fafb',
                borderRadius: 2,
                border: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
              }}>
                <Typography variant="subtitle2" sx={{ 
                  color: isDarkMode ? '#60a5fa' : '#6366f1',
                  mb: 2,
                  fontWeight: 600,
                }}>
                  Razón Social
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: isDarkMode ? '#f8fafc' : '#1f2937',
                  fontWeight: 500,
                }}>
                  {formData.companyName || 'No especificado'}
                </Typography>
              </Box>
              <Box sx={{
                p: 3,
                backgroundColor: isDarkMode ? '#1e293b' : '#f9fafb',
                borderRadius: 2,
                border: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
              }}>
                <Typography variant="subtitle2" sx={{ 
                  color: isDarkMode ? '#60a5fa' : '#6366f1',
                  mb: 2,
                  fontWeight: 600,
                }}>
                  Email
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: isDarkMode ? '#f8fafc' : '#1f2937',
                  fontWeight: 500,
                }}>
                  {formData.email || 'No especificado'}
                </Typography>
              </Box>
              <Box sx={{
                p: 3,
                backgroundColor: isDarkMode ? '#1e293b' : '#f9fafb',
                borderRadius: 2,
                border: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
              }}>
                <Typography variant="subtitle2" sx={{ 
                  color: isDarkMode ? '#60a5fa' : '#6366f1',
                  mb: 2,
                  fontWeight: 600,
                }}>
                  Teléfono
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: isDarkMode ? '#f8fafc' : '#1f2937',
                  fontWeight: 500,
                }}>
                  {formData.phone || 'No especificado'}
                </Typography>
              </Box>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: isDarkMode 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 10px 20px -5px rgba(0, 0, 0, 0.3)' 
          : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
        border: isDarkMode ? '1px solid #1e293b' : '1px solid #e5e7eb',
        minHeight: '100vh',
        // Force dark mode styling
        '& .MuiPaper-root': {
          backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
        },
      }}>
        {/* Header */}
        <Box sx={{ 
          p: 4,
          background: isDarkMode 
            ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/dashboard')}
              variant="text"
              sx={{
                mr: 3,
                color: isDarkMode ? '#60a5fa' : '#6366f1',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                },
              }}
            >
              Volver
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{
              bgcolor: isDarkMode ? '#60a5fa' : '#6366f1',
              color: '#ffffff',
              mr: 3,
              width: 64,
              height: 64,
              boxShadow: isDarkMode 
                ? '0 4px 20px rgba(96, 165, 250, 0.3)' 
                : '0 4px 20px rgba(99, 102, 241, 0.3)',
            }}>
              <Business />
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{
                fontWeight: 700,
                color: isDarkMode ? '#f8fafc' : '#1f2937',
                mb: 1,
              }}>
                Registro de Proveedor
              </Typography>
              <Typography variant="body1" sx={{
                color: isDarkMode ? '#cbd5e1' : '#6b7280',
                fontWeight: 500,
              }}>
                Complete el formulario para registrar su empresa como proveedor
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Progress */}
        <Box sx={{ p: 4, pb: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3 
          }}>
            <Typography variant="h6" sx={{
              color: isDarkMode ? '#f8fafc' : '#1f2937',
              fontWeight: 600,
            }}>
              Progreso
            </Typography>
            <Chip 
              label={`${Math.round((activeStep / (steps.length - 1)) * 100)}%`}
              sx={{
                backgroundColor: isDarkMode ? '#60a5fa' : '#6366f1',
                color: '#ffffff',
                fontWeight: 600,
                boxShadow: isDarkMode 
                  ? '0 2px 8px rgba(96, 165, 250, 0.3)' 
                  : '0 2px 8px rgba(99, 102, 241, 0.3)',
              }}
            />
          </Box>
          <LinearProgress
            variant="determinate"
            value={(activeStep / (steps.length - 1)) * 100}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: isDarkMode ? '#334155' : '#e5e7eb',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: isDarkMode
                  ? 'linear-gradient(90deg, #60a5fa 0%, #8b5cf6 100%)'
                  : 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: isDarkMode 
                  ? '0 2px 8px rgba(96, 165, 250, 0.3)' 
                  : '0 2px 8px rgba(99, 102, 241, 0.3)',
              },
            }}
          />
        </Box>

        {/* Stepper */}
        <Box sx={{ px: 4, pb: 4 }}>
          <Stepper activeStep={activeStep} sx={{
            '& .MuiStepLabel-root': {
              '& .MuiStepLabel-label': {
                fontWeight: 500,
                color: isDarkMode ? '#e2e8f0' : '#6b7280',
              },
            },
            '& .MuiStepIcon-root': {
              fontSize: '1.5rem',
              color: isDarkMode ? '#475569' : '#d1d5db',
              '&.Mui-active': {
                color: isDarkMode ? '#60a5fa' : '#6366f1',
              },
              '&.Mui-completed': {
                color: isDarkMode ? '#34d399' : '#10b981',
              },
            },
            '& .MuiStepConnector-line': {
              borderColor: isDarkMode ? '#475569' : '#d1d5db',
            },
          }}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel sx={{
                  '& .MuiStepLabel-label': {
                    color: activeStep >= index
                      ? (isDarkMode ? '#60a5fa' : '#6366f1')
                      : (isDarkMode ? '#64748b' : '#9ca3af'),
                    fontWeight: activeStep === index ? 600 : 500,
                  },
                }}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Content */}
        <Box>
          {renderStepContent(activeStep)}
        </Box>

        {/* Navigation */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 4,
          pt: 2,
          borderTop: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
          background: isDarkMode ? '#1e293b' : '#f9fafb',
        }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            startIcon={<ArrowBack />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              px: 3,
              py: 1.5,
              color: isDarkMode ? '#60a5fa' : '#6366f1',
              borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
              backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.05)' : 'transparent',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                borderColor: isDarkMode ? '#93c5fd' : '#8b5cf6',
              },
              '&:disabled': {
                color: isDarkMode ? '#64748b' : '#9ca3af',
                borderColor: isDarkMode ? '#475569' : '#d1d5db',
                backgroundColor: 'transparent',
              },
            }}
          >
            Anterior
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                startIcon={<Check />}
                onClick={handleSubmit}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  background: isDarkMode
                    ? 'linear-gradient(135deg, #34d399 0%, #10b981 100%)'
                    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  boxShadow: isDarkMode 
                    ? '0 4px 16px rgba(52, 211, 153, 0.3)' 
                    : '0 4px 16px rgba(16, 185, 129, 0.3)',
                  '&:hover': {
                    background: isDarkMode
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    boxShadow: isDarkMode 
                      ? '0 6px 20px rgba(52, 211, 153, 0.4)' 
                      : '0 6px 20px rgba(16, 185, 129, 0.4)',
                  },
                }}
              >
                Completar Registro
              </Button>
            ) : (
              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={handleNext}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  background: isDarkMode
                    ? 'linear-gradient(135deg, #60a5fa 0%, #8b5cf6 100%)'
                    : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  boxShadow: isDarkMode 
                    ? '0 4px 16px rgba(96, 165, 250, 0.3)' 
                    : '0 4px 16px rgba(99, 102, 241, 0.3)',
                  '&:hover': {
                    background: isDarkMode
                      ? 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)'
                      : 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                    boxShadow: isDarkMode 
                      ? '0 6px 20px rgba(96, 165, 250, 0.4)' 
                      : '0 6px 20px rgba(99, 102, 241, 0.4)',
                  },
                }}
              >
                Siguiente
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          ¡Proveedor registrado exitosamente!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProviderRegistration; 