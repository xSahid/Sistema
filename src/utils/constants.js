// Configuración de la aplicación
export const APP_CONFIG = {
  name: 'AppAlze',
  version: '1.0.0',
  description: 'Aplicación moderna desarrollada con React y Vite'
};

// Rutas de la aplicación
export const ROUTES = {
  home: '/',
  about: '/about',
  contact: '/contact'
};

// Configuración de la API
export const API_CONFIG = {
  baseURL: process.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000
};

// Mensajes de la aplicación
export const MESSAGES = {
  loading: 'Cargando...',
  error: 'Ha ocurrido un error',
  success: 'Operación exitosa',
  confirm: '¿Estás seguro?'
}; 