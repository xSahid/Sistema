import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import ProviderRegistration from '../pages/providers/ProviderRegistration';
import ProviderDashboard from '../pages/providers/ProviderDashboard';
import PurchaseDashboard from '../pages/purchases/PurchaseDashboard';
import NewRequestPage from '../pages/purchases/NewRequestPage';
import QuotationsPage from '../pages/purchases/QuotationsPage';
import CreateOrderPage from '../pages/purchases/CreateOrderPage';
import FinanceDashboard from '../pages/finance/FinanceDashboard';
import FinancePayments from '../pages/finance/FinancePayments';
import PPDComplementsPage from '../pages/finance/PPDComplementsPage';
import InvoiceManagementPage from '../pages/finance/InvoiceManagementPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagementPage from '../pages/admin/UserManagementPage';
import DocumentManagementPage from '../pages/admin/DocumentManagementPage';
import LoginPage from '../pages/auth/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'providers',
        children: [
          {
            path: 'register',
            element: <ProviderRegistration />,
          },
          {
            path: 'dashboard',
            element: <ProviderDashboard />,
          },
        ],
      },
      {
        path: 'purchases',
        children: [
          {
            path: 'dashboard',
            element: <PurchaseDashboard />,
          },
          {
            path: 'new-request',
            element: <NewRequestPage />,
          },
          {
            path: 'quotations',
            element: <QuotationsPage />,
          },
          {
            path: 'create-order',
            element: <CreateOrderPage />,
          },
        ],
      },
      {
        path: 'finance',
        children: [
          {
            path: 'dashboard',
            element: <FinanceDashboard />,
          },
          {
            path: 'payments',
            element: <FinancePayments />,
          },
          {
            path: 'invoices',
            element: <InvoiceManagementPage />,
          },
          {
            path: 'ppd-complements',
            element: <PPDComplementsPage />,
          },
        ],
      },
      {
        path: 'admin',
        children: [
          {
            path: 'dashboard',
            element: <AdminDashboard />,
          },
          {
            path: 'users',
            element: <UserManagementPage />,
          },
          {
            path: 'documents',
            element: <DocumentManagementPage />,
          },
        ],
      },
    ],
  },
]);

export default router; 