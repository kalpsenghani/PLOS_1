import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { JournalEntry } from '../../types';
import { supabase } from '../../lib/supabase';

interface JournalState {
  entries: JournalEntry[];
  selectedEntry: JournalEntry | null;
  isLoading: boolean;
  error: string | null;
}

// Get journal entries
export const getJournalEntries = createAsyncThunk('journal/getJournalEntries', async (_, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return data as JournalEntry[];
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch journal entries');
  }
});

// Add journal entry
export const addJournalEntry = createAsyncThunk(
  'journal/addJournalEntry',
  async (entry: Omit<JournalEntry, 'id'>, { rejectWithValue }) => {
    try {
      // First, ensure the user exists in the users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('id', entry.user_id)
        .single();

      if (userError) {
        console.error('User verification error:', userError);
        throw new Error('User not found');
      }

      // Then insert the journal entry
      const { data, error } = await supabase
        .from('journal_entries')
        .insert([{
          user_id: entry.user_id,
          date: entry.date,
          content: entry.content,
          tags: entry.tags,
          created_at: entry.created_at,
        }])
        .select()
        .single();

      if (error) {
        console.error('Journal entry insertion error:', error);
        throw error;
      }

      return data as JournalEntry;
    } catch (error) {
      console.error('Failed to add journal entry:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to add journal entry');
    }
  }
);

// Delete journal entry
export const deleteJournalEntry = createAsyncThunk(
  'journal/deleteJournalEntry',
  async (id: string, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete journal entry');
    }
  }
);

const initialState: JournalState = {
  entries: [],
  selectedEntry: null,
  isLoading: false,
  error: null,
};

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    selectEntry: (state, action: PayloadAction<string>) => {
      state.selectedEntry = state.entries.find(entry => entry.id === action.payload) || null;
    },
    clearSelectedEntry: (state) => {
      state.selectedEntry = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get entries
      .addCase(getJournalEntries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getJournalEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entries = action.payload;
      })
      .addCase(getJournalEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add entry
      .addCase(addJournalEntry.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addJournalEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entries.unshift(action.payload);
        state.selectedEntry = action.payload;
      })
      .addCase(addJournalEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete entry
      .addCase(deleteJournalEntry.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteJournalEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entries = state.entries.filter(entry => entry.id !== action.payload);
        if (state.selectedEntry && state.selectedEntry.id === action.payload) {
          state.selectedEntry = null;
        }
      })
      .addCase(deleteJournalEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { selectEntry, clearSelectedEntry } = journalSlice.actions;
export default journalSlice.reducer;