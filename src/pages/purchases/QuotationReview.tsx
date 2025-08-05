import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Rating,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Avatar,
} from '@mui/material';
import {
  Business,
  Visibility,
  Compare,
  ThumbUp,
  ThumbDown,
  AttachFile,
  ExpandMore,
  Schedule,
  Payment,
  LocalShipping,
  ArrowBack,
} from '@mui/icons-material';
import { Quotation, Supplier } from '../../types/supplier';
import { useAppContext } from '../../context/AppContext';

const mockSuppliers: Supplier[] = [
  {
    id: '1',
    rfc: 'ABC123456789',
    businessName: 'ABC Corp',
    address: 'Av. Principal 123, CDMX',
    contact: {
      name: 'Juan Pérez',
      email: 'juan@abccorp.com',
      phone: '555-123-4567',
    },
    documents: {
      fiscalSituation: 'url1',
      constitutiveAct: 'url2',
      satOpinion: 'url3',
      legalRepresentativeId: 'url4',
    },
    status: 'approved',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    rfc: 'XYZ987654321',
    businessName: 'XYZ Industries',
    address: 'Calle Comercial 456, GDL',
    contact: {
      name: 'María García',
      email: 'maria@xyzindustries.com',
      phone: '333-987-6543',
    },
    documents: {
      fiscalSituation: 'url1',
      constitutiveAct: 'url2',
      satOpinion: 'url3',
      legalRepresentativeId: 'url4',
    },
    status: 'approved',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockQuotations: Quotation[] = [
  {
    id: '1',
    rfqId: '1',
    supplierId: '1',
    price: 15000,
    currency: 'MXN',
    deliveryTime: 7,
    conditions: 'Pago a 30 días, entrega en 7 días hábiles',
    documents: ['quotation1.pdf'],
    status: 'submitted',
    submittedAt: new Date('2024-02-10'),
  },
  {
    id: '2',
    rfqId: '1',
    supplierId: '2',
    price: 18000,
    currency: 'MXN',
    deliveryTime: 5,
    conditions: 'Pago a 45 días, entrega en 5 días hábiles, garantía de 1 año',
    documents: ['quotation2.pdf'],
    status: 'submitted',
    submittedAt: new Date('2024-02-12'),
  },
];

const QuotationReview: React.FC = () => {
  const { isDarkMode, user } = useAppContext();
  const [quotations] = useState<Quotation[]>(mockQuotations);
  const [suppliers] = useState<Supplier[]>(mockSuppliers);
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedQuotations, setSelectedQuotations] = useState<string[]>([]);

  // Verificar si el usuario tiene permisos de administrador
  const isAdmin = user?.role === 'admin';

  const getSupplierById = (supplierId: string) => {
    return suppliers.find(s => s.id === supplierId);
  };

  const handleApproveQuotation = (_quotationId: string) => {
    if (!isAdmin) {
      alert('Solo los administradores pueden aprobar cotizaciones');
      return;
    }
    // Simulate approval
    alert('Cotización aprobada exitosamente');
  };

  const handleRejectQuotation = (_quotationId: string) => {
    if (!isAdmin) {
      alert('Solo los administradores pueden rechazar cotizaciones');
      return;
    }
    // Simulate rejection
    alert('Cotización rechazada');
  };

  const handleCompareQuotations = () => {
    setComparisonMode(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'info';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'Enviada';
      case 'approved':
        return 'Aprobada';
      case 'rejected':
        return 'Rechazada';
      default:
        return status;
    }
  };

  const calculateScore = (quotation: Quotation) => {
    // Simple scoring algorithm based on price, delivery time, and conditions
    const priceScore = 100 - (quotation.price / 20000) * 100; // Lower price = higher score
    const deliveryScore = 100 - (quotation.deliveryTime / 10) * 100; // Lower delivery time = higher score
    const conditionScore = quotation.conditions.includes('garantía') ? 20 : 10;
    
    return Math.round((priceScore + deliveryScore + conditionScore) / 3);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper sx={{
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: isDarkMode 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 10px 20px -5px rgba(0, 0, 0, 0.3)' 
          : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
        border: isDarkMode ? '1px solid #1e293b' : '1px solid #e5e7eb',
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" sx={{
                fontWeight: 700,
                color: isDarkMode ? '#f8fafc' : '#1f2937',
                mb: 1,
              }}>
                Revisión de Cotizaciones
              </Typography>
              <Typography variant="body1" sx={{
                color: isDarkMode ? '#cbd5e1' : '#6b7280',
                fontWeight: 500,
              }}>
                Paso 3: Revisión y Aprobación de Cotizaciones (Área de Compras)
              </Typography>
              {isAdmin && (
                <Typography variant="body2" sx={{
                  color: isDarkMode ? '#34d399' : '#10b981',
                  fontWeight: 600,
                  mt: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}>
                  ✅ Permisos de Administrador - Puede aprobar/rechazar cotizaciones
                </Typography>
              )}
              {!isAdmin && (
                <Typography variant="body2" sx={{
                  color: isDarkMode ? '#f59e0b' : '#d97706',
                  fontWeight: 600,
                  mt: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}>
                  ⚠️ Solo administradores pueden aprobar/rechazar cotizaciones
                </Typography>
              )}
            </Box>
            <Button
              variant="contained"
              startIcon={<Compare />}
              onClick={handleCompareQuotations}
              disabled={selectedQuotations.length < 2}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
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
              Comparar Seleccionadas
            </Button>
          </Box>
        </Box>

        {/* RFQ Summary */}
        <Box sx={{ p: 4, pb: 2 }}>
          <Card sx={{
            backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
            border: `1px solid ${isDarkMode ? '#334155' : '#e9ecef'}`,
            borderRadius: 2,
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{
                  bgcolor: isDarkMode ? '#60a5fa' : '#6366f1',
                  color: '#ffffff',
                  mr: 2,
                  width: 48,
                  height: 48,
                }}>
                  <Business />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{
                    color: isDarkMode ? '#f8fafc' : '#1f2937',
                    fontWeight: 600,
                    mb: 0.5,
                  }}>
                    RFQ: Suministro de Materiales de Oficina
                  </Typography>
                  <Typography variant="body2" sx={{
                    color: isDarkMode ? '#cbd5e1' : '#6b7280',
                  }}>
                    Se requiere suministro de materiales de oficina para el Q1 2024
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{
                    color: isDarkMode ? '#cbd5e1' : '#6b7280',
                    fontWeight: 500,
                  }}>
                    <strong>Descripción:</strong> Se requiere suministro de materiales de oficina para el Q1 2024
                  </Typography>
                </Box>
                <Chip 
                  label="Fecha límite: 15 de Marzo, 2024"
                  sx={{
                    backgroundColor: isDarkMode ? '#334155' : '#f1f5f9',
                    color: isDarkMode ? '#e2e8f0' : '#475569',
                    fontWeight: 500,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Quotations List */}
        <Box sx={{ p: 4, pt: 2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {quotations.map((quotation) => {
              const supplier = getSupplierById(quotation.supplierId);
              const score = calculateScore(quotation);

              return (
                <Box sx={{ flex: '1 1 400px' }} key={quotation.id}>
                  <Card sx={{
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    border: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
                    borderRadius: 3,
                    boxShadow: isDarkMode 
                      ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
                      : '0 4px 20px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      boxShadow: isDarkMode 
                        ? '0 8px 32px rgba(0, 0, 0, 0.4)' 
                        : '0 8px 32px rgba(0, 0, 0, 0.15)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                        <Box>
                          <Typography variant="h6" sx={{
                            color: isDarkMode ? '#f8fafc' : '#1f2937',
                            fontWeight: 600,
                            mb: 1,
                          }}>
                            {supplier?.businessName}
                          </Typography>
                          <Typography variant="body2" sx={{
                            color: isDarkMode ? '#cbd5e1' : '#6b7280',
                          }}>
                            RFC: {supplier?.rfc}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Chip
                            label={getStatusText(quotation.status)}
                            color={getStatusColor(quotation.status) as any}
                            size="small"
                            sx={{
                              mb: 1,
                              backgroundColor: isDarkMode ? '#60a5fa' : '#6366f1',
                              color: '#ffffff',
                            }}
                          />
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Rating 
                              value={score / 20} 
                              readOnly 
                              size="small"
                              sx={{
                                '& .MuiRating-iconFilled': {
                                  color: isDarkMode ? '#fbbf24' : '#f59e0b',
                                },
                                '& .MuiRating-iconEmpty': {
                                  color: isDarkMode ? '#475569' : '#d1d5db',
                                },
                              }}
                            />
                            <Typography variant="caption" sx={{
                              color: isDarkMode ? '#cbd5e1' : '#6b7280',
                              fontWeight: 500,
                            }}>
                              {score}/100
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" sx={{
                            color: isDarkMode ? '#cbd5e1' : '#6b7280',
                            mb: 1,
                          }}>
                            Precio
                          </Typography>
                          <Typography variant="h5" sx={{
                            color: isDarkMode ? '#60a5fa' : '#6366f1',
                            fontWeight: 700,
                          }}>
                            ${quotation.price.toLocaleString()} {quotation.currency}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" sx={{
                            color: isDarkMode ? '#cbd5e1' : '#6b7280',
                            mb: 1,
                          }}>
                            Tiempo de Entrega
                          </Typography>
                          <Typography variant="h6" sx={{
                            color: isDarkMode ? '#f8fafc' : '#1f2937',
                            fontWeight: 600,
                          }}>
                            {quotation.deliveryTime} días
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{
                          color: isDarkMode ? '#cbd5e1' : '#6b7280',
                          mb: 1,
                        }}>
                          Condiciones
                        </Typography>
                        <Typography variant="body2" sx={{
                          color: isDarkMode ? '#e2e8f0' : '#374151',
                        }}>
                          {quotation.conditions}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Schedule sx={{ 
                          mr: 1, 
                          fontSize: 'small',
                          color: isDarkMode ? '#cbd5e1' : '#6b7280',
                        }} />
                        <Typography variant="body2" sx={{
                          color: isDarkMode ? '#cbd5e1' : '#6b7280',
                        }}>
                          Enviada el {quotation.submittedAt.toLocaleDateString()}
                        </Typography>
                      </Box>

                      <LinearProgress
                        variant="determinate"
                        value={score}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: isDarkMode ? '#334155' : '#e5e7eb',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            background: isDarkMode
                              ? 'linear-gradient(90deg, #60a5fa 0%, #8b5cf6 100%)'
                              : 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
                          },
                        }}
                      />
                    </CardContent>

                    <CardActions sx={{ p: 3, pt: 0 }}>
                      <Button
                        size="small"
                        startIcon={<Visibility />}
                        onClick={() => setSelectedQuotation(quotation)}
                        sx={{
                          color: isDarkMode ? '#60a5fa' : '#6366f1',
                          '&:hover': {
                            backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                          },
                        }}
                      >
                        Ver Detalles
                      </Button>
                      <Button
                        size="small"
                        startIcon={<Compare />}
                        onClick={() => {
                          if (selectedQuotations.includes(quotation.id)) {
                            setSelectedQuotations(selectedQuotations.filter(id => id !== quotation.id));
                          } else {
                            setSelectedQuotations([...selectedQuotations, quotation.id]);
                          }
                        }}
                        sx={{
                          color: selectedQuotations.includes(quotation.id) 
                            ? (isDarkMode ? '#34d399' : '#10b981')
                            : (isDarkMode ? '#cbd5e1' : '#6b7280'),
                          '&:hover': {
                            backgroundColor: selectedQuotations.includes(quotation.id)
                              ? (isDarkMode ? 'rgba(52, 211, 153, 0.1)' : 'rgba(16, 185, 129, 0.1)')
                              : (isDarkMode ? 'rgba(203, 213, 225, 0.1)' : 'rgba(107, 114, 128, 0.1)'),
                          },
                        }}
                      >
                        {selectedQuotations.includes(quotation.id) ? 'Quitar' : 'Comparar'}
                      </Button>
                      {quotation.status === 'submitted' && isAdmin && (
                        <>
                          <Button
                            size="small"
                            startIcon={<ThumbUp />}
                            sx={{
                              color: isDarkMode ? '#34d399' : '#10b981',
                              '&:hover': {
                                backgroundColor: isDarkMode ? 'rgba(52, 211, 153, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                              },
                            }}
                            onClick={() => handleApproveQuotation(quotation.id)}
                          >
                            Aprobar
                          </Button>
                          <Button
                            size="small"
                            startIcon={<ThumbDown />}
                            sx={{
                              color: isDarkMode ? '#f87171' : '#ef4444',
                              '&:hover': {
                                backgroundColor: isDarkMode ? 'rgba(248, 113, 113, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                              },
                            }}
                            onClick={() => handleRejectQuotation(quotation.id)}
                          >
                            Rechazar
                          </Button>
                        </>
                      )}
                      {quotation.status === 'submitted' && !isAdmin && (
                        <Typography variant="body2" sx={{
                          color: isDarkMode ? '#64748b' : '#6b7280',
                          fontStyle: 'italic',
                          fontSize: '0.875rem',
                        }}>
                          Solo administradores pueden aprobar/rechazar
                        </Typography>
                      )}
                    </CardActions>
                  </Card>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Paper>

      {/* Quotation Details Dialog */}
      <Dialog
        open={!!selectedQuotation}
        onClose={() => setSelectedQuotation(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            borderRadius: 3,
          }
        }}
      >
        {selectedQuotation && (
          <>
            <DialogTitle sx={{
              color: isDarkMode ? '#f8fafc' : '#1f2937',
              borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
            }}>
              Detalles de Cotización
            </DialogTitle>
            <DialogContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  <Box sx={{ flex: 1, minWidth: 300 }}>
                    <Typography variant="h6" sx={{
                      color: isDarkMode ? '#f8fafc' : '#1f2937',
                      mb: 2,
                      fontWeight: 600,
                    }}>
                      Información del Proveedor
                    </Typography>
                    {(() => {
                      const supplier = getSupplierById(selectedQuotation.supplierId);
                      return (
                        <List sx={{ backgroundColor: isDarkMode ? '#334155' : '#f9fafb', borderRadius: 2 }}>
                          <ListItem>
                            <ListItemIcon>
                              <Business sx={{ color: isDarkMode ? '#60a5fa' : '#6366f1' }} />
                            </ListItemIcon>
                            <ListItemText
                              primary="Empresa"
                              secondary={supplier?.businessName}
                              primaryTypographyProps={{
                                sx: { color: isDarkMode ? '#f8fafc' : '#1f2937', fontWeight: 500 }
                              }}
                              secondaryTypographyProps={{
                                sx: { color: isDarkMode ? '#cbd5e1' : '#6b7280' }
                              }}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <Business sx={{ color: isDarkMode ? '#60a5fa' : '#6366f1' }} />
                            </ListItemIcon>
                            <ListItemText
                              primary="RFC"
                              secondary={supplier?.rfc}
                              primaryTypographyProps={{
                                sx: { color: isDarkMode ? '#f8fafc' : '#1f2937', fontWeight: 500 }
                              }}
                              secondaryTypographyProps={{
                                sx: { color: isDarkMode ? '#cbd5e1' : '#6b7280' }
                              }}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <Payment sx={{ color: isDarkMode ? '#60a5fa' : '#6366f1' }} />
                            </ListItemIcon>
                            <ListItemText
                              primary="Precio"
                              secondary={`$${selectedQuotation.price.toLocaleString()} ${selectedQuotation.currency}`}
                              primaryTypographyProps={{
                                sx: { color: isDarkMode ? '#f8fafc' : '#1f2937', fontWeight: 500 }
                              }}
                              secondaryTypographyProps={{
                                sx: { color: isDarkMode ? '#cbd5e1' : '#6b7280' }
                              }}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <LocalShipping sx={{ color: isDarkMode ? '#60a5fa' : '#6366f1' }} />
                            </ListItemIcon>
                            <ListItemText
                              primary="Tiempo de Entrega"
                              secondary={`${selectedQuotation.deliveryTime} días`}
                              primaryTypographyProps={{
                                sx: { color: isDarkMode ? '#f8fafc' : '#1f2937', fontWeight: 500 }
                              }}
                              secondaryTypographyProps={{
                                sx: { color: isDarkMode ? '#cbd5e1' : '#6b7280' }
                              }}
                            />
                          </ListItem>
                        </List>
                      );
                    })()}
                  </Box>

                  <Box sx={{ flex: 1, minWidth: 300 }}>
                    <Typography variant="h6" sx={{
                      color: isDarkMode ? '#f8fafc' : '#1f2937',
                      mb: 2,
                      fontWeight: 600,
                    }}>
                      Condiciones y Documentos
                    </Typography>
                    <Accordion sx={{
                      backgroundColor: isDarkMode ? '#334155' : '#f9fafb',
                      '&:before': { display: 'none' },
                    }}>
                      <AccordionSummary expandIcon={<ExpandMore sx={{ color: isDarkMode ? '#60a5fa' : '#6366f1' }} />}>
                        <Typography sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937', fontWeight: 500 }}>
                          Condiciones Comerciales
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2" sx={{ color: isDarkMode ? '#e2e8f0' : '#374151' }}>
                          {selectedQuotation.conditions}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion sx={{
                      backgroundColor: isDarkMode ? '#334155' : '#f9fafb',
                      '&:before': { display: 'none' },
                    }}>
                      <AccordionSummary expandIcon={<ExpandMore sx={{ color: isDarkMode ? '#60a5fa' : '#6366f1' }} />}>
                        <Typography sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937', fontWeight: 500 }}>
                          Documentos Adjuntos
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List>
                          {selectedQuotation.documents.map((doc, index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                <AttachFile sx={{ color: isDarkMode ? '#60a5fa' : '#6366f1' }} />
                              </ListItemIcon>
                              <ListItemText
                                primary={doc}
                                secondary="PDF - Cotización"
                                primaryTypographyProps={{
                                  sx: { color: isDarkMode ? '#f8fafc' : '#1f2937' }
                                }}
                                secondaryTypographyProps={{
                                  sx: { color: isDarkMode ? '#cbd5e1' : '#6b7280' }
                                }}
                              />
                              <Button 
                                size="small" 
                                startIcon={<Visibility />}
                                sx={{
                                  color: isDarkMode ? '#60a5fa' : '#6366f1',
                                  '&:hover': {
                                    backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                                  },
                                }}
                              >
                                Ver
                              </Button>
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Box>

                <Box sx={{ width: '100%' }}>
                  <Typography variant="h6" sx={{
                    color: isDarkMode ? '#f8fafc' : '#1f2937',
                    mb: 2,
                    fontWeight: 600,
                  }}>
                    Evaluación
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    p: 3,
                    backgroundColor: isDarkMode ? '#334155' : '#f9fafb',
                    borderRadius: 2,
                  }}>
                    <Rating
                      value={calculateScore(selectedQuotation) / 20}
                      readOnly
                      size="large"
                      sx={{
                        '& .MuiRating-iconFilled': {
                          color: isDarkMode ? '#fbbf24' : '#f59e0b',
                        },
                        '& .MuiRating-iconEmpty': {
                          color: isDarkMode ? '#475569' : '#d1d5db',
                        },
                      }}
                    />
                    <Typography variant="h6" sx={{
                      color: isDarkMode ? '#f8fafc' : '#1f2937',
                      fontWeight: 600,
                    }}>
                      {calculateScore(selectedQuotation)}/100 puntos
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{
              p: 3,
              borderTop: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
            }}>
              <Button 
                onClick={() => setSelectedQuotation(null)}
                sx={{
                  color: isDarkMode ? '#cbd5e1' : '#6b7280',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(203, 213, 225, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                  },
                }}
              >
                Cerrar
              </Button>
              {selectedQuotation.status === 'submitted' && isAdmin && (
                <>
                  <Button
                    sx={{
                      color: isDarkMode ? '#f87171' : '#ef4444',
                      '&:hover': {
                        backgroundColor: isDarkMode ? 'rgba(248, 113, 113, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      },
                    }}
                    onClick={() => handleRejectQuotation(selectedQuotation.id)}
                  >
                    Rechazar
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      background: isDarkMode
                        ? 'linear-gradient(135deg, #34d399 0%, #10b981 100%)'
                        : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      '&:hover': {
                        background: isDarkMode
                          ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                          : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      },
                    }}
                    onClick={() => handleApproveQuotation(selectedQuotation.id)}
                  >
                    Aprobar
                  </Button>
                </>
              )}
              {selectedQuotation.status === 'submitted' && !isAdmin && (
                <Typography variant="body2" sx={{
                  color: isDarkMode ? '#64748b' : '#6b7280',
                  fontStyle: 'italic',
                  fontSize: '0.875rem',
                }}>
                  Solo administradores pueden aprobar/rechazar cotizaciones
                </Typography>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Comparison Dialog */}
      <Dialog
        open={comparisonMode}
        onClose={() => setComparisonMode(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            borderRadius: 3,
          }
        }}
      >
        <DialogTitle sx={{
          color: isDarkMode ? '#f8fafc' : '#1f2937',
          borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
        }}>
          Comparación de Cotizaciones
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <TableContainer component={Paper} sx={{
            backgroundColor: isDarkMode ? '#334155' : '#ffffff',
            border: `1px solid ${isDarkMode ? '#475569' : '#e5e7eb'}`,
          }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: isDarkMode ? '#475569' : '#f8fafc' }}>
                  <TableCell sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937', fontWeight: 600 }}>
                    Proveedor
                  </TableCell>
                  <TableCell align="right" sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937', fontWeight: 600 }}>
                    Precio
                  </TableCell>
                  <TableCell align="right" sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937', fontWeight: 600 }}>
                    Tiempo de Entrega
                  </TableCell>
                  <TableCell sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937', fontWeight: 600 }}>
                    Condiciones
                  </TableCell>
                  <TableCell align="right" sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937', fontWeight: 600 }}>
                    Puntuación
                  </TableCell>
                  <TableCell sx={{ color: isDarkMode ? '#f8fafc' : '#1f2937', fontWeight: 600 }}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quotations
                  .filter(q => selectedQuotations.includes(q.id))
                  .map((quotation) => {
                    const supplier = getSupplierById(quotation.supplierId);
                    const score = calculateScore(quotation);

                    return (
                      <TableRow key={quotation.id} sx={{
                        '&:hover': {
                          backgroundColor: isDarkMode ? '#475569' : '#f9fafb',
                        },
                      }}>
                        <TableCell>
                          <Box>
                            <Typography variant="subtitle2" sx={{
                              color: isDarkMode ? '#f8fafc' : '#1f2937',
                              fontWeight: 600,
                            }}>
                              {supplier?.businessName}
                            </Typography>
                            <Typography variant="caption" sx={{
                              color: isDarkMode ? '#cbd5e1' : '#6b7280',
                            }}>
                              {supplier?.rfc}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="h6" sx={{
                            color: isDarkMode ? '#60a5fa' : '#6366f1',
                            fontWeight: 700,
                          }}>
                            ${quotation.price.toLocaleString()} {quotation.currency}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="h6" sx={{
                            color: isDarkMode ? '#f8fafc' : '#1f2937',
                            fontWeight: 600,
                          }}>
                            {quotation.deliveryTime} días
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{
                            color: isDarkMode ? '#e2e8f0' : '#374151',
                          }}>
                            {quotation.conditions}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Rating 
                              value={score / 20} 
                              readOnly 
                              size="small"
                              sx={{
                                '& .MuiRating-iconFilled': {
                                  color: isDarkMode ? '#fbbf24' : '#f59e0b',
                                },
                                '& .MuiRating-iconEmpty': {
                                  color: isDarkMode ? '#475569' : '#d1d5db',
                                },
                              }}
                            />
                            <Typography variant="body2" sx={{ 
                              ml: 1,
                              color: isDarkMode ? '#cbd5e1' : '#6b7280',
                              fontWeight: 500,
                            }}>
                              {score}/100
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant="contained"
                            sx={{
                              background: isDarkMode
                                ? 'linear-gradient(135deg, #34d399 0%, #10b981 100%)'
                                : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              '&:hover': {
                                background: isDarkMode
                                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                  : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                              },
                            }}
                            onClick={() => handleApproveQuotation(quotation.id)}
                          >
                            Seleccionar
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions sx={{
          p: 3,
          borderTop: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
        }}>
          <Button 
            onClick={() => setComparisonMode(false)}
            sx={{
              color: isDarkMode ? '#cbd5e1' : '#6b7280',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(203, 213, 225, 0.1)' : 'rgba(107, 114, 128, 0.1)',
              },
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default QuotationReview; 