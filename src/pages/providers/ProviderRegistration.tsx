import React, { useState } from 'react';

interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
  businessType: string;
}

const ProviderRegistration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    taxId: '',
    businessType: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    // Aquí se enviarían los datos al backend
  };

  return (
    <div className="container">
      <section className="hero">
        <h1 className="hero-title">Registro de Proveedor</h1>
        <p className="hero-subtitle">
          Completa el formulario para registrarte como proveedor en nuestro sistema
        </p>
        
        <div className="features">
          <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem', fontWeight: '600' }}>
                Nombre de la Empresa *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '1rem'
                }}
                placeholder="Ingresa el nombre de tu empresa"
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem', fontWeight: '600' }}>
                Nombre del Contacto *
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '1rem'
                }}
                placeholder="Nombre completo del contacto principal"
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem', fontWeight: '600' }}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '1rem'
                }}
                placeholder="email@empresa.com"
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem', fontWeight: '600' }}>
                Teléfono *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '1rem'
                }}
                placeholder="+52 55 1234 5678"
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem', fontWeight: '600' }}>
                Dirección *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '1rem'
                }}
                placeholder="Dirección completa de la empresa"
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem', fontWeight: '600' }}>
                RFC *
              </label>
              <input
                type="text"
                name="taxId"
                value={formData.taxId}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '1rem'
                }}
                placeholder="RFC de la empresa"
              />
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem', fontWeight: '600' }}>
                Tipo de Negocio *
              </label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '1rem'
                }}
              >
                <option value="">Selecciona el tipo de negocio</option>
                <option value="manufacturing">Manufactura</option>
                <option value="services">Servicios</option>
                <option value="distribution">Distribución</option>
                <option value="technology">Tecnología</option>
                <option value="other">Otro</option>
              </select>
            </div>
            
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              Enviar Registro
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ProviderRegistration; 