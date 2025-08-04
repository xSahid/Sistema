import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
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
  IconButton,
  Tooltip,
  Alert,
  Divider,
  Avatar,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Business,
  CheckCircle,
  Cancel,
  Visibility,
  Download,
  Upload,
  Edit,
  Delete,
  Description,
  AttachFile,
  ExpandMore,
  Receipt,
  Payment,
  Schedule,
  Print,
  Email,
  CloudUpload,
  ThumbUp,
  ThumbDown,
  Warning,
} from '@mui/icons-material';
import { Invoice, PurchaseOrder, Supplier } from '../../types/supplier';

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
];

const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: '1',
    quotationId: '1',
    supplierId: '1',
    items: [
      {
        id: '1',
        description: 'Papel A4 500 hojas',
        quantity: 50,
        unitPrice: 150,
        totalPrice: 7500,
      },
      {
        id: '2',
        description: 'Tintas de impresora HP',
        quantity: 10,
        unitPrice: 450,
        totalPrice: 4500,
      },
      {
        id: '3',
        description: 'Artículos de escritura',
        quantity: 100,
        unitPrice: 30,
        totalPrice: 3000,
      },
    ],
    totalAmount: 15000,
    currency: 'MXN',
    deliveryDate: new Date('2024-03-01'),
    status: 'delivered',
    issuedAt: new Date('2024-02-20'),
    deliveredAt: new Date('2024-03-01'),
    documentUrl: 'purchase_order_1.pdf',
  },
];

const mockInvoices: Invoice[] = [
  {
    id: '1',
    purchaseOrderId: '1',
    supplierId: '1',
    invoiceNumber: 'INV-2024-001',
    amount: 15000,
    currency: 'MXN',
    issueDate: new Date('2024-03-01'),
    dueDate: new Date('2024-03-31'),
    status: 'pending',
    documentUrl: 'invoice_1.pdf',
    submittedAt: new Date('2024-03-01'),
  },
  {
    id: '2',
    purchaseOrderId: '1',
    supplierId: '1',
    invoiceNumber: 'INV-2024-002',
    amount: 18000,
    currency: 'MXN',
    issueDate: new Date('2024-03-05'),
    dueDate: new Date('2024-04-05'),
    status: 'approved',
    documentUrl: 'invoice_2.pdf',
    submittedAt: new Date('2024-03-05'),
    approvedBy: 'user1',
    approvedAt: new Date('2024-03-10'),
  },
];

const InvoiceManagement: React.FC = () => {
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [purchaseOrders] = useState<PurchaseOrder[]>(mockPurchaseOrders);
  const [suppliers] = useState<Supplier[]>(mockSuppliers);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [selectedPO, setSelectedPO] = useState<string>('');
  const [rejectionReason, setRejectionReason] = useState('');

  const getSupplierById = (supplierId: string) => {
    return suppliers.find(s => s.id === supplierId);
  };

  const getPurchaseOrderById = (poId: string) => {
    return purchaseOrders.find(po => po.id === poId);
  };

  const handleApproveInvoice = (invoiceId: string) => {
    // Simulate invoice approval
    alert('Factura aprobada exitosamente');
  };

  const handleRejectInvoice = (invoiceId: string) => {
    if (!rejectionReason.trim()) {
      alert('Por favor ingrese un motivo de rechazo');
      return;
    }
    // Simulate invoice rejection
    alert('Factura rechazada');
    setRejectionReason('');
  };

  const handleUploadInvoice = () => {
    if (!selectedPO) return;
    
    // Simulate invoice upload
    alert('Factura cargada exitosamente');
    setUploadDialog(false);
    setSelectedPO('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'paid':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'approved':
        return 'Aprobada';
      case 'rejected':
        return 'Rechazada';
      case 'paid':
        return 'Pagada';
      default:
        return status;
    }
  };

  const isOverdue = (invoice: Invoice) => {
    return new Date() > invoice.dueDate && invoice.status !== 'paid';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Gestión de Facturas
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Paso 5: Emisión de Factura y Registro en el Sistema
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Upload />}
          onClick={() => setUploadDialog(true)}
        >
          Cargar Nueva Factura
        </Button>
      </Box>

      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="primary">
                {invoices.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Facturas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="warning.main">
                {invoices.filter(i => i.status === 'pending').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pendientes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="success.main">
                {invoices.filter(i => i.status === 'approved').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Aprobadas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="error.main">
                {invoices.filter(i => isOverdue(i)).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vencidas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Invoices List */}
      <Typography variant="h6" gutterBottom>
        Facturas Recibidas
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {invoices.map((invoice) => {
          const supplier = getSupplierById(invoice.supplierId);
          const po = getPurchaseOrderById(invoice.purchaseOrderId);

          return (
            <Card key={invoice.id} sx={{ flex: '1 1 400px' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" component="h2">
                      {invoice.invoiceNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {supplier?.businessName}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Chip
                      label={getStatusText(invoice.status)}
                      color={getStatusColor(invoice.status) as any}
                      size="small"
                    />
                    {isOverdue(invoice) && (
                      <Chip
                        label="Vencida"
                        color="error"
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    )}
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Monto: ${invoice.amount.toLocaleString()} {invoice.currency}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fecha de emisión: {invoice.issueDate.toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Vencimiento: {invoice.dueDate.toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    OC: #{po?.id}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Schedule sx={{ mr: 1, fontSize: 'small' }} />
                  <Typography variant="body2" color="text.secondary">
                    Recibida el {invoice.submittedAt.toLocaleDateString()}
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={
                    invoice.status === 'paid' ? 100 :
                    invoice.status === 'approved' ? 75 :
                    invoice.status === 'pending' ? 25 : 0
                  }
                  sx={{ mb: 2 }}
                />
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  startIcon={<Visibility />}
                  onClick={() => setSelectedInvoice(invoice)}
                >
                  Ver Detalles
                </Button>
                <Button
                  size="small"
                  startIcon={<Download />}
                  onClick={() => alert('Descargando factura...')}
                >
                  Descargar
                </Button>
                {invoice.status === 'pending' && (
                  <>
                    <Button
                      size="small"
                      startIcon={<ThumbUp />}
                      color="success"
                      onClick={() => handleApproveInvoice(invoice.id)}
                    >
                      Aprobar
                    </Button>
                    <Button
                      size="small"
                      startIcon={<ThumbDown />}
                      color="error"
                      onClick={() => {
                        setSelectedInvoice(invoice);
                        setRejectionReason('');
                      }}
                    >
                      Rechazar
                    </Button>
                  </>
                )}
              </CardActions>
            </Card>
          );
        })}
      </Box>

      {/* Upload Invoice Dialog */}
      <Dialog
        open={uploadDialog}
        onClose={() => setUploadDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Cargar Nueva Factura</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Seleccionar Orden de Compra
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell>Proveedor</TableCell>
                      <TableCell>OC</TableCell>
                      <TableCell align="right">Monto</TableCell>
                      <TableCell>Estado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {purchaseOrders
                      .filter(po => po.status === 'delivered')
                      .map((po) => {
                        const supplier = getSupplierById(po.supplierId);
                        return (
                          <TableRow key={po.id}>
                            <TableCell padding="checkbox">
                              <input
                                type="radio"
                                name="selectedPO"
                                value={po.id}
                                checked={selectedPO === po.id}
                                onChange={(e) => setSelectedPO(e.target.value)}
                              />
                            </TableCell>
                            <TableCell>{supplier?.businessName}</TableCell>
                            <TableCell>#{po.id}</TableCell>
                            <TableCell align="right">
                              ${po.totalAmount.toLocaleString()} {po.currency}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label="Entregada"
                                color="success"
                                size="small"
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {selectedPO && (
              <>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Información de la Factura
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Número de Factura"
                    placeholder="Ej: INV-2024-001"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Monto"
                    type="number"
                    placeholder="0.00"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Fecha de Emisión"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Fecha de Vencimiento"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUpload />}
                    fullWidth
                  >
                    Subir Factura (PDF/XML)
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.xml"
                    />
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialog(false)}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleUploadInvoice}
            disabled={!selectedPO}
          >
            Cargar Factura
          </Button>
        </DialogActions>
      </Dialog>

      {/* Invoice Details Dialog */}
      <Dialog
        open={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedInvoice && (
          <>
            <DialogTitle>
              Detalles de Factura: {selectedInvoice.invoiceNumber}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Información de la Factura
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Receipt />
                      </ListItemIcon>
                      <ListItemText
                        primary="Número"
                        secondary={selectedInvoice.invoiceNumber}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Payment />
                      </ListItemIcon>
                      <ListItemText
                        primary="Monto"
                        secondary={`$${selectedInvoice.amount.toLocaleString()} ${selectedInvoice.currency}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Schedule />
                      </ListItemIcon>
                      <ListItemText
                        primary="Fecha de Emisión"
                        secondary={selectedInvoice.issueDate.toLocaleDateString()}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Schedule />
                      </ListItemIcon>
                      <ListItemText
                        primary="Fecha de Vencimiento"
                        secondary={selectedInvoice.dueDate.toLocaleDateString()}
                      />
                    </ListItem>
                  </List>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Información del Proveedor
                  </Typography>
                  {(() => {
                    const supplier = getSupplierById(selectedInvoice.supplierId);
                    const po = getPurchaseOrderById(selectedInvoice.purchaseOrderId);
                    return (
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <Business />
                          </ListItemIcon>
                          <ListItemText
                            primary="Empresa"
                            secondary={supplier?.businessName}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Business />
                          </ListItemIcon>
                          <ListItemText
                            primary="RFC"
                            secondary={supplier?.rfc}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Receipt />
                          </ListItemIcon>
                          <ListItemText
                            primary="Orden de Compra"
                            secondary={`#${po?.id}`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Payment />
                          </ListItemIcon>
                          <ListItemText
                            primary="Estado"
                            secondary={getStatusText(selectedInvoice.status)}
                          />
                        </ListItem>
                      </List>
                    );
                  })()}
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Documento
                  </Typography>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>Factura</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <AttachFile />
                          </ListItemIcon>
                          <ListItemText
                            primary={selectedInvoice.documentUrl}
                            secondary="PDF/XML - Factura"
                          />
                          <Box>
                            <IconButton size="small">
                              <Visibility />
                            </IconButton>
                            <IconButton size="small">
                              <Download />
                            </IconButton>
                            <IconButton size="small">
                              <Print />
                            </IconButton>
                          </Box>
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                {selectedInvoice.status === 'pending' && (
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Acciones
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<ThumbUp />}
                        onClick={() => handleApproveInvoice(selectedInvoice.id)}
                      >
                        Aprobar Factura
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<ThumbDown />}
                        onClick={() => {
                          const reason = prompt('Motivo del rechazo:');
                          if (reason) {
                            setRejectionReason(reason);
                            handleRejectInvoice(selectedInvoice.id);
                          }
                        }}
                      >
                        Rechazar Factura
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedInvoice(null)}>
                Cerrar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default InvoiceManagement; 