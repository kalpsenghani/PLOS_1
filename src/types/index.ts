// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  aiSuggestions: boolean;
}

// Auth types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Health types
export interface HealthData {
  date: string;
  steps: number;
  heartRate: number;
  sleep: number;
  calories: number;
}

// Mental health types
export interface MoodEntry {
  id: string;
  date: string;
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
  notes: string;
}

// Journal types
export interface JournalEntry {
  id: string;
  user_id: string;
  date: string;
  content: string;
  ai_summary?: string;
  tags?: string[];
  created_at: string;
  updated_at?: string;
}

// Goal types
export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  category: 'health' | 'career' | 'personal' | 'financial' | 'other';
  status: 'not-started' | 'in-progress' | 'completed';
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

// Dashboard types
export interface DashboardSummary {
  greeting: string;
  quote: string;
  healthSummary: {
    steps: number;
    sleep: number;
    streak: number;
  };
  moodToday?: string;
  upcomingGoals: {
    count: number;
    nextDue: string;
  };
  journalStreak: number;
}