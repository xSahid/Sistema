import React from 'react';
import Skeleton from './Skeleton';

const ContactSkeleton: React.FC = () => {
  return (
    <div className="container">
      <section className="hero">
        <div className="hero skeleton-hero">
          <Skeleton width="70%" height="3.5rem" className="mb-4" />
          <Skeleton width="90%" height="1.5rem" className="mb-6" />
        </div>
        
        <div className="features">
          <Skeleton width="60%" height="2.5rem" className="mb-4" />
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Skeleton width="100%" height="3rem" className="mb-3" />
            <Skeleton width="100%" height="3rem" className="mb-3" />
            <Skeleton width="100%" height="8rem" className="mb-3" />
            <Skeleton width="150px" height="3rem" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactSkeleton; 