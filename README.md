# Sistema de Gestión de Proveedores

Un sistema completo para la gestión del flujo de proveedores, desde el registro hasta el pago, siguiendo un proceso de 8 pasos bien definidos.

## 🏗️ Arquitectura del Sistema

El sistema está construido con:
- **React 19** con TypeScript
- **Material-UI (MUI)** para la interfaz de usuario
- **React Router** para la navegación
- **React Hook Form** para formularios
- **Yup** para validaciones

## 📋 Flujo del Sistema

### 1️⃣ Alta del Proveedor y Validación de Documentos
- **Ruta**: `/providers/registration`
- **Descripción**: Registro de proveedores con validación de documentos fiscales
- **Funcionalidades**:
  - Formulario de registro con validación RFC
  - Carga de documentos requeridos (PDF)
  - Revisión y aprobación por administración

### 2️⃣ Solicitud de Cotización (RFQ)
- **Ruta**: `/purchases/rfq`
- **Descripción**: Creación y gestión de solicitudes de cotización
- **Funcionalidades**:
  - Creación de RFQs con requerimientos detallados
  - Selección de proveedores invitados
  - Envío automático a proveedores

### 3️⃣ Revisión de Cotizaciones
- **Ruta**: `/purchases/quotations`
- **Descripción**: Evaluación y comparación de cotizaciones recibidas
- **Funcionalidades**:
  - Comparación de precios y condiciones
  - Sistema de puntuación automática
  - Aprobación/rechazo de cotizaciones

### 4️⃣ Generación de Orden de Compra
- **Ruta**: `/purchases/orders`
- **Descripción**: Generación automática de órdenes de compra
- **Funcionalidades**:
  - Generación automática desde cotizaciones aprobadas
  - Envío al proveedor
  - Seguimiento del estado

### 5️⃣ Gestión de Facturas
- **Ruta**: `/finance/invoices`
- **Descripción**: Recepción y validación de facturas
- **Funcionalidades**:
  - Carga de facturas (PDF/XML)
  - Validación fiscal
  - Aprobación/rechazo con motivos

### 6️⃣ Plan de Pagos (Próximamente)
- **Descripción**: Programación de pagos a proveedores
- **Funcionalidades**:
  - Calendario de pagos
  - Pagos parciales o totales
  - Notificaciones automáticas

### 7️⃣ Seguimiento PPD (Próximamente)
- **Descripción**: Gestión de complementos de pago
- **Funcionalidades**:
  - Carga de complementos PPD
  - Validación fiscal
  - Trazabilidad completa

### 8️⃣ Carpeta Digital (Próximamente)
- **Descripción**: Almacenamiento digital de documentos
- **Funcionalidades**:
  - Organización por proveedor
  - Acceso controlado por roles
  - Auditoría completa

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd Sistema

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### Scripts Disponibles
```bash
npm run dev          # Ejecutar en modo desarrollo
npm run build        # Construir para producción
npm run preview      # Vista previa de la build
npm run lint         # Ejecutar linter
npm run type-check   # Verificación de tipos TypeScript
```

## 📁 Estructura del Proyecto

```
Sistema/
├── src/
│   ├── components/          # Componentes reutilizables
│   ├── pages/              # Páginas principales
│   │   ├── Dashboard.tsx   # Dashboard principal
│   │   ├── providers/      # Módulo de proveedores
│   │   ├── purchases/      # Módulo de compras
│   │   ├── finance/        # Módulo de finanzas
│   │   └── admin/          # Módulo de administración
│   ├── types/              # Definiciones de tipos TypeScript
│   ├── routes/             # Configuración de rutas
│   ├── layouts/            # Layouts de la aplicación
│   ├── context/            # Contextos de React
│   ├── hooks/              # Custom hooks
│   ├── services/           # Servicios y APIs
│   └── styles/             # Estilos globales
├── public/                 # Archivos estáticos
└── package.json
```

## 🎨 Características de la UI

### Diseño Responsivo
- Adaptable a dispositivos móviles y desktop
- Navegación intuitiva con Material-UI
- Temas claro/oscuro

### Componentes Principales
- **Dashboard**: Vista general del sistema con métricas
- **Formularios**: Validación en tiempo real con Yup
- **Tablas**: Gestión de datos con filtros y ordenamiento
- **Diálogos**: Interacciones modales para acciones críticas
- **Notificaciones**: Sistema de alertas y confirmaciones

## 🔐 Seguridad y Roles

### Roles de Usuario
- **Admin**: Acceso completo al sistema
- **Purchases**: Gestión de RFQs, cotizaciones y órdenes
- **Finance**: Gestión de facturas y pagos
- **Provider**: Acceso limitado a sus propios datos

### Validaciones
- Validación de formularios en frontend
- Validación de tipos con TypeScript
- Control de acceso por rutas

## 📊 Funcionalidades Implementadas

### ✅ Completadas
- [x] Dashboard principal con métricas
- [x] Registro de proveedores con validación
- [x] Gestión de RFQs
- [x] Revisión de cotizaciones
- [x] Generación de órdenes de compra
- [x] Gestión de facturas
- [x] Sistema de roles y permisos
- [x] Interfaz responsiva

### 🚧 En Desarrollo
- [ ] Plan de pagos
- [ ] Seguimiento PPD
- [ ] Carpeta digital
- [ ] Notificaciones en tiempo real
- [ ] Reportes y analytics

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19**: Framework principal
- **TypeScript**: Tipado estático
- **Material-UI**: Componentes de UI
- **React Router**: Navegación
- **React Hook Form**: Gestión de formularios
- **Yup**: Validación de esquemas

### Desarrollo
- **Vite**: Build tool y dev server
- **ESLint**: Linting de código
- **Prettier**: Formateo de código

## 📝 Contribución

### Guías de Desarrollo
1. Seguir las convenciones de TypeScript
2. Usar componentes de Material-UI
3. Implementar validaciones con Yup
4. Documentar nuevos componentes
5. Mantener la consistencia del diseño

### Estructura de Commits
```
feat: nueva funcionalidad
fix: corrección de bug
docs: documentación
style: cambios de estilo
refactor: refactorización de código
test: pruebas
```

## 📞 Soporte

Para soporte técnico o preguntas sobre el sistema:
- Crear un issue en el repositorio
- Contactar al equipo de desarrollo
- Revisar la documentación técnica

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.

---

**Desarrollado con ❤️ para optimizar la gestión de proveedores** 