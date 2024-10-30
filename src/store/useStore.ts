import { create } from "zustand";

interface AppState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const useStore = create<AppState>()((set, get) => ({
  darkMode: false,
  toggleDarkMode: () => set({ darkMode: !get().darkMode }),
}));
