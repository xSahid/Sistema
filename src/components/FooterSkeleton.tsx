import React from 'react';
import Skeleton from './Skeleton';

const FooterSkeleton: React.FC = () => {
  return (
    <footer className="footer skeleton-footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <Skeleton width="200px" height="1.25rem" className="mb-3" />
            <Skeleton width="100%" height="0.875rem" className="mb-2" />
            <Skeleton width="90%" height="0.875rem" />
          </div>
          <div className="footer-section">
            <Skeleton width="150px" height="1.25rem" className="mb-3" />
            <Skeleton width="100%" height="0.875rem" className="mb-2" />
            <Skeleton width="80%" height="0.875rem" className="mb-2" />
            <Skeleton width="90%" height="0.875rem" />
          </div>
          <div className="footer-section">
            <Skeleton width="120px" height="1.25rem" className="mb-3" />
            <Skeleton width="100%" height="0.875rem" className="mb-2" />
            <Skeleton width="95%" height="0.875rem" className="mb-2" />
            <Skeleton width="85%" height="0.875rem" />
          </div>
        </div>
        <div className="footer-bottom">
          <Skeleton width="300px" height="0.875rem" />
        </div>
      </div>
    </footer>
  );
};

export default FooterSkeleton; 