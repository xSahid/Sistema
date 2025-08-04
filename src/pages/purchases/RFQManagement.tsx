import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
  Alert,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  Add,
  Assignment,
  Business,
  Send,
  Visibility,
  Edit,
  Delete,
  CheckCircle,
  Schedule,
  Person,
  Email,
  Phone,
  Description,
  AttachFile,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RFQ, Supplier } from '../../types/supplier';

const validationSchema = yup.object({
  title: yup.string().required('Título es requerido'),
  description: yup.string().required('Descripción es requerida'),
  deadline: yup.date().required('Fecha límite es requerida'),
  requirements: yup.array().of(yup.string()).min(1, 'Al menos un requerimiento es necesario'),
});

interface FormData {
  title: string;
  description: string;
  deadline: string;
  requirements: string[];
}

// Mock data
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

const mockRFQs: RFQ[] = [
  {
    id: '1',
    title: 'Suministro de Materiales de Oficina',
    description: 'Se requiere suministro de materiales de oficina para el Q1 2024',
    requirements: ['Papel A4', 'Tintas de impresora', 'Artículos de escritura'],
    deadline: new Date('2024-03-15'),
    status: 'open',
    createdBy: 'user1',
    createdAt: new Date('2024-02-01'),
    invitedSuppliers: ['1', '2'],
  },
  {
    id: '2',
    title: 'Servicios de Limpieza',
    description: 'Servicios de limpieza para oficinas corporativas',
    requirements: ['Limpieza diaria', 'Suministros de limpieza', 'Personal capacitado'],
    deadline: new Date('2024-03-20'),
    status: 'closed',
    createdBy: 'user1',
    createdAt: new Date('2024-02-05'),
    invitedSuppliers: ['1'],
    selectedSupplier: '1',
    selectedQuotation: 'quote1',
  },
];

const RFQManagement: React.FC = () => {
  const [rfqs, setRfqs] = useState<RFQ[]>(mockRFQs);
  const [suppliers] = useState<Supplier[]>(mockSuppliers);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRFQ, setSelectedRFQ] = useState<RFQ | null>(null);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      requirements: [''],
    },
  });

  const watchedRequirements = watch('requirements');

  const handleCreateRFQ = (data: FormData) => {
    const newRFQ: RFQ = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      requirements: data.requirements.filter(req => req.trim() !== ''),
      deadline: new Date(data.deadline),
      status: 'open',
      createdBy: 'currentUser',
      createdAt: new Date(),
      invitedSuppliers: selectedSuppliers,
    };

    setRfqs([...rfqs, newRFQ]);
    setOpenDialog(false);
    reset();
    setSelectedSuppliers([]);
  };

  const handleSendRFQ = (rfqId: string) => {
    // Simulate sending RFQ to suppliers
    alert('RFQ enviada exitosamente a los proveedores seleccionados');
  };

  const handleDeleteRFQ = (rfqId: string) => {
    setRfqs(rfqs.filter(rfq => rfq.id !== rfqId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'primary';
      case 'closed':
        return 'secondary';
      case 'awarded':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Abierta';
      case 'closed':
        return 'Cerrada';
      case 'awarded':
        return 'Adjudicada';
      default:
        return status;
    }
  };

  const addRequirement = () => {
    const currentRequirements = watchedRequirements || [];
    const newRequirements = [...currentRequirements, ''];
    // Update form with new requirement
  };

  const removeRequirement = (index: number) => {
    const currentRequirements = watchedRequirements || [];
    const newRequirements = currentRequirements.filter((_, i) => i !== index);
    // Update form with removed requirement
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Gestión de RFQs
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Paso 2: Solicitud de Cotización y Respuesta del Proveedor
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Nueva RFQ
        </Button>
      </Box>

      {/* RFQs List */}
      <Grid container spacing={3}>
        {rfqs.map((rfq) => (
          <Grid item xs={12} md={6} key={rfq.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="h2">
                    {rfq.title}
                  </Typography>
                  <Chip
                    label={getStatusText(rfq.status)}
                    color={getStatusColor(rfq.status) as any}
                    size="small"
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {rfq.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Requerimientos:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {rfq.requirements.map((req, index) => (
                      <Chip key={index} label={req} size="small" variant="outlined" />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Fecha límite: {rfq.deadline.toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {rfq.invitedSuppliers.length} proveedores invitados
                  </Typography>
                </Box>
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  startIcon={<Visibility />}
                  onClick={() => setSelectedRFQ(rfq)}
                >
                  Ver Detalles
                </Button>
                {rfq.status === 'open' && (
                  <Button
                    size="small"
                    startIcon={<Send />}
                    onClick={() => handleSendRFQ(rfq.id)}
                  >
                    Enviar
                  </Button>
                )}
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDeleteRFQ(rfq.id)}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create RFQ Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Nueva Solicitud de Cotización</DialogTitle>
        <form onSubmit={handleSubmit(handleCreateRFQ)}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Título de la RFQ"
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Descripción"
                      multiline
                      rows={4}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="deadline"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Fecha Límite"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.deadline}
                      helperText={errors.deadline?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Requerimientos
                </Typography>
                {watchedRequirements?.map((req, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <TextField
                      fullWidth
                      value={req}
                      onChange={(e) => {
                        const newReqs = [...(watchedRequirements || [])];
                        newReqs[index] = e.target.value;
                        // Update form
                      }}
                      placeholder={`Requerimiento ${index + 1}`}
                    />
                    {watchedRequirements && watchedRequirements.length > 1 && (
                      <IconButton
                        onClick={() => removeRequirement(index)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </Box>
                ))}
                <Button
                  startIcon={<Add />}
                  onClick={addRequirement}
                  sx={{ mt: 1 }}
                >
                  Agregar Requerimiento
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Seleccionar Proveedores
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Selecciona los proveedores que recibirán esta RFQ
                </Alert>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedSuppliers.length === suppliers.length}
                            indeterminate={selectedSuppliers.length > 0 && selectedSuppliers.length < suppliers.length}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedSuppliers(suppliers.map(s => s.id));
                              } else {
                                setSelectedSuppliers([]);
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>Proveedor</TableCell>
                        <TableCell>RFC</TableCell>
                        <TableCell>Contacto</TableCell>
                        <TableCell>Estado</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {suppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedSuppliers.includes(supplier.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedSuppliers([...selectedSuppliers, supplier.id]);
                                } else {
                                  setSelectedSuppliers(selectedSuppliers.filter(id => id !== supplier.id));
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell>{supplier.businessName}</TableCell>
                          <TableCell>{supplier.rfc}</TableCell>
                          <TableCell>{supplier.contact.name}</TableCell>
                          <TableCell>
                            <Chip
                              label={supplier.status}
                              color={supplier.status === 'approved' ? 'success' : 'warning'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained">
              Crear RFQ
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* RFQ Details Dialog */}
      <Dialog
        open={!!selectedRFQ}
        onClose={() => setSelectedRFQ(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedRFQ && (
          <>
            <DialogTitle>
              Detalles de RFQ: {selectedRFQ.title}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Descripción
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedRFQ.description}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Requerimientos
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedRFQ.requirements.map((req, index) => (
                      <Chip key={index} label={req} variant="outlined" />
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Fecha de Creación
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedRFQ.createdAt.toLocaleDateString()}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Fecha Límite
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedRFQ.deadline.toLocaleDateString()}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Proveedores Invitados
                  </Typography>
                  <List>
                    {selectedRFQ.invitedSuppliers.map((supplierId) => {
                      const supplier = suppliers.find(s => s.id === supplierId);
                      return supplier ? (
                        <ListItem key={supplierId}>
                          <ListItemIcon>
                            <Business />
                          </ListItemIcon>
                          <ListItemText
                            primary={supplier.businessName}
                            secondary={`${supplier.contact.name} - ${supplier.contact.email}`}
                          />
                          <Chip
                            label={supplier.status}
                            color={supplier.status === 'approved' ? 'success' : 'warning'}
                            size="small"
                          />
                        </ListItem>
                      ) : null;
                    })}
                  </List>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedRFQ(null)}>
                Cerrar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default RFQManagement; 