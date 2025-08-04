import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Chip,
  Avatar,
  Container,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import {
  Business,
  ArrowBack,
  ArrowForward,
  Check,
  Close,
  CheckCircle,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppContext } from '../../context/AppContext';

const steps = [
  'Información Fiscal',
  'Datos de Contacto',
  'Revisión Final',
];

const validationSchema = yup.object({
  rfc: yup
    .string()
    .required('RFC es requerido')
    .matches(/^[A-Z&Ñ]{3,4}[0-9]{6}[A-Z0-9]{3}$/, 'RFC inválido'),
  businessName: yup.string().required('Razón social es requerida'),
  address: yup.string().required('Domicilio es requerido'),
  contactName: yup.string().required('Nombre de contacto es requerido'),
  contactEmail: yup.string().email('Email inválido').required('Email es requerido'),
  contactPhone: yup.string().required('Teléfono es requerido'),
});

interface FormData {
  rfc: string;
  businessName: string;
  address: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

const SupplierRegistration: React.FC = () => {
  const { isDarkMode } = useAppContext();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      rfc: '',
      businessName: '',
      address: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
    },
  });

  const watchedValues = watch();

  const handleNext = () => {
    const currentData = getCurrentStepData();
    if (validateCurrentStep(currentData)) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      // Forzar la validación para mostrar errores
      if (activeStep === 0) {
        // Trigger validation for step 0 fields
        if (!watchedValues.rfc) errors.rfc = { message: 'RFC es requerido', type: 'required' };
        if (!watchedValues.businessName) errors.businessName = { message: 'Razón social es requerida', type: 'required' };
        if (!watchedValues.address) errors.address = { message: 'Domicilio es requerido', type: 'required' };
      } else if (activeStep === 1) {
        // Trigger validation for step 1 fields
        if (!watchedValues.contactName) errors.contactName = { message: 'Nombre de contacto es requerido', type: 'required' };
        if (!watchedValues.contactEmail) errors.contactEmail = { message: 'Email es requerido', type: 'required' };
        if (!watchedValues.contactPhone) errors.contactPhone = { message: 'Teléfono es requerido', type: 'required' };
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getCurrentStepData = () => {
    switch (activeStep) {
      case 0:
        return {
          rfc: watchedValues.rfc || '',
          businessName: watchedValues.businessName || '',
          address: watchedValues.address || '',
        };
      case 1:
        return {
          contactName: watchedValues.contactName || '',
          contactEmail: watchedValues.contactEmail || '',
          contactPhone: watchedValues.contactPhone || '',
        };
      case 2:
        return {
          // El paso 2 es solo revisión, no requiere validación adicional
          review: true,
        };
      default:
        return {};
    }
  };

  const validateCurrentStep = (data: any) => {
    switch (activeStep) {
      case 0:
        // Validar que todos los campos estén llenos y sin errores
        return data.rfc && data.businessName && data.address && 
               !errors.rfc && !errors.businessName && !errors.address;
      case 1:
        // Validar que todos los campos estén llenos y sin errores
        return data.contactName && data.contactEmail && data.contactPhone &&
               !errors.contactName && !errors.contactEmail && !errors.contactPhone;
      case 2:
        // El paso 2 es solo revisión, siempre es válido
        return true;
      default:
        return true;
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log('Supplier registration data:', data);
      
      setDialogMessage('Proveedor registrado exitosamente. Su solicitud ha sido enviada y está pendiente de aprobación.');
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error registering supplier:', error);
      setDialogMessage('Error al registrar proveedor. Por favor, intente nuevamente.');
      setShowErrorDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
    window.location.href = '/';
  };

  const handleErrorDialogClose = () => {
    setShowErrorDialog(false);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <Controller
                name="rfc"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="RFC"
                    error={!!errors.rfc}
                    helperText={errors.rfc?.message}
                    placeholder="Ej: ABC123456789"
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
                )}
              />
            </Box>
            <Box>
              <Controller
                name="businessName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Razón Social"
                    error={!!errors.businessName}
                    helperText={errors.businessName?.message}
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
                )}
              />
            </Box>
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Domicilio Fiscal"
                    multiline
                    rows={3}
                    error={!!errors.address}
                    helperText={errors.address?.message}
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
                )}
              />
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <Controller
                name="contactName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nombre del Contacto"
                    error={!!errors.contactName}
                    helperText={errors.contactName?.message}
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
                )}
              />
            </Box>
            <Box>
              <Controller
                name="contactEmail"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email de Contacto"
                    type="email"
                    error={!!errors.contactEmail}
                    helperText={errors.contactEmail?.message}
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
                )}
              />
            </Box>
            <Box>
              <Controller
                name="contactPhone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Teléfono de Contacto"
                    error={!!errors.contactPhone}
                    helperText={errors.contactPhone?.message}
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
                )}
              />
            </Box>
          </Box>
        );

             case 2:
         return (
           <Box sx={{ p: 3 }}>
             <Typography variant="h6" sx={{
               color: isDarkMode ? '#f8fafc' : '#1f2937',
               fontWeight: 600,
               mb: 3,
             }}>
               Revisión de Datos
             </Typography>
             
             <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
               {/* Información Fiscal */}
               <Box sx={{
                 p: 3,
                 backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
                 borderRadius: 2,
                 border: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
               }}>
                 <Typography variant="subtitle1" sx={{
                   color: isDarkMode ? '#60a5fa' : '#6366f1',
                   fontWeight: 600,
                   mb: 2,
                 }}>
                   Información Fiscal
                 </Typography>
                 <Box sx={{ mb: 2 }}>
                   <Typography variant="body2" sx={{ color: isDarkMode ? '#cbd5e1' : '#6b7280', mb: 0.5 }}>
                     RFC:
                   </Typography>
                   <Typography variant="body1" sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937', fontWeight: 500 }}>
                     {watchedValues.rfc || 'No especificado'}
                   </Typography>
                 </Box>
                 <Box sx={{ mb: 2 }}>
                   <Typography variant="body2" sx={{ color: isDarkMode ? '#cbd5e1' : '#6b7280', mb: 0.5 }}>
                     Razón Social:
                   </Typography>
                   <Typography variant="body1" sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937', fontWeight: 500 }}>
                     {watchedValues.businessName || 'No especificado'}
                   </Typography>
                 </Box>
                 <Box>
                   <Typography variant="body2" sx={{ color: isDarkMode ? '#cbd5e1' : '#6b7280', mb: 0.5 }}>
                     Domicilio Fiscal:
                   </Typography>
                   <Typography variant="body1" sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937', fontWeight: 500 }}>
                     {watchedValues.address || 'No especificado'}
                   </Typography>
                 </Box>
               </Box>

               {/* Datos de Contacto */}
               <Box sx={{
                 p: 3,
                 backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
                 borderRadius: 2,
                 border: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
               }}>
                 <Typography variant="subtitle1" sx={{
                   color: isDarkMode ? '#60a5fa' : '#6366f1',
                   fontWeight: 600,
                   mb: 2,
                 }}>
                   Datos de Contacto
                 </Typography>
                 <Box sx={{ mb: 2 }}>
                   <Typography variant="body2" sx={{ color: isDarkMode ? '#cbd5e1' : '#6b7280', mb: 0.5 }}>
                     Nombre del Contacto:
                   </Typography>
                   <Typography variant="body1" sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937', fontWeight: 500 }}>
                     {watchedValues.contactName || 'No especificado'}
                   </Typography>
                 </Box>
                 <Box sx={{ mb: 2 }}>
                   <Typography variant="body2" sx={{ color: isDarkMode ? '#cbd5e1' : '#6b7280', mb: 0.5 }}>
                     Email:
                   </Typography>
                   <Typography variant="body1" sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937', fontWeight: 500 }}>
                     {watchedValues.contactEmail || 'No especificado'}
                   </Typography>
                 </Box>
                 <Box>
                   <Typography variant="body2" sx={{ color: isDarkMode ? '#cbd5e1' : '#6b7280', mb: 0.5 }}>
                     Teléfono:
                   </Typography>
                   <Typography variant="body1" sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937', fontWeight: 500 }}>
                     {watchedValues.contactPhone || 'No especificado'}
                   </Typography>
                 </Box>
               </Box>
             </Box>
           </Box>
         );

       default:
         return null;
     }
   };

  const canProceed = () => {
    switch (activeStep) {
      case 0:
        return !errors.rfc && !errors.businessName && !errors.address && 
               watchedValues.rfc && watchedValues.businessName && watchedValues.address;
      case 1:
        return !errors.contactName && !errors.contactEmail && !errors.contactPhone &&
               watchedValues.contactName && watchedValues.contactEmail && watchedValues.contactPhone;
      case 2:
        // En el paso de revisión, siempre se puede proceder
        return true;
      default:
        return false;
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
               label={`${Math.round(((activeStep + 1) / steps.length) * 100)}%`}
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
             value={((activeStep + 1) / steps.length) * 100}
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
        <Box sx={{ p: 4, pt: 0 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStepContent(activeStep)}

            {/* Navigation */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 4,
              pt: 3,
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
                    type="submit"
                    disabled={isSubmitting || !canProceed()}
                    startIcon={<Check />}
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
                      '&:disabled': {
                        background: isDarkMode ? '#475569' : '#d1d5db',
                        color: isDarkMode ? '#64748b' : '#9ca3af',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    {isSubmitting ? 'Registrando...' : 'Completar Registro'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!canProceed()}
                    endIcon={<ArrowForward />}
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
                      '&:disabled': {
                        background: isDarkMode ? '#475569' : '#d1d5db',
                        color: isDarkMode ? '#64748b' : '#9ca3af',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    Siguiente
                  </Button>
                )}
              </Box>
            </Box>
          </form>
                 </Box>
       </Paper>

       {/* Success Dialog */}
       <Dialog
         open={showSuccessDialog}
         onClose={handleSuccessDialogClose}
         maxWidth="sm"
         fullWidth
         PaperProps={{
           sx: {
             borderRadius: 3,
             backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
             border: isDarkMode ? '1px solid #334155' : '1px solid #e5e7eb',
             boxShadow: isDarkMode 
               ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
               : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
           }
         }}
       >
         <DialogTitle sx={{
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'space-between',
           pb: 1,
           borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
         }}>
           <Box sx={{ display: 'flex', alignItems: 'center' }}>
             <Box sx={{
               width: 48,
               height: 48,
               borderRadius: '50%',
               backgroundColor: '#10b981',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               mr: 2,
               boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
             }}>
               <CheckCircle sx={{ color: '#ffffff', fontSize: 24 }} />
             </Box>
             <Typography variant="h6" sx={{
               color: isDarkMode ? '#f8fafc' : '#1f2937',
               fontWeight: 600,
             }}>
               Proveedor Registrado
             </Typography>
           </Box>
           <IconButton
             onClick={handleSuccessDialogClose}
             sx={{
               color: isDarkMode ? '#64748b' : '#6b7280',
               '&:hover': {
                 backgroundColor: isDarkMode ? 'rgba(100, 116, 139, 0.1)' : 'rgba(107, 114, 128, 0.1)',
               },
             }}
           >
             <Close />
           </IconButton>
         </DialogTitle>
         <DialogContent sx={{ pt: 3, pb: 2 }}>
           <Typography variant="body1" sx={{
             color: isDarkMode ? '#cbd5e1' : '#6b7280',
             lineHeight: 1.6,
           }}>
             {dialogMessage}
           </Typography>
         </DialogContent>
         <DialogActions sx={{ p: 3, pt: 1 }}>
           <Button
             onClick={handleSuccessDialogClose}
             variant="contained"
             sx={{
               borderRadius: 2,
               textTransform: 'none',
               fontWeight: 600,
               px: 4,
               py: 1.5,
               background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
               boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
               '&:hover': {
                 background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                 boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
               },
             }}
           >
             Entendido
           </Button>
         </DialogActions>
       </Dialog>

       {/* Error Dialog */}
       <Dialog
         open={showErrorDialog}
         onClose={handleErrorDialogClose}
         maxWidth="sm"
         fullWidth
         PaperProps={{
           sx: {
             borderRadius: 3,
             backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
             border: isDarkMode ? '1px solid #334155' : '1px solid #e5e7eb',
             boxShadow: isDarkMode 
               ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
               : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
           }
         }}
       >
         <DialogTitle sx={{
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'space-between',
           pb: 1,
           borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
         }}>
           <Box sx={{ display: 'flex', alignItems: 'center' }}>
             <Box sx={{
               width: 48,
               height: 48,
               borderRadius: '50%',
               backgroundColor: '#ef4444',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               mr: 2,
               boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
             }}>
               <Close sx={{ color: '#ffffff', fontSize: 24 }} />
             </Box>
             <Typography variant="h6" sx={{
               color: isDarkMode ? '#f8fafc' : '#1f2937',
               fontWeight: 600,
             }}>
               Error en el Registro
             </Typography>
           </Box>
           <IconButton
             onClick={handleErrorDialogClose}
             sx={{
               color: isDarkMode ? '#64748b' : '#6b7280',
               '&:hover': {
                 backgroundColor: isDarkMode ? 'rgba(100, 116, 139, 0.1)' : 'rgba(107, 114, 128, 0.1)',
               },
             }}
           >
             <Close />
           </IconButton>
         </DialogTitle>
         <DialogContent sx={{ pt: 3, pb: 2 }}>
           <Typography variant="body1" sx={{
             color: isDarkMode ? '#cbd5e1' : '#6b7280',
             lineHeight: 1.6,
           }}>
             {dialogMessage}
           </Typography>
         </DialogContent>
         <DialogActions sx={{ p: 3, pt: 1 }}>
           <Button
             onClick={handleErrorDialogClose}
             variant="contained"
             sx={{
               borderRadius: 2,
               textTransform: 'none',
               fontWeight: 600,
               px: 4,
               py: 1.5,
               background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
               boxShadow: '0 4px 16px rgba(239, 68, 68, 0.3)',
               '&:hover': {
                 background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                 boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)',
               },
             }}
           >
             Entendido
           </Button>
         </DialogActions>
       </Dialog>
     </Container>
   );
 };

export default SupplierRegistration; 