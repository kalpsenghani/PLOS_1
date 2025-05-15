import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all';
  
  // Size styles
  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white',
    outline: 'bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50',
    text: 'bg-transparent text-primary-500 hover:text-primary-600 hover:bg-primary-50 px-2',
    success: 'bg-success-500 hover:bg-success-600 text-white',
    danger: 'bg-error-500 hover:bg-error-600 text-white',
  };
  
  // Disabled styles
  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : 'cursor-pointer';
  
  // Full width styles
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Combine all styles
  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${widthStyles} ${className}`;
  
  return (
    <motion.button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </motion.button>
  );
};

export default Button;