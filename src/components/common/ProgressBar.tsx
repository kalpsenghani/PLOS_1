import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  showPercentage?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  size = 'md',
  variant = 'primary',
  showPercentage = true,
  className = '',
}) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  
  // Size styles
  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
  };
  
  // Combine styles
  const progressBarStyles = `${sizeStyles[size]} ${variantStyles[variant]} rounded-full`;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-1">
        {label && <div className="text-sm font-medium text-gray-700">{label}</div>}
        {showPercentage && <div className="text-sm font-medium text-gray-500">{normalizedProgress}%</div>}
      </div>
      <div className={`w-full bg-gray-200 rounded-full ${sizeStyles[size]}`}>
        <motion.div
          className={progressBarStyles}
          style={{ width: '0%' }}
          animate={{ width: `${normalizedProgress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;