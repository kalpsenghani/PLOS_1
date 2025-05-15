import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import healthReducer from './slices/healthSlice';
import mentalHealthReducer from './slices/mentalHealthSlice';
import journalReducer from './slices/journalSlice';
import goalsReducer from './slices/goalsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    health: healthReducer,
    mentalHealth: mentalHealthReducer,
    journal: journalReducer,
    goals: goalsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;