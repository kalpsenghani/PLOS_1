import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Input from '../common/Input';
import Button from '../common/Button';

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };
  
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md text-center"
      >
        <div className="bg-success-50 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
          <Mail size={28} className="text-success-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Check your email</h2>
        <p className="text-gray-600 mb-6">
          We've sent a password reset link to <strong>{email}</strong>.<br />
          Please check your inbox and follow the instructions.
        </p>
        <Button variant="outline" onClick={onSwitchToLogin}>
          Back to login
        </Button>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Reset your password</h1>
        <p className="text-gray-600 mt-2">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Email address"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          icon={<Mail size={18} />}
        />
        
        <div className="mt-6">
          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Sending link...' : 'Send reset link'}
          </Button>
        </div>
      </form>
      
      <p className="mt-8 text-center text-sm text-gray-600">
        Remember your password?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-medium text-primary-600 hover:text-primary-500"
        >
          Back to login
        </button>
      </p>
    </motion.div>
  );
};

export default ForgotPasswordForm;