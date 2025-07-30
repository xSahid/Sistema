import { RouterProvider } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import router from './routes/AppRoutes';
import './styles/index.css';

const App: React.FC = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};

export default App; 