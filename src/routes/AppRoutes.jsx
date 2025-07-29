import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Layout from '../layouts/Layout';

// Páginas del sistema de proveedores
import Dashboard from '../pages/Dashboard';
import ProviderRegistration from '../pages/providers/ProviderRegistration';
import ProviderDashboard from '../pages/providers/ProviderDashboard';
import Quotations from '../pages/providers/Quotations';
import Invoices from '../pages/providers/Invoices';
import Payments from '../pages/providers/Payments';

// Páginas de compras
import PurchaseDashboard from '../pages/purchases/PurchaseDashboard';
import QuotationManagement from '../pages/purchases/QuotationManagement';
import PurchaseOrders from '../pages/purchases/PurchaseOrders';

// Páginas de finanzas
import FinanceDashboard from '../pages/finance/FinanceDashboard';
import PaymentManagement from '../pages/finance/PaymentManagement';
import PaymentPlans from '../pages/finance/PaymentPlans';

// Páginas de administración
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '../pages/admin/UserManagement';
import Reports from '../pages/admin/Reports';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      // Rutas de proveedores
      {
        path: 'providers',
        children: [
          {
            path: 'register',
            element: <ProviderRegistration />
          },
          {
            path: 'dashboard',
            element: <ProviderDashboard />
          },
          {
            path: 'quotations',
            element: <Quotations />
          },
          {
            path: 'invoices',
            element: <Invoices />
          },
          {
            path: 'payments',
            element: <Payments />
          }
        ]
      },
      // Rutas de compras
      {
        path: 'purchases',
        children: [
          {
            path: 'dashboard',
            element: <PurchaseDashboard />
          },
          {
            path: 'quotations',
            element: <QuotationManagement />
          },
          {
            path: 'orders',
            element: <PurchaseOrders />
          }
        ]
      },
      // Rutas de finanzas
      {
        path: 'finance',
        children: [
          {
            path: 'dashboard',
            element: <FinanceDashboard />
          },
          {
            path: 'payments',
            element: <PaymentManagement />
          },
          {
            path: 'plans',
            element: <PaymentPlans />
          }
        ]
      },
      // Rutas de administración
      {
        path: 'admin',
        children: [
          {
            path: 'dashboard',
            element: <AdminDashboard />
          },
          {
            path: 'users',
            element: <UserManagement />
          },
          {
            path: 'reports',
            element: <Reports />
          }
        ]
      }
    ]
  }
]);

export default router; 