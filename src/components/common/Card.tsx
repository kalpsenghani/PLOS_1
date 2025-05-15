import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, children, className = '', hoverEffect = false, onClick }) => {
  const cardVariants = {
    initial: {
      y: 5,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    hover: hoverEffect ? {
      y: -4,
      transition: {
        duration: 0.2,
      },
    } : {},
    tap: hoverEffect ? {
      y: 0,
      transition: {
        duration: 0.1,
      },
    } : {},
  };

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-soft p-5 ${className}`}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
    >
      {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
      {children}
    </motion.div>
  );
};

export default Card;