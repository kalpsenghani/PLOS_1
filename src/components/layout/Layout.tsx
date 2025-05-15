import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Overlay for mobile menu
  const overlayVariants = {
    open: { opacity: 0.5 },
    closed: { opacity: 0 },
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar - always visible on larger screens */}
      <div className="hidden lg:block">
        <Sidebar isMobile={false} />
      </div>

      {/* Mobile Sidebar with overlay - conditionally visible */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black z-40"
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              onClick={closeMobileMenu}
            />
            <Sidebar isMobile={true} closeMobileMenu={closeMobileMenu} />
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleMobileMenu={toggleMobileMenu} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;