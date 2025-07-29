import { Card } from '../components/Card';
import { Button } from '../components/Button';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bienvenido a AppAlze
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Tu aplicación moderna y funcional desarrollada con React, Vite y las mejores prácticas de desarrollo web.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card>
          <h3 className="text-xl font-semibold mb-2">React Moderno</h3>
          <p className="text-gray-600">
            Desarrollado con React 18 y las últimas características como hooks y componentes funcionales.
          </p>
        </Card>
        <Card>
          <h3 className="text-xl font-semibold mb-2">Vite</h3>
          <p className="text-gray-600">
            Build tool ultra rápido que mejora significativamente la experiencia de desarrollo.
          </p>
        </Card>
        <Card>
          <h3 className="text-xl font-semibold mb-2">Tailwind CSS</h3>
          <p className="text-gray-600">
            Framework CSS utility-first para crear diseños modernos y responsivos rápidamente.
          </p>
        </Card>
      </div>

      <div className="text-center">
        <Button variant="primary" size="lg">
          Comenzar
        </Button>
      </div>
    </div>
  );
};

export default Home; 