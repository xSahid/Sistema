import { useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { useAppContext } from '../../context/AppContext';

const ProviderRegistration = () => {
  const { login } = useAppContext();
  const [formData, setFormData] = useState({
    companyName: '',
    rfc: '',
    email: '',
    phone: '',
    address: '',
    contactPerson: '',
    password: '',
    confirmPassword: ''
  });
  const [documents, setDocuments] = useState({
    actaConstitutiva: null,
    poderNotarial: null,
    identificacionFiscal: null,
    comprobanteDomicilio: null
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setDocuments(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simular registro exitoso
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Crear usuario proveedor
      const userData = {
        id: Date.now(),
        name: formData.companyName,
        email: formData.email,
        role: 'provider',
        status: 'pending' // Pendiente de aprobación
      };
      
      login(userData);
      
      // Aquí iría la lógica real de registro
      console.log('Datos del formulario:', formData);
      console.log('Documentos:', documents);
      
    } catch (error) {
      console.error('Error en el registro:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Información de la Empresa</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de la Empresa *
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="rfc" className="block text-sm font-medium text-gray-700 mb-2">
            RFC *
          </label>
          <input
            type="text"
            id="rfc"
            name="rfc"
            value={formData.rfc}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Dirección *
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={3}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-2">
            Persona de Contacto *
          </label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={nextStep} disabled={!formData.companyName || !formData.rfc || !formData.email}>
          Siguiente
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Documentos Requeridos</h3>
      <p className="text-gray-600">Sube los documentos necesarios para completar tu registro</p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="actaConstitutiva" className="block text-sm font-medium text-gray-700 mb-2">
            Acta Constitutiva *
          </label>
          <input
            type="file"
            id="actaConstitutiva"
            name="actaConstitutiva"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="poderNotarial" className="block text-sm font-medium text-gray-700 mb-2">
            Poder Notarial *
          </label>
          <input
            type="file"
            id="poderNotarial"
            name="poderNotarial"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="identificacionFiscal" className="block text-sm font-medium text-gray-700 mb-2">
            Identificación Fiscal *
          </label>
          <input
            type="file"
            id="identificacionFiscal"
            name="identificacionFiscal"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="comprobanteDomicilio" className="block text-sm font-medium text-gray-700 mb-2">
            Comprobante de Domicilio *
          </label>
          <input
            type="file"
            id="comprobanteDomicilio"
            name="comprobanteDomicilio"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline">
          Anterior
        </Button>
        <Button onClick={nextStep} disabled={!documents.actaConstitutiva || !documents.poderNotarial || !documents.identificacionFiscal || !documents.comprobanteDomicilio}>
          Siguiente
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Credenciales de Acceso</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Contraseña *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            minLength={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirmar Contraseña *
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline">
          Anterior
        </Button>
        <Button 
          type="submit" 
          disabled={!formData.password || formData.password !== formData.confirmPassword || loading}
          className="min-w-[120px]"
        >
          {loading ? 'Registrando...' : 'Completar Registro'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Registro de Proveedor
        </h1>
        <p className="text-gray-600">
          Completa tu registro para acceder al sistema de gestión de proveedores
        </p>
      </div>

      {/* Indicador de progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'}`}>
              1
            </div>
            <span className="ml-2 text-sm font-medium">Información</span>
          </div>
          <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'}`}>
              2
            </div>
            <span className="ml-2 text-sm font-medium">Documentos</span>
          </div>
          <div className={`w-8 h-0.5 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'}`}>
              3
            </div>
            <span className="ml-2 text-sm font-medium">Acceso</span>
          </div>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </form>
      </Card>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default ProviderRegistration; 