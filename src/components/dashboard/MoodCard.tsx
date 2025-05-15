import React from 'react';
import { Smile, Frown, Meh } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../common/Card';

interface MoodCardProps {
  currentMood?: string;
  onSelectMood: (mood: string) => void;
}

const moods = [
  { value: 'great', label: 'Great', emoji: '😁', color: 'bg-success-100 text-success-700' },
  { value: 'good', label: 'Good', emoji: '🙂', color: 'bg-primary-100 text-primary-700' },
  { value: 'neutral', label: 'Okay', emoji: '😐', color: 'bg-gray-100 text-gray-700' },
  { value: 'bad', label: 'Bad', emoji: '😞', color: 'bg-warning-100 text-warning-700' },
  { value: 'terrible', label: 'Awful', emoji: '😣', color: 'bg-error-100 text-error-700' },
];

const MoodCard: React.FC<MoodCardProps> = ({ currentMood, onSelectMood }) => {
  const getMoodIcon = () => {
    if (!currentMood) return <Meh className="text-gray-400" />;
    
    switch (currentMood) {
      case 'great':
      case 'good':
        return <Smile className="text-success-500" />;
      case 'neutral':
        return <Meh className="text-gray-500" />;
      case 'bad':
      case 'terrible':
        return <Frown className="text-warning-500" />;
      default:
        return <Meh className="text-gray-400" />;
    }
  };

  const selectedMood = moods.find(mood => mood.value === currentMood);

  return (
    <Card title="Today's Mood">
      <div className="space-y-4">
        {currentMood ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`flex items-center justify-center p-4 rounded-lg ${selectedMood?.color}`}
          >
            <span className="text-3xl mr-2">{selectedMood?.emoji}</span>
            <span className="font-medium">Feeling {selectedMood?.label}</span>
          </motion.div>
        ) : (
          <div className="text-center py-2 text-gray-500">
            <p>How are you feeling today?</p>
          </div>
        )}
        
        <div className="grid grid-cols-5 gap-2">
          {moods.map((mood) => (
            <motion.button
              key={mood.value}
              className={`flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors
                ${currentMood === mood.value ? 'ring-2 ring-primary-500 bg-primary-50' : ''}`}
              onClick={() => onSelectMood(mood.value)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl mb-1">{mood.emoji}</span>
              <span className="text-xs">{mood.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MoodCard;