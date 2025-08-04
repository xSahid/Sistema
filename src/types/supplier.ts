export interface Supplier {
  id: string;
  rfc: string;
  businessName: string;
  address: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  documents: {
    fiscalSituation: string; // URL to document
    constitutiveAct: string;
    satOpinion: string;
    legalRepresentativeId: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
  rejectionReason?: string;
}

export interface RFQ {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  deadline: Date;
  status: 'open' | 'closed' | 'awarded';
  createdBy: string;
  createdAt: Date;
  invitedSuppliers: string[]; // Supplier IDs
  selectedSupplier?: string;
  selectedQuotation?: string;
}

export interface Quotation {
  id: string;
  rfqId: string;
  supplierId: string;
  price: number;
  currency: 'MXN' | 'USD';
  deliveryTime: number; // days
  conditions: string;
  documents: string[]; // URLs to documents
  status: 'submitted' | 'approved' | 'rejected';
  submittedAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
  rejectionReason?: string;
}

export interface PurchaseOrder {
  id: string;
  quotationId: string;
  supplierId: string;
  items: PurchaseOrderItem[];
  totalAmount: number;
  currency: 'MXN' | 'USD';
  deliveryDate: Date;
  status: 'issued' | 'delivered' | 'cancelled';
  issuedAt: Date;
  deliveredAt?: Date;
  documentUrl?: string;
}

export interface PurchaseOrderItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Invoice {
  id: string;
  purchaseOrderId: string;
  supplierId: string;
  invoiceNumber: string;
  amount: number;
  currency: 'MXN' | 'USD';
  issueDate: Date;
  dueDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  documentUrl: string;
  submittedAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
  rejectionReason?: string;
}

export interface PaymentPlan {
  id: string;
  invoiceId: string;
  supplierId: string;
  totalAmount: number;
  currency: 'MXN' | 'USD';
  payments: Payment[];
  status: 'scheduled' | 'in_progress' | 'completed';
  createdAt: Date;
  createdBy: string;
}

export interface Payment {
  id: string;
  paymentPlanId: string;
  amount: number;
  scheduledDate: Date;
  status: 'scheduled' | 'paid' | 'overdue';
  paidAt?: Date;
  paymentMethod?: string;
  reference?: string;
}

export interface PaymentComplement {
  id: string;
  paymentId: string;
  invoiceId: string;
  supplierId: string;
  amount: number;
  documentUrl: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: Date;
}

export interface DigitalFolder {
  supplierId: string;
  documents: {
    registration: string[];
    quotations: string[];
    purchaseOrders: string[];
    invoices: string[];
    paymentComplements: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'purchases' | 'finance' | 'supplier';
  supplierId?: string; // Only for supplier users
  createdAt: Date;
  lastLogin?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface DashboardStats {
  totalSuppliers: number;
  pendingApprovals: number;
  activeRFQs: number;
  pendingInvoices: number;
  totalPayments: number;
  overduePayments: number;
} 