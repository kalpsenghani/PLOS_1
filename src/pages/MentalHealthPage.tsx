import React from 'react';

const MentalHealthPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Mental Health</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder content - actual content would be implemented based on requirements */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Mood Tracker</h2>
          <p className="text-gray-600">Track your daily mood and emotional well-being</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Stress Management</h2>
          <p className="text-gray-600">Tools and techniques for managing stress</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Mental Health Resources</h2>
          <p className="text-gray-600">Access helpful resources and support</p>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthPage;