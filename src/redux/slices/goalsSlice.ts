import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Goal, Task } from '../../types';
import { supabase } from '../../lib/supabase';

// Mock data
const mockGoals: Goal[] = [
  {
    id: '1',
    user_id: 'mock-user-1',
    title: 'Run a half marathon',
    description: 'Train for and complete a half marathon in under 2 hours',
    targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    progress: 45,
    category: 'health',
    status: 'in-progress',
    tasks: [
      { id: '1-1', title: 'Run 5km 3x per week', completed: true },
      { id: '1-2', title: 'Complete 10km race', completed: true },
      { id: '1-3', title: 'Run 15km without stopping', completed: false },
      { id: '1-4', title: 'Register for half marathon', completed: true },
    ],
  },
  {
    id: '2',
    user_id: 'mock-user-1',
    title: 'Learn Spanish',
    description: 'Become conversational in Spanish',
    targetDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    progress: 20,
    category: 'personal',
    status: 'in-progress',
    tasks: [
      { id: '2-1', title: 'Complete Duolingo basics', completed: true },
      { id: '2-2', title: 'Learn 500 common words', completed: false },
      { id: '2-3', title: 'Practice with a native speaker', completed: false },
      { id: '2-4', title: 'Watch a movie in Spanish', completed: false },
    ],
  },
  {
    id: '3',
    user_id: 'mock-user-1',
    title: 'Save for vacation',
    description: 'Save $3000 for summer trip to Europe',
    targetDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    progress: 65,
    category: 'financial',
    status: 'in-progress',
    tasks: [
      { id: '3-1', title: 'Create budget plan', completed: true },
      { id: '3-2', title: 'Save $500 per month', completed: true },
      { id: '3-3', title: 'Research affordable accommodations', completed: true },
      { id: '3-4', title: 'Book flights in advance', completed: false },
    ],
  },
];

interface GoalsState {
  goals: Goal[];
  selectedGoal: Goal | null;
  isLoading: boolean;
  error: string | null;
}

// Get goals
export const getGoals = createAsyncThunk('goals/getGoals', async (_, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase
      .from('goals')
      .select('*, tasks(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Goal[];
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch goals');
  }
});

// Add goal
export const addGoal = createAsyncThunk(
  'goals/addGoal',
  async (goal: Omit<Goal, 'id' | 'progress' | 'status'> & { tasks: Omit<Task, 'id'>[] }, { rejectWithValue }) => {
    try {
      // Insert the goal
      const { data: goalData, error: goalError } = await supabase
        .from('goals')
        .insert([{
          user_id: goal.user_id,
          title: goal.title,
          description: goal.description,
          type: goal.category,
          deadline: goal.targetDate,
          status: 'not_started',
        }])
        .select()
        .single();

      if (goalError) {
        console.error('Goal insertion error:', goalError);
        throw goalError;
      }

      // Insert tasks if any
      if (goal.tasks && goal.tasks.length > 0) {
        const tasksToInsert = goal.tasks.map(task => ({
          goal_id: goalData.id,
          title: task.title,
          completed: false,
        }));

        const { error: tasksError } = await supabase
          .from('tasks')
          .insert(tasksToInsert);

        if (tasksError) {
          console.error('Tasks insertion error:', tasksError);
          throw tasksError;
        }
      }

      // Fetch the complete goal with tasks
      const { data: completeGoal, error: fetchError } = await supabase
        .from('goals')
        .select('*, tasks(*)')
        .eq('id', goalData.id)
        .single();

      if (fetchError) {
        console.error('Goal fetch error:', fetchError);
        throw fetchError;
      }

      // Transform the database response to match our Goal type
      const transformedGoal: Goal = {
        id: completeGoal.id,
        user_id: completeGoal.user_id,
        title: completeGoal.title,
        description: completeGoal.description || '',
        targetDate: completeGoal.deadline,
        progress: 0,
        category: completeGoal.type as Goal['category'],
        status: completeGoal.status as Goal['status'],
        tasks: completeGoal.tasks || [],
      };

      return transformedGoal;
    } catch (error) {
      console.error('Failed to add goal:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to add goal');
    }
  }
);

// Delete goal
export const deleteGoal = createAsyncThunk(
  'goals/deleteGoal',
  async (id: string, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete goal');
    }
  }
);

// Add task to goal
export const addTaskToGoal = createAsyncThunk(
  'goals/addTaskToGoal',
  async ({ goalId, title }: { goalId: string; title: string }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          goal_id: goalId,
          title,
          completed: false,
        }])
        .select()
        .single();

      if (error) throw error;
      return { goalId, task: data as Task };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to add task');
    }
  }
);

// Toggle task completion
export const toggleTaskCompletion = createAsyncThunk(
  'goals/toggleTaskCompletion',
  async ({ goalId, taskId }: { goalId: string; taskId: string }, { rejectWithValue }) => {
    try {
      // Get current task state
      const { data: task, error: fetchError } = await supabase
        .from('tasks')
        .select('completed')
        .eq('id', taskId)
        .single();

      if (fetchError) throw fetchError;

      // Update task
      const { error: updateError } = await supabase
        .from('tasks')
        .update({ completed: !task.completed })
        .eq('id', taskId);

      if (updateError) throw updateError;

      return { goalId, taskId };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to toggle task');
    }
  }
);

const initialState: GoalsState = {
  goals: [],
  selectedGoal: null,
  isLoading: false,
  error: null,
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    selectGoal: (state, action: PayloadAction<string>) => {
      state.selectedGoal = state.goals.find(goal => goal.id === action.payload) || null;
    },
    clearSelectedGoal: (state) => {
      state.selectedGoal = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get goals
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add goal
      .addCase(addGoal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goals.unshift(action.payload);
        state.selectedGoal = action.payload;
      })
      .addCase(addGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete goal
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goals = state.goals.filter(goal => goal.id !== action.payload);
        if (state.selectedGoal && state.selectedGoal.id === action.payload) {
          state.selectedGoal = null;
        }
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add task to goal
      .addCase(addTaskToGoal.fulfilled, (state, action) => {
        const { goalId, task } = action.payload;
        const goal = state.goals.find(g => g.id === goalId);
        if (goal) {
          goal.tasks.push(task);
          if (state.selectedGoal && state.selectedGoal.id === goalId) {
            state.selectedGoal = { ...goal };
          }
        }
      })
      // Toggle task completion
      .addCase(toggleTaskCompletion.fulfilled, (state, action) => {
        const { goalId, taskId } = action.payload;
        const goal = state.goals.find(g => g.id === goalId);
        if (goal) {
          const task = goal.tasks.find(t => t.id === taskId);
          if (task) {
            task.completed = !task.completed;
            if (state.selectedGoal && state.selectedGoal.id === goalId) {
              state.selectedGoal = { ...goal };
            }
          }
        }
      });
  },
});

export const { selectGoal, clearSelectedGoal } = goalsSlice.actions;
export default goalsSlice.reducer;