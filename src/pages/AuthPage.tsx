import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

type AuthView = 'login' | 'signup' | 'forgot-password';

const AuthPage: React.FC = () => {
  const [authView, setAuthView] = useState<AuthView>('login');
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };
  
  const formVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };
  
  return (
    <motion.div
      className="min-h-screen flex flex-col md:flex-row"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Left side - Illustration/info */}
      <div className="bg-primary-600 text-white md:w-1/2 p-8 flex flex-col justify-center items-center">
        <div className="max-w-md text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">PLOS</h1>
            <h2 className="text-xl md:text-2xl font-medium mb-6">Personal Life Operating System</h2>
          </motion.div>
          
          <motion.p
            className="text-primary-100 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Organize and optimize every aspect of your life with our AI-powered assistant. 
            Track your health, manage goals, journal your thoughts, and more - all in one place.
          </motion.p>
          
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="bg-primary-700/50 p-4 rounded-lg">
              <h3 className="font-medium mb-1">Health Tracking</h3>
              <p className="text-sm text-primary-200">Monitor physical and mental health metrics</p>
            </div>
            <div className="bg-primary-700/50 p-4 rounded-lg">
              <h3 className="font-medium mb-1">Goal Setting</h3>
              <p className="text-sm text-primary-200">Create and track personal and professional goals</p>
            </div>
            <div className="bg-primary-700/50 p-4 rounded-lg">
              <h3 className="font-medium mb-1">Journaling</h3>
              <p className="text-sm text-primary-200">Document your thoughts with AI-powered insights</p>
            </div>
            <div className="bg-primary-700/50 p-4 rounded-lg">
              <h3 className="font-medium mb-1">Family Time</h3>
              <p className="text-sm text-primary-200">Strengthen relationships with dedicated tracking</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Right side - Auth forms */}
      <div className="bg-white md:w-1/2 p-6 md:p-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {authView === 'login' && (
            <motion.div
              key="login"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-md"
            >
              <LoginForm
                onSwitchToSignup={() => setAuthView('signup')}
                onForgotPassword={() => setAuthView('forgot-password')}
              />
            </motion.div>
          )}
          
          {authView === 'signup' && (
            <motion.div
              key="signup"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-md"
            >
              <SignupForm onSwitchToLogin={() => setAuthView('login')} />
            </motion.div>
          )}
          
          {authView === 'forgot-password' && (
            <motion.div
              key="forgot-password"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-md"
            >
              <ForgotPasswordForm onSwitchToLogin={() => setAuthView('login')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AuthPage;