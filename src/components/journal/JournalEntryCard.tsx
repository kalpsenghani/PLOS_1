import React from 'react';
import { BookOpen, Calendar, Tag } from 'lucide-react';
import Card from '../common/Card';
import { JournalEntry } from '../../types';

interface JournalEntryCardProps {
  entry: JournalEntry;
  onClick: () => void;
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = ({ entry, onClick }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Truncate content
  const truncateContent = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };
  
  return (
    <Card className="h-full cursor-pointer hover:shadow-md transition-shadow" onClick={onClick} hoverEffect>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">{entry.title}</h3>
        <div className="flex items-center text-gray-500">
          <Calendar size={14} className="mr-1" />
          <span className="text-xs">{formatDate(entry.date)}</span>
        </div>
      </div>
      
      <div className="text-sm text-gray-600 mb-4">
        {truncateContent(entry.content)}
      </div>
      
      <div className="flex justify-between items-center">
        {entry.mood && (
          <div className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs">
            {entry.mood}
          </div>
        )}
        
        {entry.tags && entry.tags.length > 0 && (
          <div className="flex items-center space-x-1">
            <Tag size={12} className="text-gray-400" />
            <div className="flex space-x-1">
              {entry.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="text-xs text-gray-500">
                  #{tag}
                </span>
              ))}
              {entry.tags.length > 2 && (
                <span className="text-xs text-gray-400">+{entry.tags.length - 2}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default JournalEntryCard;