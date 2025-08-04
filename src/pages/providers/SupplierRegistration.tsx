import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Card,
  CardContent,
  Alert,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Container,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Business,
  CheckCircle,
  Error,
  Description,
  Person,
  Email,
  Phone,
  LocationOn,
  CloudUpload,
  Delete,
  Visibility,
  ArrowBack,
  ArrowForward,
  Check,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppContext } from '../../context/AppContext';

const steps = [
  'Información Fiscal',
  'Datos de Contacto',
  'Documentos Requeridos',
  'Revisión Final',
];

const requiredDocuments = [
  {
    id: 'fiscalSituation',
    name: 'Constancia de Situación Fiscal',
    description: 'Documento que acredita la situación fiscal del proveedor',
    required: true,
  },
  {
    id: 'constitutiveAct',
    name: 'Acta Constitutiva',
    description: 'Documento que establece la constitución legal de la empresa',
    required: true,
  },
  {
    id: 'satOpinion',
    name: 'Opinión Positiva SAT',
    description: 'Opinión positiva de cumplimiento fiscal',
    required: true,
  },
  {
    id: 'legalRepresentativeId',
    name: 'Identificación del Representante Legal',
    description: 'INE o pasaporte del representante legal',
    required: true,
  },
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
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, File>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
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

  // Limpiar campos cuando se cambia de paso
  useEffect(() => {
    if (activeStep === 1) {
      // Limpiar campos de contacto cuando se llega al paso 2
      setValue('contactName', '');
      setValue('contactEmail', '');
      setValue('contactPhone', '');
    }
  }, [activeStep, setValue]);

  const handleNext = () => {
    // Validar el paso actual antes de avanzar
    const currentData = getCurrentStepData();
    if (validateCurrentStep(currentData)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Función para obtener los datos del paso actual
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
      default:
        return {};
    }
  };

  // Función para validar el paso actual
  const validateCurrentStep = (data: any) => {
    switch (activeStep) {
      case 0:
        return data.rfc && data.businessName && data.address;
      case 1:
        return data.contactName && data.contactEmail && data.contactPhone;
      case 2:
        return requiredDocuments.every(doc => uploadedDocuments[doc.id]);
      default:
        return true;
    }
  };

  const handleDocumentUpload = (documentId: string, file: File) => {
    setUploadedDocuments((prev) => ({
      ...prev,
      [documentId]: file,
    }));
  };

  const handleDocumentDelete = (documentId: string) => {
    setUploadedDocuments((prev) => {
      const newDocs = { ...prev };
      delete newDocs[documentId];
      return newDocs;
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log('Supplier registration data:', {
        ...data,
        documents: uploadedDocuments,
      });
      
      // Show success dialog
      setDialogMessage('Proveedor registrado exitosamente. Su solicitud ha sido enviada y está pendiente de aprobación.');
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error registering supplier:', error);
      
      // Show error dialog
      setDialogMessage('Error al registrar proveedor. Por favor, intente nuevamente.');
      setShowErrorDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
    // Redirect to dashboard or home
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
                    value={field.value || ''}
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
                    value={field.value || ''}
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
                    value={field.value || ''}
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
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937' }}>
              Documentos Requeridos
            </Typography>
            <Alert severity="info" sx={{ mb: 3, backgroundColor: isDarkMode ? '#1e293b' : '#f0f9ff', color: isDarkMode ? '#e2e8f0' : '#1e40af' }}>
              Todos los documentos deben estar en formato PDF y no exceder 10MB cada uno.
            </Alert>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              {requiredDocuments.map((doc) => (
                <Box key={doc.id}>
                  <Card variant="outlined" sx={{ 
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    borderColor: isDarkMode ? '#334155' : '#e5e7eb',
                  }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Description sx={{ mr: 1, color: isDarkMode ? '#60a5fa' : '#6366f1' }} />
                        <Typography variant="subtitle1" sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937' }}>
                          {doc.name}
                        </Typography>
                        {doc.required && (
                          <Chip label="Requerido" size="small" color="error" sx={{ ml: 1 }} />
                        )}
                      </Box>
                      
                      <Typography variant="body2" sx={{ mb: 2, color: isDarkMode ? '#cbd5e1' : '#6b7280' }}>
                        {doc.description}
                      </Typography>

                      {uploadedDocuments[doc.id] ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CheckCircle color="success" sx={{ mr: 1 }} />
                            <Typography variant="body2" sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937' }}>
                              {uploadedDocuments[doc.id].name}
                            </Typography>
                          </Box>
                          <Box>
                            <Tooltip title="Ver documento">
                              <IconButton size="small" sx={{ color: isDarkMode ? '#60a5fa' : '#6366f1' }}>
                                <Visibility />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDocumentDelete(doc.id)}
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                      ) : (
                        <Button
                          variant="outlined"
                          startIcon={<CloudUpload />}
                          component="label"
                          fullWidth
                          sx={{
                            borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
                            color: isDarkMode ? '#60a5fa' : '#6366f1',
                            '&:hover': {
                              borderColor: isDarkMode ? '#93c5fd' : '#8b5cf6',
                              backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                            },
                          }}
                        >
                          Subir Documento
                          <input
                            type="file"
                            hidden
                            accept=".pdf"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleDocumentUpload(doc.id, file);
                              }
                            }}
                          />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937' }}>
              Revisión Final
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Box>
                <Card sx={{ 
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                  borderColor: isDarkMode ? '#334155' : '#e5e7eb',
                }}>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937' }}>
                      Información Fiscal
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <Business sx={{ color: isDarkMode ? '#60a5fa' : '#6366f1' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="RFC"
                          secondary={watchedValues.rfc}
                          sx={{
                            '& .MuiListItemText-primary': { color: isDarkMode ? '#f8fafc' : '#1f2937' },
                            '& .MuiListItemText-secondary': { color: isDarkMode ? '#cbd5e1' : '#6b7280' },
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Business sx={{ color: isDarkMode ? '#60a5fa' : '#6366f1' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Razón Social"
                          secondary={watchedValues.businessName}
                          sx={{
                            '& .MuiListItemText-primary': { color: isDarkMode ? '#f8fafc' : '#1f2937' },
                            '& .MuiListItemText-secondary': { color: isDarkMode ? '#cbd5e1' : '#6b7280' },
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <LocationOn sx={{ color: isDarkMode ? '#60a5fa' : '#6366f1' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Domicilio"
                          secondary={watchedValues.address}
                          sx={{
                            '& .MuiListItemText-primary': { color: isDarkMode ? '#f8fafc' : '#1f2937' },
                            '& .MuiListItemText-secondary': { color: isDarkMode ? '#cbd5e1' : '#6b7280' },
                          }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Box>

              <Box>
                <Card sx={{ 
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                  borderColor: isDarkMode ? '#334155' : '#e5e7eb',
                }}>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937' }}>
                      Datos de Contacto
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <Person sx={{ color: isDarkMode ? '#60a5fa' : '#6366f1' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Nombre"
                          secondary={watchedValues.contactName}
                          sx={{
                            '& .MuiListItemText-primary': { color: isDarkMode ? '#f8fafc' : '#1f2937' },
                            '& .MuiListItemText-secondary': { color: isDarkMode ? '#cbd5e1' : '#6b7280' },
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Email sx={{ color: isDarkMode ? '#60a5fa' : '#6366f1' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Email"
                          secondary={watchedValues.contactEmail}
                          sx={{
                            '& .MuiListItemText-primary': { color: isDarkMode ? '#f8fafc' : '#1f2937' },
                            '& .MuiListItemText-secondary': { color: isDarkMode ? '#cbd5e1' : '#6b7280' },
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Phone sx={{ color: isDarkMode ? '#60a5fa' : '#6366f1' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Teléfono"
                          secondary={watchedValues.contactPhone}
                          sx={{
                            '& .MuiListItemText-primary': { color: isDarkMode ? '#f8fafc' : '#1f2937' },
                            '& .MuiListItemText-secondary': { color: isDarkMode ? '#cbd5e1' : '#6b7280' },
                          }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Box>

              <Box sx={{ gridColumn: '1 / -1' }}>
                <Card sx={{ 
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                  borderColor: isDarkMode ? '#334155' : '#e5e7eb',
                }}>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937' }}>
                      Documentos Cargados
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                      {requiredDocuments.map((doc) => (
                        <Box key={doc.id} sx={{ display: 'flex', alignItems: 'center' }}>
                          {uploadedDocuments[doc.id] ? (
                            <CheckCircle color="success" />
                          ) : (
                            <Error color="error" />
                          )}
                          <Typography variant="body2" sx={{ ml: 1, color: isDarkMode ? '#f8fafc' : '#1f2937' }}>
                            {doc.name}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
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
        return requiredDocuments.every(doc => uploadedDocuments[doc.id]);
      case 3:
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
             backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
             border: isDarkMode ? '1px solid #1e293b' : '1px solid #e5e7eb',
             boxShadow: isDarkMode 
               ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
               : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
           }
         }}
       >
         <DialogTitle sx={{
           textAlign: 'center',
           color: isDarkMode ? '#f8fafc' : '#1f2937',
           borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
           pb: 2,
         }}>
           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
             <Avatar sx={{
               bgcolor: isDarkMode ? '#34d399' : '#10b981',
               color: '#ffffff',
               width: 64,
               height: 64,
               boxShadow: isDarkMode 
                 ? '0 4px 20px rgba(52, 211, 153, 0.3)' 
                 : '0 4px 20px rgba(16, 185, 129, 0.3)',
             }}>
               <Check sx={{ fontSize: 32 }} />
             </Avatar>
           </Box>
           <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
             ¡Registro Exitoso!
           </Typography>
         </DialogTitle>
         <DialogContent sx={{ pt: 3 }}>
           <Typography variant="body1" sx={{
             color: isDarkMode ? '#cbd5e1' : '#6b7280',
             textAlign: 'center',
             mb: 2,
           }}>
             {dialogMessage}
           </Typography>
           <Box sx={{
             backgroundColor: isDarkMode ? '#1e293b' : '#f0f9ff',
             borderRadius: 2,
             p: 2,
             border: isDarkMode ? '1px solid #334155' : '1px solid #e0f2fe',
           }}>
             <Typography variant="body2" sx={{
               color: isDarkMode ? '#e2e8f0' : '#1e40af',
               fontWeight: 500,
               mb: 1,
             }}>
               📧 Recibirá una notificación por email cuando su cuenta sea aprobada
             </Typography>
             <Typography variant="body2" sx={{
               color: isDarkMode ? '#cbd5e1' : '#1e40af',
             }}>
               🔍 Puede consultar el estado de su solicitud en cualquier momento
             </Typography>
           </Box>
         </DialogContent>
         <DialogActions sx={{
           p: 3,
           pt: 2,
           borderTop: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
         }}>
           <Button
             onClick={handleSuccessDialogClose}
             variant="contained"
             fullWidth
             sx={{
               borderRadius: 2,
               textTransform: 'none',
               fontWeight: 600,
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
             Continuar
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
             backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
             border: isDarkMode ? '1px solid #1e293b' : '1px solid #e5e7eb',
             boxShadow: isDarkMode 
               ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
               : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
           }
         }}
       >
         <DialogTitle sx={{
           textAlign: 'center',
           color: isDarkMode ? '#f8fafc' : '#1f2937',
           borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
           pb: 2,
         }}>
           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
             <Avatar sx={{
               bgcolor: isDarkMode ? '#f87171' : '#ef4444',
               color: '#ffffff',
               width: 64,
               height: 64,
               boxShadow: isDarkMode 
                 ? '0 4px 20px rgba(248, 113, 113, 0.3)' 
                 : '0 4px 20px rgba(239, 68, 68, 0.3)',
             }}>
               <Error sx={{ fontSize: 32 }} />
             </Avatar>
           </Box>
           <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
             Error en el Registro
           </Typography>
         </DialogTitle>
         <DialogContent sx={{ pt: 3 }}>
           <Typography variant="body1" sx={{
             color: isDarkMode ? '#cbd5e1' : '#6b7280',
             textAlign: 'center',
             mb: 2,
           }}>
             {dialogMessage}
           </Typography>
           <Box sx={{
             backgroundColor: isDarkMode ? '#1e293b' : '#fef2f2',
             borderRadius: 2,
             p: 2,
             border: isDarkMode ? '1px solid #334155' : '1px solid #fecaca',
           }}>
             <Typography variant="body2" sx={{
               color: isDarkMode ? '#e2e8f0' : '#dc2626',
               fontWeight: 500,
               mb: 1,
             }}>
               🔄 Por favor, intente nuevamente
             </Typography>
             <Typography variant="body2" sx={{
               color: isDarkMode ? '#cbd5e1' : '#dc2626',
             }}>
               📞 Si el problema persiste, contacte al soporte técnico
             </Typography>
           </Box>
         </DialogContent>
         <DialogActions sx={{
           p: 3,
           pt: 2,
           borderTop: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
         }}>
           <Button
             onClick={handleErrorDialogClose}
             variant="contained"
             fullWidth
             sx={{
               borderRadius: 2,
               textTransform: 'none',
               fontWeight: 600,
               py: 1.5,
               background: isDarkMode
                 ? 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)'
                 : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
               boxShadow: isDarkMode 
                 ? '0 4px 16px rgba(248, 113, 113, 0.3)' 
                 : '0 4px 16px rgba(239, 68, 68, 0.3)',
               '&:hover': {
                 background: isDarkMode
                   ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                   : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                 boxShadow: isDarkMode 
                   ? '0 6px 20px rgba(248, 113, 113, 0.4)' 
                   : '0 6px 20px rgba(239, 68, 68, 0.4)',
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