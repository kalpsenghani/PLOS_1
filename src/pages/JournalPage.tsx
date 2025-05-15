import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Calendar, Tag, Search } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const JournalPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = ['personal', 'work', 'health', 'family', 'goals'];

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
          <h1 className="text-2xl font-bold text-gray-800">Journal</h1>
          <Button
            variant="primary"
            icon={<Plus size={18} />}
          >
            New Entry
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search journal entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {tags.map(tag => (
              <Button
                key={tag}
                variant={selectedTag === tag ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              >
                #{tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Journal Entries */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <BookOpen size={18} className="text-primary-600 mr-2" />
                <span className="text-sm text-gray-500">Today</span>
              </div>
              <div className="flex space-x-1">
                <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded-full">
                  #personal
                </span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">Morning Reflections</h3>
            <p className="text-sm text-gray-600 line-clamp-3">
              Started the day with a peaceful meditation session. Feeling centered and ready to tackle the day's challenges...
            </p>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <BookOpen size={18} className="text-primary-600 mr-2" />
                <span className="text-sm text-gray-500">Yesterday</span>
              </div>
              <div className="flex space-x-1">
                <span className="text-xs bg-success-100 text-success-600 px-2 py-1 rounded-full">
                  #goals
                </span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">Goal Progress Check</h3>
            <p className="text-sm text-gray-600 line-clamp-3">
              Reviewed my quarterly goals today. Making good progress on the fitness goals but need to focus more on...
            </p>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <BookOpen size={18} className="text-primary-600 mr-2" />
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <div className="flex space-x-1">
                <span className="text-xs bg-warning-100 text-warning-600 px-2 py-1 rounded-full">
                  #family
                </span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">Family Weekend</h3>
            <p className="text-sm text-gray-600 line-clamp-3">
              Had a wonderful weekend with the family. We went hiking and had a picnic in the park...
            </p>
          </Card>
        </div>

        {/* AI Writing Assistant */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Today's Prompts</h2>
            <div className="space-y-4">
              <div className="p-4 bg-primary-50 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Reflection</h3>
                <p className="text-sm text-gray-600">
                  What's one thing that made you smile today? How did it impact your mood?
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Write about this
                </Button>
              </div>
              
              <div className="p-4 bg-success-50 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Gratitude</h3>
                <p className="text-sm text-gray-600">
                  List three things you're grateful for today and why they matter to you.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Write about this
                </Button>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold mb-4">Journal Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-primary-600">15</h3>
                <p className="text-sm text-gray-600">Entries this month</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-success-600">5</h3>
                <p className="text-sm text-gray-600">Day streak</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-warning-600">8</h3>
                <p className="text-sm text-gray-600">Tags used</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-error-600">75%</h3>
                <p className="text-sm text-gray-600">Positive entries</p>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default JournalPage;