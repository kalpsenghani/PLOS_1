import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Moon, TrendingUp, Upload } from 'lucide-react';
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

const HealthPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('week');
  
  // Mock data for charts
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Steps',
        data: [6500, 5200, 8900, 7400, 9200, 8100, 7800],
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
          <h1 className="text-2xl font-bold text-gray-800">Physical Health</h1>
          <Button
            variant="outline"
            icon={<Upload size={18} />}
          >
            Import Health Data
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="flex items-center p-6">
            <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
              <Activity size={24} className="text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Daily Steps</p>
              <h3 className="text-2xl font-bold text-gray-800">7,849</h3>
            </div>
          </Card>

          <Card className="flex items-center p-6">
            <div className="h-12 w-12 bg-success-100 rounded-full flex items-center justify-center mr-4">
              <Heart size={24} className="text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Heart Rate</p>
              <h3 className="text-2xl font-bold text-gray-800">72 bpm</h3>
            </div>
          </Card>

          <Card className="flex items-center p-6">
            <div className="h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center mr-4">
              <Moon size={24} className="text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sleep</p>
              <h3 className="text-2xl font-bold text-gray-800">7.2 hrs</h3>
            </div>
          </Card>

          <Card className="flex items-center p-6">
            <div className="h-12 w-12 bg-error-100 rounded-full flex items-center justify-center mr-4">
              <TrendingUp size={24} className="text-error-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Calories</p>
              <h3 className="text-2xl font-bold text-gray-800">2,456</h3>
            </div>
          </Card>
        </div>

        {/* Activity Chart */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Activity Overview</h2>
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

        {/* Goals Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Daily Goals</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Steps</span>
                  <span className="text-sm font-medium text-gray-800">7,849 / 10,000</span>
                </div>
                <ProgressBar progress={78} variant="primary" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Sleep</span>
                  <span className="text-sm font-medium text-gray-800">7.2 / 8 hrs</span>
                </div>
                <ProgressBar progress={90} variant="warning" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Calories</span>
                  <span className="text-sm font-medium text-gray-800">2,456 / 2,500</span>
                </div>
                <ProgressBar progress={98} variant="error" />
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold mb-4">AI Recommendations</h2>
            <div className="space-y-4">
              <div className="p-4 bg-primary-50 rounded-lg">
                <p className="text-primary-700">
                  You're 2,151 steps away from your daily goal. A 15-minute walk could help you reach it!
                </p>
              </div>
              <div className="p-4 bg-warning-50 rounded-lg">
                <p className="text-warning-700">
                  Your sleep pattern shows improvement. Keep maintaining a consistent bedtime routine.
                </p>
              </div>
              <div className="p-4 bg-success-50 rounded-lg">
                <p className="text-success-700">
                  Heart rate trends look healthy. Consider adding some cardio exercises to maintain it.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default HealthPage;