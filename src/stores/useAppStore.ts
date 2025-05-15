import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Notification[];
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSidebar: () => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        theme: 'light',
        sidebarOpen: true,
        notifications: [],
        setTheme: (theme) => set({ theme }),
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        addNotification: (notification) =>
          set((state) => ({
            notifications: [...state.notifications, notification],
          })),
        removeNotification: (id) =>
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          })),
      }),
      {
        name: 'app-storage',
      }
    )
  )
);

export default useAppStore;