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
} from '@mui/material';
import {
  Business,
  CheckCircle,
  Cancel,
  Visibility,
  Download,
  Send,
  Edit,
  Delete,
  Description,
  AttachFile,
  ExpandMore,
  Receipt,
  LocalShipping,
  Payment,
  Schedule,
  Print,
  Email,
} from '@mui/icons-material';
import { PurchaseOrder, Quotation, Supplier } from '../../types/supplier';

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
    status: 'approved',
    submittedAt: new Date('2024-02-10'),
    approvedBy: 'user1',
    approvedAt: new Date('2024-02-15'),
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
    status: 'issued',
    issuedAt: new Date('2024-02-20'),
    documentUrl: 'purchase_order_1.pdf',
  },
];

const PurchaseOrderManagement: React.FC = () => {
  const [purchaseOrders] = useState<PurchaseOrder[]>(mockPurchaseOrders);
  const [quotations] = useState<Quotation[]>(mockQuotations);
  const [suppliers] = useState<Supplier[]>(mockSuppliers);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);
  const [generateDialog, setGenerateDialog] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState<string>('');

  const getSupplierById = (supplierId: string) => {
    return suppliers.find(s => s.id === supplierId);
  };

  const getQuotationById = (quotationId: string) => {
    return quotations.find(q => q.id === quotationId);
  };

  const handleGeneratePO = () => {
    if (!selectedQuotation) return;
    
    const quotation = getQuotationById(selectedQuotation);
    if (!quotation) return;

    // Simulate PO generation
    alert('Orden de Compra generada exitosamente');
    setGenerateDialog(false);
    setSelectedQuotation('');
  };

  const handleSendPO = (orderId: string) => {
    // Simulate sending PO to supplier
    alert('Orden de Compra enviada al proveedor');
  };

  const handleDownloadPO = (orderId: string) => {
    // Simulate downloading PO
    alert('Descargando Orden de Compra...');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'issued':
        return 'info';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'issued':
        return 'Emitida';
      case 'delivered':
        return 'Entregada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Gestión de Órdenes de Compra
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Paso 4: Generación de Orden de Compra y Envío al Proveedor
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Receipt />}
          onClick={() => setGenerateDialog(true)}
        >
          Generar Nueva OC
        </Button>
      </Box>

      {/* Approved Quotations Summary */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Cotizaciones Aprobadas Pendientes de OC
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Proveedor</TableCell>
                <TableCell>RFC</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Tiempo de Entrega</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quotations
                .filter(q => q.status === 'approved')
                .map((quotation) => {
                  const supplier = getSupplierById(quotation.supplierId);
                  return (
                    <TableRow key={quotation.id}>
                      <TableCell>{supplier?.businessName}</TableCell>
                      <TableCell>{supplier?.rfc}</TableCell>
                      <TableCell align="right">
                        ${quotation.price.toLocaleString()} {quotation.currency}
                      </TableCell>
                      <TableCell align="right">{quotation.deliveryTime} días</TableCell>
                      <TableCell>
                        <Chip
                          label="Aprobada"
                          color="success"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<Receipt />}
                          onClick={() => {
                            setSelectedQuotation(quotation.id);
                            setGenerateDialog(true);
                          }}
                        >
                          Generar OC
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Purchase Orders List */}
      <Typography variant="h6" gutterBottom>
        Órdenes de Compra Generadas
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {purchaseOrders.map((order) => {
          const supplier = getSupplierById(order.supplierId);
          const quotation = getQuotationById(order.quotationId);

          return (
            <Card key={order.id} sx={{ flex: '1 1 400px' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" component="h2">
                      OC #{order.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {supplier?.businessName}
                    </Typography>
                  </Box>
                  <Chip
                    label={getStatusText(order.status)}
                    color={getStatusColor(order.status) as any}
                    size="small"
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total: ${order.totalAmount.toLocaleString()} {order.currency}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Entrega: {order.deliveryDate.toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.items.length} artículos
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Schedule sx={{ mr: 1, fontSize: 'small' }} />
                  <Typography variant="body2" color="text.secondary">
                    Emitida el {order.issuedAt.toLocaleDateString()}
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={order.status === 'delivered' ? 100 : order.status === 'issued' ? 50 : 0}
                  sx={{ mb: 2 }}
                />
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  startIcon={<Visibility />}
                  onClick={() => setSelectedOrder(order)}
                >
                  Ver Detalles
                </Button>
                <Button
                  size="small"
                  startIcon={<Download />}
                  onClick={() => handleDownloadPO(order.id)}
                >
                  Descargar
                </Button>
                {order.status === 'issued' && (
                  <Button
                    size="small"
                    startIcon={<Send />}
                    color="success"
                    onClick={() => handleSendPO(order.id)}
                  >
                    Enviar
                  </Button>
                )}
              </CardActions>
            </Card>
          );
        })}
      </Box>

      {/* Generate PO Dialog */}
      <Dialog
        open={generateDialog}
        onClose={() => setGenerateDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Generar Orden de Compra</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Seleccionar Cotización Aprobada
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell>Proveedor</TableCell>
                      <TableCell align="right">Precio</TableCell>
                      <TableCell align="right">Tiempo de Entrega</TableCell>
                      <TableCell>Condiciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {quotations
                      .filter(q => q.status === 'approved')
                      .map((quotation) => {
                        const supplier = getSupplierById(quotation.supplierId);
                        return (
                          <TableRow key={quotation.id}>
                            <TableCell padding="checkbox">
                              <input
                                type="radio"
                                name="selectedQuotation"
                                value={quotation.id}
                                checked={selectedQuotation === quotation.id}
                                onChange={(e) => setSelectedQuotation(e.target.value)}
                              />
                            </TableCell>
                            <TableCell>{supplier?.businessName}</TableCell>
                            <TableCell align="right">
                              ${quotation.price.toLocaleString()} {quotation.currency}
                            </TableCell>
                            <TableCell align="right">{quotation.deliveryTime} días</TableCell>
                            <TableCell>
                              <Typography variant="body2" noWrap>
                                {quotation.conditions}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {selectedQuotation && (
              <Grid item xs={12}>
                <Alert severity="info">
                  La orden de compra se generará automáticamente basada en la cotización seleccionada.
                </Alert>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGenerateDialog(false)}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleGeneratePO}
            disabled={!selectedQuotation}
          >
            Generar Orden de Compra
          </Button>
        </DialogActions>
      </Dialog>

      {/* PO Details Dialog */}
      <Dialog
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedOrder && (
          <>
            <DialogTitle>
              Detalles de Orden de Compra #{selectedOrder.id}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Información del Proveedor
                  </Typography>
                  {(() => {
                    const supplier = getSupplierById(selectedOrder.supplierId);
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
                            <Payment />
                          </ListItemIcon>
                          <ListItemText
                            primary="Total"
                            secondary={`$${selectedOrder.totalAmount.toLocaleString()} ${selectedOrder.currency}`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <LocalShipping />
                          </ListItemIcon>
                          <ListItemText
                            primary="Fecha de Entrega"
                            secondary={selectedOrder.deliveryDate.toLocaleDateString()}
                          />
                        </ListItem>
                      </List>
                    );
                  })()}
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Artículos
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Descripción</TableCell>
                          <TableCell align="right">Cantidad</TableCell>
                          <TableCell align="right">Precio Unit.</TableCell>
                          <TableCell align="right">Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedOrder.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.description}</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">
                              ${item.unitPrice.toLocaleString()}
                            </TableCell>
                            <TableCell align="right">
                              ${item.totalPrice.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Documentos
                  </Typography>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>Orden de Compra</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <AttachFile />
                          </ListItemIcon>
                          <ListItemText
                            primary={selectedOrder.documentUrl}
                            secondary="PDF - Orden de Compra"
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
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedOrder(null)}>
                Cerrar
              </Button>
              <Button
                variant="contained"
                startIcon={<Email />}
                onClick={() => handleSendPO(selectedOrder.id)}
              >
                Enviar al Proveedor
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default PurchaseOrderManagement; 