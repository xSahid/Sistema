import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useLoading } from '../hooks/useLoading';
import HeaderSkeleton from '../components/HeaderSkeleton';
import FooterSkeleton from '../components/FooterSkeleton';

const Layout: React.FC = () => {
  const { isLoading } = useLoading({ delay: 100, minDuration: 300 });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {isLoading ? <HeaderSkeleton /> : <Header />}
      <main style={{ flex: 1, paddingTop: '90px' }}>
        <Outlet />
      </main>
      {isLoading ? <FooterSkeleton /> : <Footer />}
    </div>
  );
};

export default Layout; 