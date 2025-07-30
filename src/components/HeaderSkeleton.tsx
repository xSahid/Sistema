import React from 'react';
import Skeleton from './Skeleton';

const HeaderSkeleton: React.FC = () => {
  return (
    <header className="header skeleton-header">
      <div className="header-content">
        <Skeleton width="250px" height="1.5rem" />
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Skeleton width="2rem" height="2rem" borderRadius="0.5rem" />
          <Skeleton width="2rem" height="2rem" borderRadius="0.5rem" />
          <Skeleton width="120px" height="2rem" borderRadius="0.5rem" />
        </div>
      </div>
    </header>
  );
};

export default HeaderSkeleton; 