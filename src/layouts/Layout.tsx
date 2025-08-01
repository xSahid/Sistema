import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from '../components/Sidebar';
import { useLoading } from '../hooks/useLoading';
import HeaderSkeleton from '../components/HeaderSkeleton';
import FooterSkeleton from '../components/FooterSkeleton';

const Layout: React.FC = () => {
  const { isLoading } = useLoading({ delay: 100, minDuration: 300 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {isLoading ? <HeaderSkeleton /> : <Header onSidebarToggle={toggleSidebar} />}
      <main style={{ flex: 1, paddingTop: '90px' }}>
        <Outlet />
      </main>
      {isLoading ? <FooterSkeleton /> : <Footer />}
      
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </div>
  );
};

export default Layout; 