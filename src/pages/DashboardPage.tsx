import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Plus, Target } from 'lucide-react';

import { RootState, AppDispatch } from '../redux/store';
import { getHealthData } from '../redux/slices/healthSlice';
import { getMoodEntries, addMoodEntry } from '../redux/slices/mentalHealthSlice';
import { getGoals } from '../redux/slices/goalsSlice';
import { getJournalEntries } from '../redux/slices/journalSlice';

import Card from '../components/common/Card';
import Button from '../components/common/Button';
import GreetingCard from '../components/dashboard/GreetingCard';
import HealthSummaryCard from '../components/dashboard/HealthSummaryCard';
import MoodCard from '../components/dashboard/MoodCard';
import GoalCard from '../components/goals/GoalCard';
import JournalEntryCard from '../components/journal/JournalEntryCard';
import GoalForm from '../components/goals/GoalForm';

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { todayData, weeklyAverage } = useSelector((state: RootState) => state.health);
  const { todayEntry } = useSelector((state: RootState) => state.mentalHealth);
  const { goals } = useSelector((state: RootState) => state.goals);
  const { entries } = useSelector((state: RootState) => state.journal);
  
  const [quote, setQuote] = useState('The only way to do great work is to love what you do.');
  const [isGoalFormOpen, setIsGoalFormOpen] = useState(false);
  
  useEffect(() => {
    // Fetch all data
    dispatch(getHealthData());
    dispatch(getMoodEntries());
    dispatch(getGoals());
    dispatch(getJournalEntries());
    
    // Fetch a random quote (mock)
    const quotes = [
      'The only way to do great work is to love what you do.',
      'It always seems impossible until it\'s done.',
      'The future depends on what you do today.',
      'The best way to predict the future is to create it.',
      'You are never too old to set another goal or to dream a new dream.',
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [dispatch]);
  
  const handleMoodSelection = (mood: string) => {
    const today = new Date().toISOString().split('T')[0];
    dispatch(addMoodEntry({
      date: today,
      mood: mood as any,
      notes: '',
    }));
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <GreetingCard name={user?.user_metadata?.name || 'Friend'} quote={quote} />
          </div>
          <div>
            <MoodCard
              currentMood={todayEntry?.mood}
              onSelectMood={handleMoodSelection}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <HealthSummaryCard
              steps={todayData?.steps || 0}
              sleep={todayData?.sleep || 0}
              streak={7} // Mock data
            />
          </div>
          <div className="md:col-span-2">
            <Card title="Upcoming Goals">
              {goals.length > 0 ? (
                <div className="space-y-4">
                  {goals.slice(0, 2).map(goal => (
                    <div key={goal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{goal.title}</div>
                        <div className="text-sm text-gray-500">{goal.progress}% complete</div>
                      </div>
                      <div className="flex items-center">
                        <Target size={16} className="mr-1 text-primary-500" />
                        <span className="text-xs">
                          {new Date(goal.targetDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    icon={<Plus size={16} />}
                    onClick={() => setIsGoalFormOpen(true)}
                  >
                    Add New Goal
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 mb-3">No goals yet. Start by creating your first goal!</p>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<Plus size={16} />}
                    onClick={() => setIsGoalFormOpen(true)}
                  >
                    Create Goal
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card title="Recent Journal Entries">
            {entries.length > 0 ? (
              <div className="space-y-3">
                {entries.slice(0, 3).map(entry => (
                  <div key={entry.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-10 w-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center">
                        <BookOpen size={16} />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">{entry.content.split('\n')[0]}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  icon={<Plus size={16} />}
                >
                  Write New Entry
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 mb-3">Start journaling your thoughts!</p>
                <Button
                  variant="primary"
                  size="sm"
                  icon={<Plus size={16} />}
                >
                  Write First Entry
                </Button>
              </div>
            )}
          </Card>
          
          <Card title="Activity Calendar">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-center text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 28 }).map((_, i) => {
                // Randomly decide if day has activity
                const intensity = Math.floor(Math.random() * 5);
                let bgColor = 'bg-gray-100';
                
                if (intensity === 1) bgColor = 'bg-primary-100';
                if (intensity === 2) bgColor = 'bg-primary-200';
                if (intensity === 3) bgColor = 'bg-primary-300';
                if (intensity === 4) bgColor = 'bg-primary-400';
                
                return (
                  <div
                    key={i}
                    className={`h-8 rounded-sm ${bgColor} hover:ring-2 hover:ring-primary-500 transition-all`}
                  />
                );
              })}
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="flex space-x-2 items-center">
                <span className="block w-3 h-3 bg-gray-100 rounded-sm"></span>
                <span className="block w-3 h-3 bg-primary-100 rounded-sm"></span>
                <span className="block w-3 h-3 bg-primary-200 rounded-sm"></span>
                <span className="block w-3 h-3 bg-primary-300 rounded-sm"></span>
                <span className="block w-3 h-3 bg-primary-400 rounded-sm"></span>
              </div>
              
              <Button
                variant="text"
                size="sm"
                icon={<Calendar size={16} />}
              >
                View full calendar
              </Button>
            </div>
          </Card>
        </div>
      </motion.div>

      {isGoalFormOpen && (
        <GoalForm onClose={() => setIsGoalFormOpen(false)} />
      )}
    </div>
  );
};

export default DashboardPage;