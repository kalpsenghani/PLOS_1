import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Moon } from 'lucide-react';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';

interface HealthSummaryCardProps {
  steps: number;
  sleep: number;
  streak: number;
}

const HealthSummaryCard: React.FC<HealthSummaryCardProps> = ({ steps, sleep, streak }) => {
  // Calculate progress for steps (assuming 10,000 steps is the goal)
  const stepsProgress = Math.min(Math.round((steps / 10000) * 100), 100);
  
  // Calculate progress for sleep (assuming 8 hours is ideal)
  const sleepProgress = Math.min(Math.round((sleep / 8) * 100), 100);
  
  return (
    <Card title="Health Summary">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <Activity size={16} className="text-primary-500 mr-1.5" />
              <span className="text-sm font-medium">Daily Steps</span>
            </div>
            <span className="text-sm font-semibold">{steps.toLocaleString()}</span>
          </div>
          <ProgressBar progress={stepsProgress} size="md" variant="primary" showPercentage={false} />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <Moon size={16} className="text-primary-500 mr-1.5" />
              <span className="text-sm font-medium">Sleep</span>
            </div>
            <span className="text-sm font-semibold">{sleep} hrs</span>
          </div>
          <ProgressBar progress={sleepProgress} size="md" variant="secondary" showPercentage={false} />
        </div>
        
        <motion.div 
          className="flex items-center justify-between p-3 bg-primary-50 rounded-lg mt-4"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-sm text-primary-700">Current streak</span>
          <div className="flex items-center">
            <span className="font-bold text-primary-700">{streak} days</span>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, repeatDelay: 4, duration: 0.5 }}
            >
              <span className="ml-2">🔥</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Card>
  );
};

export default HealthSummaryCard;