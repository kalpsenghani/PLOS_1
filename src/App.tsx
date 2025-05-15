import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/store';
import { AuthProvider } from './components/auth/AuthProvider';
import Layout from './components/layout/Layout';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import HealthPage from './pages/HealthPage';
import MentalHealthPage from './pages/MentalHealthPage';
import NutritionPage from './pages/NutritionPage';
import FamilyPage from './pages/FamilyPage';
import GoalsPage from './pages/GoalsPage';
import JournalPage from './pages/JournalPage';
import { useAuthContext } from './components/auth/AuthProvider';
import { initializeAuth } from './redux/slices/authSlice';
import { AppDispatch } from './redux/store';

const AppContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/health" element={<HealthPage />} />
        <Route path="/mental-health" element={<MentalHealthPage />} />
        <Route path="/nutrition" element={<NutritionPage />} />
        <Route path="/family" element={<FamilyPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/*" element={<AppContent />} />
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;