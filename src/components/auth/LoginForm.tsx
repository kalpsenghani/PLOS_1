import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { login } from '../../redux/slices/authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import Input from '../common/Input';
import Button from '../common/Button';

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup, onForgotPassword }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login({ email: formData.email, password: formData.password }));
  };

  const handleDemoLogin = async () => {
    await dispatch(login({ email: 'demo@example.com', password: 'password' }));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back</h1>
        <p className="text-gray-600 mt-2">Please sign in to continue to PLOS</p>
      </div>
      
      {error && (
        <div className="bg-error-50 text-error-600 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Email address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          icon={<Mail size={18} />}
        />
        
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
          icon={<Lock size={18} />}
        />
        
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Forgot password?
          </button>
        </div>
        
        <Button
          type="submit"
          fullWidth
          disabled={isLoading}
          icon={<LogIn size={18} />}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 gap-3">
          <button
            type="button"
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.79-1.677-4.184-2.702-6.735-2.702-5.522 0-10 4.478-10 10s4.478 10 10 10c5.523 0 10-4.478 10-10 0-0.772-0.098-1.52-0.277-2.239h-9.723z"
                fill="#4285F4"
              />
            </svg>
            Sign in with Google
          </button>
          
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Sign in as Demo User
          </button>
        </div>
      </div>
      
      <p className="mt-8 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="font-medium text-primary-600 hover:text-primary-500"
        >
          Sign up
        </button>
      </p>
    </motion.div>
  );
};

export default LoginForm;