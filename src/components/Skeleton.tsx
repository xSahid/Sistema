import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  borderRadius?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  width = '100%', 
  height = '1rem', 
  className = '',
  borderRadius = '0.25rem'
}) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-loading 1s infinite'
      }}
    />
  );
};

// Skeleton components for specific use cases
export const CardSkeleton: React.FC = () => (
  <div className="card skeleton-card">
    <div className="skeleton-icon" style={{ 
      width: '80px', 
      height: '80px', 
      borderRadius: '1rem',
      margin: '0 auto 1.5rem'
    }}>
      <Skeleton width="100%" height="100%" borderRadius="1rem" />
    </div>
    <Skeleton width="60%" height="1.25rem" className="mb-3" />
    <Skeleton width="100%" height="0.875rem" className="mb-2" />
    <Skeleton width="80%" height="0.875rem" className="mb-2" />
    <Skeleton width="90%" height="0.875rem" />
  </div>
);

export const HeroSkeleton: React.FC = () => (
  <div className="hero skeleton-hero">
    <Skeleton width="70%" height="3.5rem" className="mb-4" />
    <Skeleton width="90%" height="1.5rem" className="mb-2" />
    <Skeleton width="80%" height="1.5rem" className="mb-6" />
  </div>
);

export const HeaderSkeleton: React.FC = () => (
  <div className="header skeleton-header">
    <div className="header-content">
      <Skeleton width="200px" height="1.5rem" />
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Skeleton width="2rem" height="2rem" borderRadius="0.5rem" />
        <Skeleton width="2rem" height="2rem" borderRadius="0.5rem" />
        <Skeleton width="100px" height="2rem" borderRadius="0.5rem" />
      </div>
    </div>
  </div>
);

export const FeatureSkeleton: React.FC = () => (
  <div className="feature-section skeleton-feature">
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
      <Skeleton width="40px" height="40px" borderRadius="0.5rem" />
      <Skeleton width="120px" height="1.5rem" />
    </div>
    <div>
      <Skeleton width="100%" height="0.875rem" className="mb-2" />
      <Skeleton width="90%" height="0.875rem" className="mb-2" />
      <Skeleton width="95%" height="0.875rem" className="mb-2" />
      <Skeleton width="85%" height="0.875rem" />
    </div>
  </div>
);

export default Skeleton; 