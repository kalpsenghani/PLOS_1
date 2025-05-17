import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabase';

interface DashboardState {
  quote: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  quote: '',
  isLoading: false,
  error: null,
};

// Fetch daily quote
export const fetchDailyQuote = createAsyncThunk(
  'dashboard/fetchDailyQuote',
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('ai_logs')
        .select('response')
        .eq('type', 'quote')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      return data.response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch quote');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyQuote.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDailyQuote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quote = action.payload;
      })
      .addCase(fetchDailyQuote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer; 