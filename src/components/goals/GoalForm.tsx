import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Target, X, Plus } from 'lucide-react';
import { addGoal } from '../../redux/slices/goalsSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { Task, Goal } from '../../types';
import Button from '../common/Button';
import Input from '../common/Input';

interface GoalFormProps {
  onClose: () => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [category, setCategory] = useState<'health' | 'career' | 'personal' | 'financial' | 'other'>('personal');
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log('Current user state:', user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted, user:', user);

    if (!user) {
      setError('You must be logged in to create a goal');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const goalData = {
      user_id: user.id,
      title,
      description,
      targetDate,
      category,
      tasks: tasks.map(task => ({ title: task, completed: false })),
    } as Omit<Goal, 'id' | 'progress' | 'status'> & { tasks: Omit<Task, 'id'>[] };

    console.log('Submitting goal data:', goalData);

    try {
      const result = await dispatch(addGoal(goalData)).unwrap();
      console.log('Goal added successfully:', result);
      onClose();
    } catch (error) {
      console.error('Failed to add goal:', error);
      setError(error instanceof Error ? error.message : 'Failed to add goal');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && taskInput.trim()) {
      e.preventDefault();
      if (!tasks.includes(taskInput.trim())) {
        setTasks([...tasks, taskInput.trim()]);
      }
      setTaskInput('');
    }
  };

  const removeTask = (taskToRemove: string) => {
    setTasks(tasks.filter(task => task !== taskToRemove));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Target size={24} className="text-primary-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">Create New Goal</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal Title
                </label>
                <Input
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your goal title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Describe your goal..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Date
                  </label>
                  <Input
                    name="targetDate"
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  >
                    <option value="health">Health</option>
                    <option value="career">Career</option>
                    <option value="personal">Personal</option>
                    <option value="financial">Financial</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tasks (press Enter to add)
                </label>
                <input
                  type="text"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  onKeyDown={handleAddTask}
                  placeholder="Add a task..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                {tasks.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {tasks.map((task) => (
                      <div
                        key={task}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm">{task}</span>
                        <button
                          type="button"
                          onClick={() => removeTask(task)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting || !title.trim() || !description.trim() || !targetDate}
              >
                {isSubmitting ? 'Creating...' : 'Create Goal'}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GoalForm; 