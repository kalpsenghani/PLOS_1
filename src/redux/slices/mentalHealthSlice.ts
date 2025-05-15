import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MoodEntry } from '../../types';

// Mock data
const mockMoodEntries: MoodEntry[] = [
  {
    id: '1',
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    mood: 'good',
    notes: 'Had a productive day at work.',
  },
  {
    id: '2',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    mood: 'great',
    notes: 'Went for a run and felt energized all day.',
  },
  {
    id: '3',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    mood: 'neutral',
    notes: 'Average day, nothing special.',
  },
  {
    id: '4',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    mood: 'bad',
    notes: 'Felt stressed about upcoming deadlines.',
  },
  {
    id: '5',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    mood: 'good',
    notes: 'Had a nice dinner with friends.',
  },
  {
    id: '6',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    mood: 'neutral',
    notes: 'Busy day but managed everything well.',
  },
];

interface MentalHealthState {
  entries: MoodEntry[];
  todayEntry: MoodEntry | null;
  weeklyMoodSummary: Record<string, number>;
  isLoading: boolean;
  error: string | null;
}

// Mock API function
const fetchMoodEntries = async (): Promise<MoodEntry[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockMoodEntries;
};

// Async thunk
export const getMoodEntries = createAsyncThunk('mentalHealth/getMoodEntries', async (_, { rejectWithValue }) => {
  try {
    return await fetchMoodEntries();
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch mood entries');
  }
});

export const addMoodEntry = createAsyncThunk(
  'mentalHealth/addMoodEntry',
  async (entry: Omit<MoodEntry, 'id'>, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newEntry: MoodEntry = {
        ...entry,
        id: Date.now().toString(),
      };
      return newEntry;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to add mood entry');
    }
  }
);

// Calculate weekly mood summary
const calculateMoodSummary = (entries: MoodEntry[]): Record<string, number> => {
  const summary: Record<string, number> = {
    great: 0,
    good: 0,
    neutral: 0,
    bad: 0,
    terrible: 0,
  };
  
  entries.forEach(entry => {
    summary[entry.mood]++;
  });
  
  return summary;
};

const initialState: MentalHealthState = {
  entries: [],
  todayEntry: null,
  weeklyMoodSummary: {
    great: 0,
    good: 0,
    neutral: 0,
    bad: 0,
    terrible: 0,
  },
  isLoading: false,
  error: null,
};

const mentalHealthSlice = createSlice({
  name: 'mentalHealth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get entries
      .addCase(getMoodEntries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMoodEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entries = action.payload;
        const today = new Date().toISOString().split('T')[0];
        state.todayEntry = action.payload.find(entry => entry.date === today) || null;
        state.weeklyMoodSummary = calculateMoodSummary(action.payload);
      })
      .addCase(getMoodEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add entry
      .addCase(addMoodEntry.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addMoodEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        
        // Check if there's already an entry for today
        const today = new Date().toISOString().split('T')[0];
        const existingIndex = state.entries.findIndex(entry => entry.date === today);
        
        if (existingIndex !== -1) {
          // Replace existing entry
          state.entries[existingIndex] = action.payload;
        } else {
          // Add new entry
          state.entries.push(action.payload);
        }
        
        state.todayEntry = action.payload;
        state.weeklyMoodSummary = calculateMoodSummary(state.entries);
      })
      .addCase(addMoodEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default mentalHealthSlice.reducer;