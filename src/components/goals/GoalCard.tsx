import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckSquare } from 'lucide-react';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import Button from '../common/Button';
import { Goal } from '../../types';

interface GoalCardProps {
  goal: Goal;
  onView: () => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onView }) => {
  // Get the category icon and color
  const getCategoryDetails = () => {
    switch (goal.category) {
      case 'health':
        return { bgColor: 'bg-success-50', textColor: 'text-success-700' };
      case 'career':
        return { bgColor: 'bg-primary-50', textColor: 'text-primary-700' };
      case 'personal':
        return { bgColor: 'bg-secondary-50', textColor: 'text-secondary-700' };
      case 'financial':
        return { bgColor: 'bg-warning-50', textColor: 'text-warning-700' };
      default:
        return { bgColor: 'bg-gray-50', textColor: 'text-gray-700' };
    }
  };
  
  // Format the target date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  // Calculate days remaining
  const getDaysRemaining = () => {
    const targetDate = new Date(goal.targetDate);
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  const daysRemaining = getDaysRemaining();
  const { bgColor, textColor } = getCategoryDetails();
  const completedTasks = goal.tasks.filter(task => task.completed).length;
  
  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className={`px-2 py-1 rounded-md ${bgColor} ${textColor} text-xs font-medium`}>
          {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
        </div>
        <div className="flex items-center">
          <Target size={14} className="mr-1" />
          <span className="text-xs">{formatDate(goal.targetDate)}</span>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2">{goal.title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{goal.description}</p>
      
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-1">
          <div className="text-sm text-gray-600">Progress</div>
          <div className="flex items-center">
            <CheckSquare size={14} className="mr-1 text-primary-500" />
            <span className="text-sm">{completedTasks}/{goal.tasks.length} tasks</span>
          </div>
        </div>
        
        <ProgressBar progress={goal.progress} size="md" variant="primary" className="mb-4" />
        
        <div className="flex justify-between items-center">
          <motion.div 
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              daysRemaining > 7 
                ? 'bg-success-50 text-success-700' 
                : daysRemaining > 0 
                  ? 'bg-warning-50 text-warning-700' 
                  : 'bg-error-50 text-error-700'
            }`}
            animate={daysRemaining <= 3 ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {daysRemaining > 0 
              ? `${daysRemaining} days left` 
              : daysRemaining === 0 
                ? 'Due today' 
                : 'Overdue'}
          </motion.div>
          
          <Button variant="text" size="sm" onClick={onView}>
            View details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GoalCard;