import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Apple, Droplets, Calendar, TrendingUp } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const NutritionPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('week');
  
  // Mock data for charts
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Calories',
        data: [2100, 1950, 2300, 2150, 1800, 2400, 2200],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

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
          <h1 className="text-2xl font-bold text-gray-800">Nutrition Tracking</h1>
          <Button
            variant="primary"
            icon={<Plus size={18} />}
          >
            Log Meal
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="flex items-center p-6">
            <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
              <Apple size={24} className="text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Calories</p>
              <h3 className="text-2xl font-bold text-gray-800">1,850</h3>
              <p className="text-sm text-success-600">-150 from goal</p>
            </div>
          </Card>

          <Card className="flex items-center p-6">
            <div className="h-12 w-12 bg-success-100 rounded-full flex items-center justify-center mr-4">
              <TrendingUp size={24} className="text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Protein</p>
              <h3 className="text-2xl font-bold text-gray-800">85g</h3>
              <p className="text-sm text-warning-600">-25g from goal</p>
            </div>
          </Card>

          <Card className="flex items-center p-6">
            <div className="h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center mr-4">
              <Calendar size={24} className="text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Meals Today</p>
              <h3 className="text-2xl font-bold text-gray-800">3</h3>
              <p className="text-sm text-gray-500">+1 snack</p>
            </div>
          </Card>

          <Card className="flex items-center p-6">
            <div className="h-12 w-12 bg-error-100 rounded-full flex items-center justify-center mr-4">
              <Droplets size={24} className="text-error-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Water</p>
              <h3 className="text-2xl font-bold text-gray-800">1.5L</h3>
              <p className="text-sm text-error-600">-1L from goal</p>
            </div>
          </Card>
        </div>

        {/* Calorie Chart */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Calorie Intake</h2>
            <div className="flex space-x-2">
              <Button
                variant={selectedPeriod === 'day' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('day')}
              >
                Day
              </Button>
              <Button
                variant={selectedPeriod === 'week' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('week')}
              >
                Week
              </Button>
              <Button
                variant={selectedPeriod === 'month' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('month')}
              >
                Month
              </Button>
            </div>
          </div>
          <div className="h-80">
            <Line data={chartData} options={chartOptions} />
          </div>
        </Card>

        {/* Macros and Meal Log */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Macronutrient Goals</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Protein</span>
                  <span className="text-sm font-medium text-gray-800">85g / 110g</span>
                </div>
                <ProgressBar progress={77} variant="primary" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Carbs</span>
                  <span className="text-sm font-medium text-gray-800">220g / 250g</span>
                </div>
                <ProgressBar progress={88} variant="success" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Fat</span>
                  <span className="text-sm font-medium text-gray-800">55g / 65g</span>
                </div>
                <ProgressBar progress={85} variant="warning" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Water</span>
                  <span className="text-sm font-medium text-gray-800">1.5L / 2.5L</span>
                </div>
                <ProgressBar progress={60} variant="error" />
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold mb-4">Today's Meals</h2>
            <div className="space-y-4">
              <div className="p-4 bg-primary-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">Breakfast</h3>
                    <p className="text-sm text-gray-600">Oatmeal with berries and nuts</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-primary-600">450 cal</span>
                    <p className="text-xs text-gray-500">8:30 AM</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-success-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">Lunch</h3>
                    <p className="text-sm text-gray-600">Grilled chicken salad</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-success-600">550 cal</span>
                    <p className="text-xs text-gray-500">12:45 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-warning-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">Snack</h3>
                    <p className="text-sm text-gray-600">Greek yogurt with honey</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-warning-600">200 cal</span>
                    <p className="text-xs text-gray-500">3:15 PM</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-error-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">Dinner</h3>
                    <p className="text-sm text-gray-600">Salmon with quinoa</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-error-600">650 cal</span>
                    <p className="text-xs text-gray-500">7:00 PM</p>
                  </div>
                </div>
              </div>

              <Button variant="outline" fullWidth icon={<Plus size={16} />}>
                Add Meal
              </Button>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default NutritionPage;