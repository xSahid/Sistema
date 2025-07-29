const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Acerca de AppAlze
        </h1>
        <p className="text-xl text-gray-600">
          Conoce más sobre nuestro proyecto y nuestra misión.
        </p>
      </div>

      <div className="prose prose-lg mx-auto">
        <h2>Nuestra Misión</h2>
        <p>
          AppAlze nació con la visión de crear aplicaciones web modernas, escalables y mantenibles
          utilizando las mejores tecnologías y prácticas de desarrollo disponibles.
        </p>

        <h2>Tecnologías</h2>
        <ul>
          <li><strong>React 18:</strong> Biblioteca de JavaScript para construir interfaces de usuario</li>
          <li><strong>Vite:</strong> Build tool ultra rápido para desarrollo moderno</li>
          <li><strong>Tailwind CSS:</strong> Framework CSS utility-first</li>
          <li><strong>React Router:</strong> Enrutamiento declarativo para React</li>
          <li><strong>ESLint:</strong> Herramienta de análisis estático de código</li>
        </ul>

        <h2>Características</h2>
        <ul>
          <li>Arquitectura modular y escalable</li>
          <li>Componentes reutilizables</li>
          <li>Enrutamiento optimizado</li>
          <li>Diseño responsivo</li>
          <li>Código limpio y mantenible</li>
        </ul>

        <h2>Estructura del Proyecto</h2>
        <p>
          Nuestro proyecto está organizado siguiendo las mejores prácticas de desarrollo:
        </p>
        <ul>
          <li><code>components/</code> - Componentes reutilizables</li>
          <li><code>pages/</code> - Vistas principales de la aplicación</li>
          <li><code>layouts/</code> - Layouts base (Header, Footer, etc.)</li>
          <li><code>routes/</code> - Configuración de rutas</li>
          <li><code>styles/</code> - Archivos CSS y configuraciones</li>
          <li><code>utils/</code> - Funciones utilitarias</li>
          <li><code>hooks/</code> - Custom hooks de React</li>
          <li><code>context/</code> - Contextos de React</li>
          <li><code>services/</code> - Servicios y APIs</li>
        </ul>
      </div>
    </div>
  );
};

export default About; 