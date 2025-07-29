# AppAlze - Sistema Moderno

Una aplicación web moderna desarrollada con React, Vite y las mejores prácticas de desarrollo.

## 🚀 Tecnologías

- **React 19** - Biblioteca de JavaScript para construir interfaces de usuario
- **Vite** - Build tool ultra rápido para desarrollo moderno
- **React Router** - Enrutamiento declarativo para React
- **Tailwind CSS** - Framework CSS utility-first
- **ESLint** - Herramienta de análisis estático de código

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Button.jsx
│   └── Card.jsx
├── pages/              # Vistas principales
│   ├── Home.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── layouts/            # Layouts base
│   ├── Layout.jsx
│   ├── Header.jsx
│   └── Footer.jsx
├── routes/             # Configuración de rutas
│   └── AppRoutes.jsx
├── styles/             # Archivos CSS y configuraciones
│   ├── index.css
│   └── App.css
├── utils/              # Funciones utilitarias
│   └── constants.js
├── hooks/              # Custom hooks de React
│   └── useLocalStorage.js
├── context/            # Contextos de React
│   └── AppContext.jsx
├── services/           # Servicios y APIs
│   └── api.js
├── assets/             # Imágenes, íconos, etc.
├── App.jsx             # Componente principal
└── main.jsx           # Punto de entrada
```

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd sistema
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta ESLint para verificar el código

## 🎨 Características

- ✅ Arquitectura modular y escalable
- ✅ Componentes reutilizables
- ✅ Enrutamiento optimizado
- ✅ Diseño responsivo con Tailwind CSS
- ✅ Código limpio y mantenible
- ✅ Context API para gestión de estado
- ✅ Custom hooks para lógica reutilizable
- ✅ Servicios de API centralizados

## 🚀 Despliegue

Para construir la aplicación para producción:

```bash
npm run build
```

Los archivos generados estarán en la carpeta `dist/`.

## 📚 Documentación

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
