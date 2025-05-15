import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Plus } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const FamilyPage: React.FC = () => {
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
          <h1 className="text-2xl font-bold text-gray-800">Family & Social</h1>
          <Button
            variant="primary"
            icon={<Plus size={18} />}
          >
            Plan Activity
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="flex items-center p-6">
            <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
              <Clock size={24} className="text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Family Time</p>
              <h3 className="text-2xl font-bold text-gray-800">12.5 hrs</h3>
              <p className="text-sm text-gray-500">This week</p>
            </div>
          </Card>

          <Card className="flex items-center p-6">
            <div className="h-12 w-12 bg-success-100 rounded-full flex items-center justify-center mr-4">
              <Calendar size={24} className="text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Activities</p>
              <h3 className="text-2xl font-bold text-gray-800">8</h3>
              <p className="text-sm text-gray-500">Planned this month</p>
            </div>
          </Card>

          <Card className="flex items-center p-6">
            <div className="h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center mr-4">
              <Users size={24} className="text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Family Members</p>
              <h3 className="text-2xl font-bold text-gray-800">4</h3>
              <p className="text-sm text-gray-500">Active profiles</p>
            </div>
          </Card>
        </div>

        {/* Calendar and Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Upcoming Activities</h2>
            <div className="space-y-4">
              <div className="p-4 bg-primary-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">Family Game Night</h3>
                    <p className="text-sm text-gray-600">Board games and snacks</p>
                  </div>
                  <span className="text-sm text-primary-600">Tomorrow, 7 PM</span>
                </div>
              </div>
              
              <div className="p-4 bg-success-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">Weekend Park Visit</h3>
                    <p className="text-sm text-gray-600">Picnic and outdoor games</p>
                  </div>
                  <span className="text-sm text-success-600">Saturday, 11 AM</span>
                </div>
              </div>
              
              <div className="p-4 bg-warning-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">Movie Night</h3>
                    <p className="text-sm text-gray-600">Watch new animated film</p>
                  </div>
                  <span className="text-sm text-warning-600">Sunday, 6 PM</span>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold mb-4">AI Suggestions</h2>
            <div className="space-y-4">
              <div className="p-4 border border-primary-100 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Weekend Activity Ideas</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Cook a new recipe together</li>
                  <li>• Visit the local museum</li>
                  <li>• Have a backyard camping night</li>
                </ul>
              </div>
              
              <div className="p-4 border border-success-100 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Quality Time Tips</h3>
                <p className="text-sm text-gray-600">
                  Try having device-free dinner conversations to strengthen family bonds.
                </p>
              </div>
              
              <Button variant="outline" fullWidth>
                Get More Suggestions
              </Button>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default FamilyPage;