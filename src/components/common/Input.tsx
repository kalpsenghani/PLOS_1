import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps {
  label?: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  error,
  required = false,
  disabled = false,
  className = '',
  icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const inputType = isPasswordField ? (showPassword ? 'text' : 'password') : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-error-500">*</span>}
        </label>
      )}
      <div className="relative">
        <div className="flex items-center">
          {icon && (
            <div className="absolute left-3 text-gray-400">{icon}</div>
          )}
          <input
            type={inputType}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={`w-full rounded-lg border transition-colors duration-200 
              ${icon ? 'pl-10' : 'pl-4'} 
              ${isPasswordField ? 'pr-10' : 'pr-4'} 
              py-2 text-gray-900 focus:outline-none
              ${error ? 'border-error-500 focus:border-error-500' : 'border-gray-300 focus:border-primary-500'} 
              ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
          />
          {isPasswordField && (
            <button
              type="button"
              className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-error-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Input;