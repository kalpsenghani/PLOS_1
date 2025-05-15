import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { HealthData } from '../../types';

// Mock health data
const mockHealthData: HealthData[] = [
  {
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    steps: 7245,
    heartRate: 68,
    sleep: 7.5,
    calories: 2100,
  },
  {
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    steps: 6892,
    heartRate: 71,
    sleep: 6.2,
    calories: 2250,
  },
  {
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    steps: 9126,
    heartRate: 69,
    sleep: 8.1,
    calories: 1950,
  },
  {
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    steps: 8457,
    heartRate: 70,
    sleep: 7.8,
    calories: 2050,
  },
  {
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    steps: 10234,
    heartRate: 67,
    sleep: 8.5,
    calories: 2150,
  },
  {
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    steps: 7854,
    heartRate: 72,
    sleep: 6.9,
    calories: 2200,
  },
  {
    date: new Date().toISOString().split('T')[0],
    steps: 5489,
    heartRate: 68,
    sleep: 7.2,
    calories: 1850,
  },
];

interface HealthState {
  data: HealthData[];
  todayData: HealthData | null;
  weeklyAverage: {
    steps: number;
    sleep: number;
    heartRate: number;
  };
  isLoading: boolean;
  error: string | null;
}

// Mock API function
const fetchHealthData = async (): Promise<HealthData[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockHealthData;
};

// Async thunk
export const getHealthData = createAsyncThunk('health/getHealthData', async (_, { rejectWithValue }) => {
  try {
    return await fetchHealthData();
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch health data');
  }
});

// Calculate weekly averages
const calculateWeeklyAverage = (data: HealthData[]) => {
  if (!data.length) return { steps: 0, sleep: 0, heartRate: 0 };
  
  const total = data.reduce(
    (acc, day) => {
      acc.steps += day.steps;
      acc.sleep += day.sleep;
      acc.heartRate += day.heartRate;
      return acc;
    },
    { steps: 0, sleep: 0, heartRate: 0 }
  );
  
  return {
    steps: Math.round(total.steps / data.length),
    sleep: +(total.sleep / data.length).toFixed(1),
    heartRate: Math.round(total.heartRate / data.length),
  };
};

const initialState: HealthState = {
  data: [],
  todayData: null,
  weeklyAverage: {
    steps: 0,
    sleep: 0,
    heartRate: 0,
  },
  isLoading: false,
  error: null,
};

const healthSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {
    updateHealthData: (state, action: PayloadAction<HealthData>) => {
      const today = new Date().toISOString().split('T')[0];
      const index = state.data.findIndex(item => item.date === today);
      
      if (index !== -1) {
        state.data[index] = action.payload;
      } else {
        state.data.push(action.payload);
      }
      
      state.todayData = action.payload;
      state.weeklyAverage = calculateWeeklyAverage(state.data.slice(-7));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHealthData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getHealthData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        const today = new Date().toISOString().split('T')[0];
        state.todayData = action.payload.find(item => item.date === today) || null;
        state.weeklyAverage = calculateWeeklyAverage(action.payload.slice(-7));
      })
      .addCase(getHealthData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateHealthData } = healthSlice.actions;
export default healthSlice.reducer;