import React from 'react';
import Skeleton from './Skeleton';

const RegistrationSkeleton: React.FC = () => {
  return (
    <div className="container">
      <section className="hero">
        <div className="hero skeleton-hero">
          <Skeleton width="60%" height="3rem" className="mb-4" />
          <Skeleton width="80%" height="1.5rem" className="mb-6" />
        </div>
        
        <div className="registration-form-container skeleton-card">
          <div className="registration-form">
            {/* Primera fila */}
            <div className="form-row">
              <div className="form-field">
                <Skeleton width="120px" height="1rem" className="mb-2" />
                <Skeleton width="100%" height="3rem" borderRadius="0.75rem" />
              </div>
              
              <div className="form-field">
                <Skeleton width="140px" height="1rem" className="mb-2" />
                <Skeleton width="100%" height="3rem" borderRadius="0.75rem" />
              </div>
            </div>
            
            {/* Segunda fila */}
            <div className="form-row">
              <div className="form-field">
                <Skeleton width="80px" height="1rem" className="mb-2" />
                <Skeleton width="100%" height="3rem" borderRadius="0.75rem" />
              </div>
              
              <div className="form-field">
                <Skeleton width="100px" height="1rem" className="mb-2" />
                <Skeleton width="100%" height="3rem" borderRadius="0.75rem" />
              </div>
            </div>
            
            {/* Tercera fila */}
            <div className="form-row">
              <div className="form-field">
                <Skeleton width="100px" height="1rem" className="mb-2" />
                <Skeleton width="100%" height="3rem" borderRadius="0.75rem" />
              </div>
              
              <div className="form-field">
                <Skeleton width="60px" height="1rem" className="mb-2" />
                <Skeleton width="100%" height="3rem" borderRadius="0.75rem" />
              </div>
            </div>
            
            {/* Campo completo */}
            <div className="form-field full-width">
              <Skeleton width="140px" height="1rem" className="mb-2" />
              <Skeleton width="100%" height="3rem" borderRadius="0.75rem" />
            </div>
            
            {/* Contraseñas */}
            <div className="form-row">
              <div className="form-field">
                <Skeleton width="100px" height="1rem" className="mb-2" />
                <Skeleton width="100%" height="3rem" borderRadius="0.75rem" />
              </div>
              
              <div className="form-field">
                <Skeleton width="160px" height="1rem" className="mb-2" />
                <Skeleton width="100%" height="3rem" borderRadius="0.75rem" />
              </div>
            </div>
            
            {/* Botón */}
            <Skeleton width="100%" height="3.5rem" borderRadius="0.75rem" className="mt-4" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegistrationSkeleton; 