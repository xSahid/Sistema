import React from 'react';
import { 
  Box, 
  Typography, 
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useAppContext();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#121212' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#000000'
    }}>
      {/* Error Code */}
      <Typography 
        variant="h1" 
        sx={{ 
          fontSize: { xs: '6rem', sm: '8rem', md: '10rem' },
          fontWeight: 900,
          color: isDarkMode ? '#ff6b6b' : '#f44336',
          mb: 2,
          lineHeight: 1
        }}
      >
        404
      </Typography>

      {/* Main Title */}
      <Typography 
        variant="h2" 
        sx={{ 
          fontWeight: 600,
          color: isDarkMode ? '#ffffff' : '#333333',
          mb: 3,
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          textAlign: 'center'
        }}
      >
        Página no encontrada
      </Typography>

      {/* Description */}
      <Typography 
        variant="body1" 
        sx={{ 
          color: isDarkMode ? '#cccccc' : '#666666',
          mb: 4,
          fontSize: '1.1rem',
          textAlign: 'center',
          maxWidth: 400,
          mx: 'auto'
        }}
      >
        La página que buscas no existe o no tienes permisos para acceder a ella.
      </Typography>

      {/* Action Button */}
      <Button 
        variant="contained" 
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ 
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 500,
          px: 4,
          py: 1.5,
          fontSize: '1rem',
          backgroundColor: isDarkMode ? '#90caf9' : '#1976d2',
          '&:hover': {
            backgroundColor: isDarkMode ? '#42a5f5' : '#1565c0',
          },
        }}
      >
        Volver Atrás
      </Button>
    </Box>
  );
};

export default NotFound; 