import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Fade,
  Modal,
} from '@mui/material';
import {
  CheckCircle,
  Error,
  Warning,
  Info,
  Close,
} from '@mui/icons-material';

interface CustomAlertProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onConfirm?: () => void;
  confirmText?: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  type, 
  onConfirm, 
  confirmText = 'Entendido' 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !onConfirm) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, onConfirm]);

  // Debug: Log when alert should be shown
  console.log('CustomAlert render:', { isOpen, title, message, type });
  
  if (!isOpen) return null;

  const getIcon = () => {
    const iconStyle = { fontSize: 32 };
    switch (type) {
      case 'success':
        return <CheckCircle sx={{ ...iconStyle, color: '#10b981' }} />;
      case 'error':
        return <Error sx={{ ...iconStyle, color: '#ef4444' }} />;
      case 'warning':
        return <Warning sx={{ ...iconStyle, color: '#f59e0b' }} />;
      case 'info':
        return <Info sx={{ ...iconStyle, color: '#3b82f6' }} />;
      default:
        return null;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          border: '#10b981',
          text: '#ffffff',
          buttonBg: '#ffffff',
          buttonText: '#10b981'
        };
      case 'error':
        return {
          bg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          border: '#ef4444',
          text: '#ffffff',
          buttonBg: '#ffffff',
          buttonText: '#ef4444'
        };
      case 'warning':
        return {
          bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          border: '#f59e0b',
          text: '#ffffff',
          buttonBg: '#ffffff',
          buttonText: '#f59e0b'
        };
      case 'info':
        return {
          bg: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          border: '#3b82f6',
          text: '#ffffff',
          buttonBg: '#ffffff',
          buttonText: '#3b82f6'
        };
      default:
        return {
          bg: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
          border: '#6b7280',
          text: '#ffffff',
          buttonBg: '#ffffff',
          buttonText: '#6b7280'
        };
    }
  };

  const colors = getColors();

     return (
     <Modal
       open={isOpen}
       onClose={onClose}
       sx={{
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         zIndex: 9999,
         '& .MuiBackdrop-root': {
           backgroundColor: 'rgba(0, 0, 0, 0.8)',
           backdropFilter: 'blur(8px)',
         },
       }}
     >
       <Fade in={isOpen}>
         <Box
           sx={{
             maxWidth: 400,
             width: '90%',
             zIndex: 10000,
             outline: 'none',
           }}
         >
          <Paper
            elevation={24}
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              background: colors.bg,
              border: `2px solid ${colors.border}`,
              position: 'relative',
              animation: 'slideInUp 0.4s ease-out',
              '@keyframes slideInUp': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(50px) scale(0.9)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0) scale(1)',
                },
              },
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 3,
                pb: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {getIcon()}
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    color: colors.text,
                    fontWeight: 700,
                    fontSize: '1.25rem',
                  }}
                >
                  {title}
                </Typography>
              </Box>
              
              <IconButton
                onClick={onClose}
                sx={{
                  color: colors.text,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <Close />
              </IconButton>
            </Box>

            {/* Content */}
            <Box sx={{ px: 3, pb: 3 }}>
              <Typography
                variant="body1"
                sx={{
                  color: colors.text,
                  opacity: 0.9,
                  lineHeight: 1.6,
                  mb: 3,
                }}
              >
                {message}
              </Typography>

              {/* Action Button */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 2,
                }}
              >
                {onConfirm && (
                  <Button
                    variant="outlined"
                    onClick={onClose}
                    sx={{
                      color: colors.text,
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      '&:hover': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Cancelar
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={onConfirm || onClose}
                  sx={{
                    backgroundColor: colors.buttonBg,
                    color: colors.buttonText,
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    '&:hover': {
                      backgroundColor: colors.buttonBg,
                      transform: 'translateY(-1px)',
                      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  {confirmText}
                </Button>
              </Box>
            </Box>
                     </Paper>
         </Box>
       </Fade>
     </Modal>
   );
};

export default CustomAlert; 