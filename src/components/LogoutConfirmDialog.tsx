import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Logout,
  Close,
} from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';

interface LogoutConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutConfirmDialog: React.FC<LogoutConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const { isDarkMode } = useAppContext();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
          border: isDarkMode ? '1px solid #334155' : '1px solid #e5e7eb',
          boxShadow: isDarkMode 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
            : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      <DialogTitle sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pb: 1,
        borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: '#f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
          }}>
            <Logout sx={{ color: '#ffffff', fontSize: 24 }} />
          </Box>
          <Typography variant="h6" sx={{
            color: isDarkMode ? '#f8fafc' : '#1f2937',
            fontWeight: 600,
          }}>
            Confirmar Cierre de Sesión
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: isDarkMode ? '#64748b' : '#6b7280',
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(100, 116, 139, 0.1)' : 'rgba(107, 114, 128, 0.1)',
            },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <Typography variant="body1" sx={{
          color: isDarkMode ? '#cbd5e1' : '#6b7280',
          lineHeight: 1.6,
        }}>
          ¿Estás seguro de que quieres cerrar tu sesión?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 1, gap: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 4,
            py: 1.5,
            color: isDarkMode ? '#60a5fa' : '#6366f1',
            borderColor: isDarkMode ? '#60a5fa' : '#6366f1',
            backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.05)' : 'transparent',
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(99, 102, 241, 0.1)',
              borderColor: isDarkMode ? '#93c5fd' : '#8b5cf6',
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 4,
            py: 1.5,
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            boxShadow: '0 4px 16px rgba(239, 68, 68, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)',
            },
          }}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutConfirmDialog; 