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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Chip,
  IconButton,
  Container,
  Card,
  Avatar,
  LinearProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { 
  ArrowBack, 
  Save, 
  Add, 
  Delete, 
  Assignment,
  Business,
  Description,
  Schedule,
  AttachMoney,
  CheckCircle
} from '@mui/icons-material';

const steps = ['Información General', 'Requerimientos', 'Proveedores', 'Revisión'];

const RFQPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useAppContext();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    deadline: '',
    budget: '',
    requirements: [''],
    suppliers: [] as string[],
    terms: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setShowValidationAlert(true);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Marcar como tocado
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validar en tiempo real
    validateField(field, value);
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData(prev => ({ ...prev, requirements: newRequirements }));
    
    // Validar requerimientos
    validateRequirements(newRequirements);
  };

  const handleSupplierToggle = (supplier: string) => {
    const newSuppliers = formData.suppliers.includes(supplier)
      ? formData.suppliers.filter(s => s !== supplier)
      : [...formData.suppliers, supplier];
    
    setFormData(prev => ({ ...prev, suppliers: newSuppliers }));
    
    // Validar proveedores en tiempo real
    const newErrors = { ...errors };
    if (newSuppliers.length === 0) {
      newErrors.suppliers = 'Debe seleccionar al menos un proveedor';
    } else {
      delete newErrors.suppliers;
    }
    setErrors(newErrors);
    
    // Marcar como tocado
    setTouched(prev => ({ ...prev, suppliers: true }));
  };

  const addRequirement = () => {
    setFormData(prev => ({ ...prev, requirements: [...prev.requirements, ''] }));
  };

  const removeRequirement = (index: number) => {
    const newRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, requirements: newRequirements }));
    validateRequirements(newRequirements);
  };

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'title':
        if (!value.trim()) {
          newErrors.title = 'El título es obligatorio';
        } else if (value.trim().length < 5) {
          newErrors.title = 'El título debe tener al menos 5 caracteres';
        } else if (value.trim().length > 100) {
          newErrors.title = 'El título no puede exceder 100 caracteres';
        } else {
          delete newErrors.title;
        }
        break;
        
      case 'description':
        if (!value.trim()) {
          newErrors.description = 'La descripción es obligatoria';
        } else if (value.trim().length < 20) {
          newErrors.description = 'La descripción debe tener al menos 20 caracteres';
        } else if (value.trim().length > 500) {
          newErrors.description = 'La descripción no puede exceder 500 caracteres';
        } else {
          delete newErrors.description;
        }
        break;
        
      case 'category':
        if (!value) {
          newErrors.category = 'Debe seleccionar una categoría';
        } else {
          delete newErrors.category;
        }
        break;
        
      case 'priority':
        if (!value) {
          newErrors.priority = 'Debe seleccionar una prioridad';
        } else {
          delete newErrors.priority;
        }
        break;
        
      case 'deadline':
        if (!value) {
          newErrors.deadline = 'La fecha límite es obligatoria';
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          if (selectedDate < today) {
            newErrors.deadline = 'La fecha límite no puede ser anterior a hoy';
          } else {
            delete newErrors.deadline;
          }
        }
        break;
        
      case 'budget':
        if (value && value.trim() !== '') {
          const budgetValue = parseFloat(value.replace(/[^0-9.]/g, ''));
          if (isNaN(budgetValue) || budgetValue < 0) {
            newErrors.budget = 'El presupuesto debe ser un número válido mayor a 0';
          } else if (budgetValue > 999999999) {
            newErrors.budget = 'El presupuesto no puede exceder $999,999,999';
          } else {
            delete newErrors.budget;
          }
        } else {
          delete newErrors.budget; // El presupuesto es opcional
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const validateRequirements = (requirements: string[]) => {
    const newErrors = { ...errors };
    
    if (requirements.length === 0) {
      newErrors.requirements = 'Debe agregar al menos un requerimiento';
    } else if (requirements.every(req => !req.trim())) {
      newErrors.requirements = 'Debe completar al menos un requerimiento';
    } else {
      // Validar cada requerimiento individual
      const invalidRequirements = requirements.some((req) => {
        if (req.trim() && req.trim().length < 10) {
          return true;
        }
        return false;
      });
      
      if (invalidRequirements) {
        newErrors.requirements = 'Cada requerimiento debe tener al menos 10 caracteres';
      } else {
        delete newErrors.requirements;
      }
    }
    
    setErrors(newErrors);
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    switch (activeStep) {
      case 0:
        // Validar todos los campos del paso 1
        validateField('title', formData.title);
        validateField('description', formData.description);
        validateField('category', formData.category);
        validateField('priority', formData.priority);
        validateField('deadline', formData.deadline);
        validateField('budget', formData.budget);
        
        // Marcar todos los campos como tocados
        setTouched({
          title: true,
          description: true,
          category: true,
          priority: true,
          deadline: true,
          budget: true,
        });
        break;
        
      case 1:
        validateRequirements(formData.requirements);
        break;
        
      case 2:
        if (formData.suppliers.length === 0) {
          newErrors.suppliers = 'Debe seleccionar al menos un proveedor';
        } else {
          delete newErrors.suppliers;
        }
        // Marcar como tocado para mostrar errores
        setTouched(prev => ({ ...prev, suppliers: true }));
        break;
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys({ ...errors, ...newErrors }).length === 0;
  };

  const handleSubmit = () => {
    if (validateStep()) {
      setTimeout(() => {
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }, 1000);
    }
  };

  const formatBudget = (value: string) => {
    // Remover caracteres no numéricos excepto punto
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    // Convertir a número
    const number = parseFloat(numericValue);
    
    if (isNaN(number)) return '';
    
    // Formatear como moneda
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const handleBudgetChange = (value: string) => {
    // Remover formato de moneda para el valor interno
    const numericValue = value.replace(/[^0-9.]/g, '');
    handleInputChange('budget', numericValue);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Título y Descripción */}
            <Card sx={{ 
              p: 3, 
              backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
              border: `1px solid ${isDarkMode ? '#444' : '#e0e0e0'}`,
              boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ 
                  bgcolor: isDarkMode ? '#555' : '#f5f5f5', 
                  mr: 2,
                  color: isDarkMode ? '#fff' : '#666'
                }}>
                  <Assignment />
                </Avatar>
                <Typography variant="h6" sx={{ color: isDarkMode ? 'white' : 'inherit' }}>
                  Información Básica
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  fullWidth
                  label="Título de la RFQ *"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  error={!!errors.title && touched.title}
                  helperText={errors.title && touched.title ? errors.title : `${formData.title.length}/100 caracteres`}
                  required
                  inputProps={{ maxLength: 100 }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isDarkMode ? '#3a3a3a' : '#ffffff',
                      color: isDarkMode ? '#ffffff' : '#000000',
                      '&:hover': {
                        backgroundColor: isDarkMode ? '#404040' : '#fafafa',
                      },
                      '&.Mui-focused': {
                        backgroundColor: isDarkMode ? '#404040' : '#ffffff',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: isDarkMode ? '#cccccc' : '#666666',
                      '&.Mui-focused': {
                        color: isDarkMode ? '#90caf9' : '#1976d2',
                      },
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? '#555' : '#ccc',
                    },
                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? '#90caf9' : '#1976d2',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? '#90caf9' : '#1976d2',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Descripción *"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  error={!!errors.description && touched.description}
                  helperText={errors.description && touched.description ? errors.description : `${formData.description.length}/500 caracteres`}
                  required
                  inputProps={{ maxLength: 500 }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isDarkMode ? '#3a3a3a' : '#ffffff',
                      color: isDarkMode ? '#ffffff' : '#000000',
                      '&:hover': {
                        backgroundColor: isDarkMode ? '#404040' : '#fafafa',
                      },
                      '&.Mui-focused': {
                        backgroundColor: isDarkMode ? '#404040' : '#ffffff',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: isDarkMode ? '#cccccc' : '#666666',
                      '&.Mui-focused': {
                        color: isDarkMode ? '#90caf9' : '#1976d2',
                      },
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? '#555' : '#ccc',
                    },
                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? '#90caf9' : '#1976d2',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? '#90caf9' : '#1976d2',
                    },
                  }}
                />
              </Box>
            </Card>

            {/* Categoría y Prioridad */}
            <Card sx={{ 
              p: 3, 
              backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
              border: `1px solid ${isDarkMode ? '#444' : '#e0e0e0'}`,
              boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ 
                  bgcolor: isDarkMode ? '#555' : '#f5f5f5', 
                  mr: 2,
                  color: isDarkMode ? '#fff' : '#666'
                }}>
                  <Business />
                </Avatar>
                <Typography variant="h6" sx={{ color: isDarkMode ? 'white' : 'inherit' }}>
                  Clasificación
                </Typography>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
                <FormControl fullWidth error={!!errors.category && touched.category}>
                  <InputLabel sx={{ 
                    color: isDarkMode ? '#cccccc' : '#666666',
                    '&.Mui-focused': {
                      color: isDarkMode ? '#90caf9' : '#1976d2',
                    },
                  }}>
                    Categoría *
                  </InputLabel>
                  <Select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    label="Categoría *"
                    sx={{
                      backgroundColor: isDarkMode ? '#3a3a3a' : '#ffffff',
                      color: isDarkMode ? '#ffffff' : '#000000',
                      '&:hover': {
                        backgroundColor: isDarkMode ? '#404040' : '#fafafa',
                      },
                      '& .MuiSelect-icon': {
                        color: isDarkMode ? '#cccccc' : '#666666',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: isDarkMode ? '#555' : '#ccc',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: isDarkMode ? '#90caf9' : '#1976d2',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: isDarkMode ? '#90caf9' : '#1976d2',
                      },
                    }}
                  >
                    <MenuItem value="office">Oficina</MenuItem>
                    <MenuItem value="it">Tecnología</MenuItem>
                    <MenuItem value="maintenance">Mantenimiento</MenuItem>
                    <MenuItem value="services">Servicios</MenuItem>
                    <MenuItem value="other">Otro</MenuItem>
                  </Select>
                  {errors.category && touched.category && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                      {errors.category}
                    </Typography>
                  )}
                </FormControl>
                <FormControl fullWidth error={!!errors.priority && touched.priority}>
                  <InputLabel sx={{ 
                    color: isDarkMode ? '#cccccc' : '#666666',
                    '&.Mui-focused': {
                      color: isDarkMode ? '#90caf9' : '#1976d2',
                    },
                  }}>
                    Prioridad *
                  </InputLabel>
                  <Select
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    label="Prioridad *"
                    sx={{
                      backgroundColor: isDarkMode ? '#3a3a3a' : '#ffffff',
                      color: isDarkMode ? '#ffffff' : '#000000',
                      '&:hover': {
                        backgroundColor: isDarkMode ? '#404040' : '#fafafa',
                      },
                      '& .MuiSelect-icon': {
                        color: isDarkMode ? '#cccccc' : '#666666',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: isDarkMode ? '#555' : '#ccc',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: isDarkMode ? '#90caf9' : '#1976d2',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: isDarkMode ? '#90caf9' : '#1976d2',
                      },
                    }}
                  >
                    <MenuItem value="low">Baja</MenuItem>
                    <MenuItem value="medium">Media</MenuItem>
                    <MenuItem value="high">Alta</MenuItem>
                    <MenuItem value="urgent">Urgente</MenuItem>
                  </Select>
                  {errors.priority && touched.priority && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                      {errors.priority}
                    </Typography>
                  )}
                </FormControl>
              </Box>
            </Card>

            {/* Fecha y Presupuesto */}
            <Card sx={{ 
              p: 3, 
              backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
              border: `1px solid ${isDarkMode ? '#444' : '#e0e0e0'}`,
              boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ 
                  bgcolor: isDarkMode ? '#555' : '#f5f5f5', 
                  mr: 2,
                  color: isDarkMode ? '#fff' : '#666'
                }}>
                  <Schedule />
                </Avatar>
                <Typography variant="h6" sx={{ color: isDarkMode ? 'white' : 'inherit' }}>
                  Plazos y Presupuesto
                </Typography>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Fecha Límite *"
                  value={formData.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
                  error={!!errors.deadline && touched.deadline}
                  helperText={errors.deadline && touched.deadline ? errors.deadline : 'Seleccione la fecha límite para recibir cotizaciones'}
                  required
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ 
                    min: new Date().toISOString().split('T')[0] 
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isDarkMode ? '#3a3a3a' : '#ffffff',
                      color: isDarkMode ? '#ffffff' : '#000000',
                      '&:hover': {
                        backgroundColor: isDarkMode ? '#404040' : '#fafafa',
                      },
                      '&.Mui-focused': {
                        backgroundColor: isDarkMode ? '#404040' : '#ffffff',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: isDarkMode ? '#cccccc' : '#666666',
                      '&.Mui-focused': {
                        color: isDarkMode ? '#90caf9' : '#1976d2',
                      },
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? '#555' : '#ccc',
                    },
                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? '#90caf9' : '#1976d2',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? '#90caf9' : '#1976d2',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Presupuesto Estimado (Opcional)"
                  value={formData.budget ? formatBudget(formData.budget) : ''}
                  onChange={(e) => handleBudgetChange(e.target.value)}
                  error={!!errors.budget && touched.budget}
                  helperText={errors.budget && touched.budget ? errors.budget : 'Ingrese el presupuesto estimado en pesos mexicanos'}
                  placeholder="$0.00"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isDarkMode ? '#3a3a3a' : '#ffffff',
                      color: isDarkMode ? '#ffffff' : '#000000',
                      '&:hover': {
                        backgroundColor: isDarkMode ? '#404040' : '#fafafa',
                      },
                      '&.Mui-focused': {
                        backgroundColor: isDarkMode ? '#404040' : '#ffffff',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: isDarkMode ? '#cccccc' : '#666666',
                      '&.Mui-focused': {
                        color: isDarkMode ? '#90caf9' : '#1976d2',
                      },
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? '#555' : '#ccc',
                    },
                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? '#90caf9' : '#1976d2',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? '#90caf9' : '#1976d2',
                    },
                  }}
                />
              </Box>
            </Card>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Card sx={{ 
              p: 3, 
              backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
              border: `1px solid ${isDarkMode ? '#444' : '#e0e0e0'}`,
              boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ 
                  bgcolor: isDarkMode ? '#555' : '#f5f5f5', 
                  mr: 2,
                  color: isDarkMode ? '#fff' : '#666'
                }}>
                  <Description />
                </Avatar>
                <Typography variant="h6" sx={{ color: isDarkMode ? 'white' : 'inherit' }}>
                  Requerimientos Específicos
                </Typography>
              </Box>
              {formData.requirements.map((requirement, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
                  <TextField
                    fullWidth
                    label={`Requerimiento ${index + 1} *`}
                    value={requirement}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    multiline
                    rows={2}
                    error={!!errors.requirements && requirement.trim() !== '' && requirement.trim().length < 10}
                    helperText={
                      requirement.trim() !== '' && requirement.trim().length < 10 
                        ? 'Mínimo 10 caracteres' 
                        : `${requirement.length}/200 caracteres`
                    }
                    inputProps={{ maxLength: 200 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: isDarkMode ? '#3a3a3a' : '#ffffff',
                        color: isDarkMode ? '#ffffff' : '#000000',
                        '&:hover': {
                          backgroundColor: isDarkMode ? '#404040' : '#fafafa',
                        },
                        '&.Mui-focused': {
                          backgroundColor: isDarkMode ? '#404040' : '#ffffff',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: isDarkMode ? '#cccccc' : '#666666',
                        '&.Mui-focused': {
                          color: isDarkMode ? '#90caf9' : '#1976d2',
                        },
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: isDarkMode ? '#555' : '#ccc',
                      },
                      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: isDarkMode ? '#90caf9' : '#1976d2',
                      },
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: isDarkMode ? '#90caf9' : '#1976d2',
                      },
                    }}
                  />
                  <IconButton
                    onClick={() => removeRequirement(index)}
                    color="error"
                    disabled={formData.requirements.length === 1}
                    sx={{ 
                      backgroundColor: isDarkMode ? '#3a3a3a' : '#ffffff',
                      color: isDarkMode ? '#ff6b6b' : '#d32f2f',
                      '&:hover': {
                        backgroundColor: isDarkMode ? '#404040' : '#fafafa',
                      },
                      '&.Mui-disabled': {
                        backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5',
                        color: isDarkMode ? '#666' : '#ccc',
                      },
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))}
              {errors.requirements && (
                <Typography variant="caption" color="error" sx={{ mb: 2, display: 'block' }}>
                  {errors.requirements}
                </Typography>
              )}
              <Button
                startIcon={<Add />}
                onClick={addRequirement}
                variant="outlined"
                disabled={formData.requirements.length >= 10}
                sx={{ 
                  borderColor: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                  color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                  '&:hover': {
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                    backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)',
                  },
                  '&.Mui-disabled': {
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    color: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                  },
                }}
              >
                Agregar Requerimiento {formData.requirements.length}/10
              </Button>
            </Card>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Card sx={{ 
              p: 3, 
              backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
              border: `1px solid ${isDarkMode ? '#444' : '#e0e0e0'}`,
              boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ 
                  bgcolor: isDarkMode ? '#555' : '#f5f5f5', 
                  mr: 2,
                  color: isDarkMode ? '#fff' : '#666'
                }}>
                  <Business />
                </Avatar>
                <Typography variant="h6" sx={{ color: isDarkMode ? 'white' : 'inherit' }}>
                  Selección de Proveedores
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Selecciona los proveedores que recibirán esta solicitud de cotización.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {['Proveedor A', 'Proveedor B', 'Proveedor C', 'Proveedor D'].map((supplier) => (
                  <Chip
                    key={supplier}
                    label={supplier}
                    onClick={() => handleSupplierToggle(supplier)}
                    color={formData.suppliers.includes(supplier) ? 'primary' : 'default'}
                    variant={formData.suppliers.includes(supplier) ? 'filled' : 'outlined'}
                    sx={{ 
                      cursor: 'pointer',
                      backgroundColor: formData.suppliers.includes(supplier) 
                        ? (isDarkMode ? '#1976d2' : '#1976d2')
                        : (isDarkMode ? '#3a3a3a' : '#ffffff'),
                      color: formData.suppliers.includes(supplier)
                        ? '#ffffff'
                        : (isDarkMode ? '#ffffff' : '#000000'),
                      border: formData.suppliers.includes(supplier)
                        ? 'none'
                        : (isDarkMode ? '1px solid #555' : '1px solid #ccc'),
                      '&:hover': {
                        transform: 'scale(1.05)',
                        transition: 'transform 0.2s',
                        backgroundColor: formData.suppliers.includes(supplier)
                          ? (isDarkMode ? '#1565c0' : '#1565c0')
                          : (isDarkMode ? '#404040' : '#f5f5f5'),
                      },
                      '& .MuiChip-label': {
                        color: formData.suppliers.includes(supplier)
                          ? '#ffffff'
                          : (isDarkMode ? '#ffffff' : '#000000'),
                      },
                    }}
                  />
                ))}
              </Box>
              {errors.suppliers && touched.suppliers && (
                <Typography variant="caption" color="error" sx={{ mt: 2, display: 'block', fontWeight: 500 }}>
                  ⚠️ {errors.suppliers}
                </Typography>
              )}
              <Typography 
                variant="body2" 
                sx={{ 
                  mt: 2, 
                  color: isDarkMode ? '#90caf9' : '#1976d2',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Business sx={{ fontSize: 16 }} />
                Proveedores seleccionados: {formData.suppliers.length}
              </Typography>
            </Card>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Card sx={{ 
              p: 3, 
              backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
              border: `1px solid ${isDarkMode ? '#444' : '#e0e0e0'}`,
              boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ 
                  bgcolor: isDarkMode ? '#555' : '#f5f5f5', 
                  mr: 2,
                  color: isDarkMode ? '#fff' : '#666'
                }}>
                  <CheckCircle />
                </Avatar>
                <Typography variant="h6" sx={{ color: isDarkMode ? 'white' : 'inherit' }}>
                  Revisión Final
                </Typography>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Assignment sx={{ fontSize: 16, mr: 1 }} />
                    Título
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>{formData.title || 'No especificado'}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Business sx={{ fontSize: 16, mr: 1 }} />
                    Categoría
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formData.category === 'office' ? 'Oficina' :
                     formData.category === 'it' ? 'Tecnología' :
                     formData.category === 'maintenance' ? 'Mantenimiento' :
                     formData.category === 'services' ? 'Servicios' :
                     formData.category === 'other' ? 'Otro' : 'No especificada'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AttachMoney sx={{ fontSize: 16, mr: 1 }} />
                    Prioridad
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formData.priority === 'low' ? 'Baja' :
                     formData.priority === 'medium' ? 'Media' :
                     formData.priority === 'high' ? 'Alta' :
                     formData.priority === 'urgent' ? 'Urgente' : 'No especificada'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Schedule sx={{ fontSize: 16, mr: 1 }} />
                    Fecha Límite
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formData.deadline ? new Date(formData.deadline).toLocaleDateString('es-MX') : 'No especificada'}
                  </Typography>
                </Box>
                <Box sx={{ gridColumn: '1 / -1' }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Description sx={{ fontSize: 16, mr: 1 }} />
                    Descripción
                  </Typography>
                  <Typography variant="body1">{formData.description || 'No especificada'}</Typography>
                </Box>
                <Box sx={{ gridColumn: '1 / -1' }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CheckCircle sx={{ fontSize: 16, mr: 1 }} />
                    Requerimientos ({formData.requirements.filter(req => req.trim()).length})
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {formData.requirements.filter(req => req.trim()).map((req, index) => (
                      <Chip key={index} label={req} size="small" color="primary" />
                    ))}
                  </Box>
                </Box>
                <Box sx={{ gridColumn: '1 / -1' }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Business sx={{ fontSize: 16, mr: 1 }} />
                    Proveedores Seleccionados ({formData.suppliers.length})
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {formData.suppliers.map((supplier, index) => (
                      <Chip key={index} label={supplier} size="small" color="secondary" />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ 
        p: 4, 
        borderRadius: 3, 
        boxShadow: isDarkMode 
          ? '0 8px 32px rgba(0,0,0,0.3)' 
          : '0 8px 32px rgba(0,0,0,0.1)',
        backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
        border: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0',
      }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/dashboard')}
            sx={{ 
              mr: 3,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              color: isDarkMode ? '#90caf9' : '#1976d2',
            }}
          >
            VOLVER
          </Button>
          <Typography variant="h4" sx={{ 
            fontWeight: 600, 
            color: isDarkMode ? '#90caf9' : '#1976d2' 
          }}>
            Crear RFQ
          </Typography>
        </Box>

        {/* Progress Bar */}
        <Box sx={{ mb: 4 }}>
          <LinearProgress 
            variant="determinate" 
            value={(activeStep / (steps.length - 1)) * 100} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              backgroundColor: isDarkMode ? '#333' : '#e3f2fd',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: isDarkMode 
                  ? 'linear-gradient(90deg, #90caf9 0%, #42a5f5 100%)'
                  : 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
              },
            }} 
          />
        </Box>

        {/* Stepper */}
        <Stepper 
          activeStep={activeStep} 
          sx={{ 
            mb: 4,
            '& .MuiStepLabel-root': {
              '& .MuiStepLabel-label': {
                fontWeight: 500,
                fontSize: '0.9rem',
                color: isDarkMode ? '#fff' : 'inherit',
              },
            },
            '& .MuiStepIcon-root': {
              fontSize: '1.5rem',
            },
          }}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel 
                sx={{
                  '& .MuiStepLabel-label': {
                    color: activeStep >= index 
                      ? (isDarkMode ? '#90caf9' : '#1976d2') 
                      : (isDarkMode ? '#666' : '#9e9e9e'),
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Content */}
        <Box sx={{ mb: 4 }}>
          {renderStepContent(activeStep)}
        </Box>

        {/* Navigation */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          pt: 3, 
          borderTop: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}` 
        }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              px: 4,
              color: isDarkMode ? '#90caf9' : '#1976d2',
              borderColor: isDarkMode ? '#90caf9' : '#1976d2',
              backgroundColor: isDarkMode ? 'rgba(144, 202, 249, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(144, 202, 249, 0.2)' : 'rgba(25, 118, 210, 0.1)',
                borderColor: isDarkMode ? '#42a5f5' : '#1565c0',
              },
              '&:disabled': {
                color: isDarkMode ? '#666' : '#ccc',
                borderColor: isDarkMode ? '#444' : '#e0e0e0',
                backgroundColor: 'transparent',
              },
            }}
          >
            ANTERIOR
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSubmit}
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 4,
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, #90caf9 0%, #42a5f5 100%)'
                    : 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                  '&:hover': {
                    background: isDarkMode 
                      ? 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)'
                      : 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
                  },
                }}
              >
                Crear RFQ
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 4,
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, #90caf9 0%, #42a5f5 100%)'
                    : 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                  '&:hover': {
                    background: isDarkMode 
                      ? 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)'
                      : 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
                  },
                }}
              >
                SIGUIENTE
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
          ¡RFQ creada exitosamente!
        </Alert>
      </Snackbar>

      <Snackbar
        open={showValidationAlert}
        autoHideDuration={4000}
        onClose={() => setShowValidationAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="warning" 
          sx={{ width: '100%' }}
          onClose={() => setShowValidationAlert(false)}
        >
          ⚠️ Por favor, complete todos los campos obligatorios correctamente antes de continuar.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RFQPage; 