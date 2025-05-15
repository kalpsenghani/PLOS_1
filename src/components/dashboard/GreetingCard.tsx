import React from 'react';
import { motion } from 'framer-motion';
import Card from '../common/Card';

interface GreetingCardProps {
  name: string;
  quote: string;
}

const GreetingCard: React.FC<GreetingCardProps> = ({ name, quote }) => {
  // Get time of day for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-primary-500 to-primary-700 text-white">
      <div className="relative z-10">
        <motion.h1 
          className="text-2xl font-bold mb-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {getGreeting()}, {name}!
        </motion.h1>
        
        <motion.p
          className="text-primary-100 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'long', 
            day: 'numeric' 
          })}
        </motion.p>
        
        <motion.div
          className="text-sm bg-white/10 p-3 rounded-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="italic">"{quote}"</p>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-2 right-2 h-20 w-20 rounded-full bg-white/10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-white/5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      />
    </Card>
  );
};

export default GreetingCard;