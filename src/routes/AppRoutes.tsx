import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import ProviderRegistration from '../pages/providers/ProviderRegistration';
import ProviderDashboard from '../pages/providers/ProviderDashboard';
import PurchaseDashboard from '../pages/purchases/PurchaseDashboard';
import QuotationsPage from '../pages/purchases/QuotationsPage';
import NewRequestPage from '../pages/purchases/NewRequestPage';
import CreateOrderPage from '../pages/purchases/CreateOrderPage';
import FinanceDashboard from '../pages/finance/FinanceDashboard';
import FinancePayments from '../pages/finance/FinancePayments';
import AdminDashboard from '../pages/admin/AdminDashboard';

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
            path: 'quotations',
            element: <QuotationsPage />,
          },
          {
            path: 'new-request',
            element: <NewRequestPage />,
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
        ],
      },
      {
        path: 'admin',
        children: [
          {
            path: 'dashboard',
            element: <AdminDashboard />,
          },
        ],
      },
    ],
  },
]);

export default router; 