import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, CheckCircle, Clock } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import GoalForm from '../components/goals/GoalForm';

const GoalsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isGoalFormOpen, setIsGoalFormOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Goals' },
    { id: 'health', label: 'Health' },
    { id: 'career', label: 'Career' },
    { id: 'personal', label: 'Personal' },
    { id: 'financial', label: 'Financial' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Goals & Planning</h1>
          <Button
            variant="primary"
            icon={<Plus size={18} />}
            onClick={() => setIsGoalFormOpen(true)}
          >
            Add New Goal
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <Target size={18} className="text-primary-600" />
                </div>
                <span className="text-sm font-medium text-primary-600">Health</span>
              </div>
              <span className="text-sm text-gray-500">45 days left</span>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">Run a Half Marathon</h3>
            <p className="text-sm text-gray-600 mb-4">Train for and complete a half marathon in under 2 hours</p>
            
            <ProgressBar progress={45} variant="primary" className="mb-4" />
            
            <div className="flex justify-between text-sm text-gray-500">
              <span>4/8 tasks completed</span>
              <span>45%</span>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-success-100 rounded-full flex items-center justify-center mr-3">
                  <Target size={18} className="text-success-600" />
                </div>
                <span className="text-sm font-medium text-success-600">Career</span>
              </div>
              <span className="text-sm text-gray-500">90 days left</span>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">Learn Web Development</h3>
            <p className="text-sm text-gray-600 mb-4">Complete full-stack web development course</p>
            
            <ProgressBar progress={30} variant="success" className="mb-4" />
            
            <div className="flex justify-between text-sm text-gray-500">
              <span>3/10 tasks completed</span>
              <span>30%</span>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-warning-100 rounded-full flex items-center justify-center mr-3">
                  <Target size={18} className="text-warning-600" />
                </div>
                <span className="text-sm font-medium text-warning-600">Financial</span>
              </div>
              <span className="text-sm text-gray-500">120 days left</span>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">Save for Vacation</h3>
            <p className="text-sm text-gray-600 mb-4">Save $3000 for summer trip to Europe</p>
            
            <ProgressBar progress={65} variant="warning" className="mb-4" />
            
            <div className="flex justify-between text-sm text-gray-500">
              <span>$1950/$3000 saved</span>
              <span>65%</span>
            </div>
          </Card>
        </div>

        {/* AI Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Goal Insights</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-primary-50 rounded-lg">
                <CheckCircle className="text-primary-600 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-gray-800">Great Progress!</h3>
                  <p className="text-sm text-gray-600">
                    You're ahead of schedule on your marathon training. Keep up the momentum!
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-warning-50 rounded-lg">
                <Clock className="text-warning-600 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-gray-800">Attention Needed</h3>
                  <p className="text-sm text-gray-600">
                    Your web development goal needs more focus to stay on track.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold mb-4">Suggested Goals</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Read 12 Books This Year</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Based on your interest in personal development
                </p>
                <Button variant="outline" size="sm">Add Goal</Button>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Learn a New Language</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Complement your travel goals with language skills
                </p>
                <Button variant="outline" size="sm">Add Goal</Button>
              </div>
            </div>
          </Card>
        </div>

        {isGoalFormOpen && (
          <GoalForm onClose={() => setIsGoalFormOpen(false)} />
        )}
      </motion.div>
    </div>
  );
};

export default GoalsPage;