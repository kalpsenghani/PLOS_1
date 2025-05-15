import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Activity, Brain, BookOpen, Target, Users, Settings, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { AppDispatch } from '../../redux/store';

interface SidebarProps {
  isMobile: boolean;
  closeMobileMenu?: () => void;
}

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, closeMobileMenu }) => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  
  const navItems: NavItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/health', label: 'Physical Health', icon: <Activity size={20} /> },
    { path: '/mental', label: 'Mental Health', icon: <Brain size={20} /> },
    { path: '/journal', label: 'Journal', icon: <BookOpen size={20} /> },
    { path: '/goals', label: 'Goals', icon: <Target size={20} /> },
    { path: '/family', label: 'Family', icon: <Users size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  // Variants for animations
  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  const itemVariants = {
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    closed: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  };

  // Mobile vs desktop sidebar styles
  const sidebarClasses = isMobile
    ? 'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform'
    : 'sticky top-0 h-screen w-64 bg-white shadow-lg flex flex-col';

  const sidebarContent = (
    <>
      <div className="p-5">
        <div className="flex items-center space-x-2 mb-8">
          <motion.div 
            className="h-8 w-8 rounded-lg bg-primary-500 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white font-bold text-xl">P</span>
          </motion.div>
          <h1 className="text-xl font-bold">PLOS</h1>
        </div>

        <nav>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <motion.li key={item.path} variants={itemVariants}>
                  <Link
                    to={item.path}
                    onClick={isMobile && closeMobileMenu ? closeMobileMenu : undefined}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div>{item.icon}</div>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mt-auto p-5">
        <motion.button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </motion.button>
      </div>
    </>
  );

  // For mobile sidebar, we wrap it in a motion.div with animation
  if (isMobile) {
    return (
      <motion.div
        className={sidebarClasses}
        variants={sidebarVariants}
        initial="closed"
        animate="open"
        exit="closed"
      >
        {sidebarContent}
      </motion.div>
    );
  }

  // For desktop sidebar, no animation needed
  return <div className={sidebarClasses}>{sidebarContent}</div>;
};

export default Sidebar;