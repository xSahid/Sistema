import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import PublicRoute from '../components/PublicRoute';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Dashboard from '../pages/Dashboard';
import SupplierRegistration from '../pages/providers/SupplierRegistration';
import ProviderRegistration from '../pages/providers/ProviderRegistration';
import ProviderDashboard from '../pages/providers/ProviderDashboard';
import QuotationRequestsPage from '../pages/providers/QuotationRequestsPage';
import RFQManagement from '../pages/purchases/RFQManagement';
// Import RFQPage with explicit path
import RFQPage from '../pages/purchases/RFQPage';
import QuotationReview from '../pages/purchases/QuotationReview';
import PurchaseOrderManagement from '../pages/purchases/PurchaseOrderManagement';
import PurchaseDashboard from '../pages/purchases/PurchaseDashboard';
import QuotationManagementPage from '../pages/purchases/QuotationManagementPage';
import PurchaseOrderGenerationPage from '../pages/purchases/PurchaseOrderGenerationPage';
import CreateOrderPage from '../pages/purchases/CreateOrderPage';
import InvoiceManagement from '../pages/finance/InvoiceManagement';
import FinanceDashboard from '../pages/finance/FinanceDashboard';
import FinancePayments from '../pages/finance/FinancePayments';
import PPDComplementsPage from '../pages/finance/PPDComplementsPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagementPage from '../pages/admin/UserManagementPage';
import DocumentManagementPage from '../pages/admin/DocumentManagementPage';
import NotFound from '../components/NotFound';
import LoginPage from '../pages/auth/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <PublicRoute>
            <Home />
          </PublicRoute>
        ),
      },

      {
        path: 'about',
        element: (
          <PublicRoute>
            <About />
          </PublicRoute>
        ),
      },
      {
        path: 'contact',
        element: (
          <PublicRoute>
            <Contact />
          </PublicRoute>
        ),
      },
      {
        path: 'login',
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'purchases', 'finance']}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'providers',
        children: [
          {
            path: 'registration',
            element: (
              <PublicRoute>
                <SupplierRegistration />
              </PublicRoute>
            ),
          },
          {
            path: 'provider-registration',
            element: (
              <ProtectedRoute allowedRoles={['admin', 'purchases']}>
                <ProviderRegistration />
              </ProtectedRoute>
            ),
          },
          {
            path: 'dashboard',
            element: (
              <ProtectedRoute allowedRoles={['provider']}>
                <ProviderDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: 'quotations',
            element: (
              <ProtectedRoute allowedRoles={['provider']}>
                <QuotationRequestsPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: 'purchases',
        children: [
          {
            path: 'dashboard',
            element: (
              <ProtectedRoute allowedRoles={['purchases']}>
                <PurchaseDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: 'rfq',
            element: (
              <ProtectedRoute allowedRoles={['purchases']}>
                <RFQManagement />
              </ProtectedRoute>
            ),
          },
          {
            path: 'create-rfq',
            element: (
              <ProtectedRoute allowedRoles={['purchases']}>
                <RFQPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'new-request',
            element: (
              <ProtectedRoute allowedRoles={['purchases']}>
                <RFQPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'quotations',
            element: (
              <ProtectedRoute allowedRoles={['purchases']}>
                <QuotationReview />
              </ProtectedRoute>
            ),
          },
          {
            path: 'orders',
            element: (
              <ProtectedRoute allowedRoles={['purchases']}>
                <PurchaseOrderManagement />
              </ProtectedRoute>
            ),
          },
          {
            path: 'quotation-management',
            element: (
              <ProtectedRoute allowedRoles={['purchases']}>
                <QuotationManagementPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'purchase-orders',
            element: (
              <ProtectedRoute allowedRoles={['purchases']}>
                <PurchaseOrderGenerationPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'create-order',
            element: (
              <ProtectedRoute allowedRoles={['purchases']}>
                <CreateOrderPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: 'finance',
        children: [
          {
            path: 'dashboard',
            element: (
              <ProtectedRoute allowedRoles={['finance']}>
                <FinanceDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: 'payments',
            element: (
              <ProtectedRoute allowedRoles={['finance']}>
                <FinancePayments />
              </ProtectedRoute>
            ),
          },
          {
            path: 'invoices',
            element: (
              <ProtectedRoute allowedRoles={['finance']}>
                <InvoiceManagement />
              </ProtectedRoute>
            ),
          },
          {
            path: 'ppd-complements',
            element: (
              <ProtectedRoute allowedRoles={['finance']}>
                <PPDComplementsPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: 'admin',
        children: [
          {
            path: 'dashboard',
            element: (
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: 'users',
            element: (
              <ProtectedRoute allowedRoles={['admin']}>
                <UserManagementPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'documents',
            element: (
              <ProtectedRoute allowedRoles={['admin']}>
                <DocumentManagementPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  // Catch-all route outside Layout to show 404 without header/footer
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router; 