import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Search, Bell, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface HeaderProps {
  toggleMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMobileMenu }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const notifications = [
    { id: 1, text: 'Remember to log your mood today!', time: '10 minutes ago' },
    { id: 2, text: 'You\'ve completed 80% of your step goal.', time: '2 hours ago' },
    { id: 3, text: 'New journal prompt is available.', time: '1 day ago' },
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showProfile) setShowProfile(false);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    if (showNotifications) setShowNotifications(false);
  };

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <button
          className="mr-4 p-1 rounded-full hover:bg-gray-100 lg:hidden"
          onClick={toggleMobileMenu}
        >
          <Menu size={24} />
        </button>
        
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-400 w-full max-w-xs"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <motion.button
            className="p-1.5 rounded-full hover:bg-gray-100 relative"
            onClick={toggleNotifications}
            whileTap={{ scale: 0.9 }}
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-4 w-4 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center">
              3
            </span>
          </motion.button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-700">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                      <p className="text-sm">{notification.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center">
                  <button className="text-sm text-primary-500 hover:text-primary-600">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="relative">
          <motion.button
            className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-gray-100"
            onClick={toggleProfile}
            whileTap={{ scale: 0.95 }}
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                <User size={20} className="text-primary-500" />
              </div>
            )}
          </motion.button>
          
          <AnimatePresence>
            {showProfile && (
              <motion.div
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-3 border-b border-gray-100">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <div>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50">
                    Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50">
                    Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-error-600">
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;