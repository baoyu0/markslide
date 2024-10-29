import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const getInitialMode = (): ThemeMode => {
  if (typeof window === "undefined") return "light";

  try {
    const savedMode = localStorage.getItem("theme-mode") as ThemeMode;
    if (savedMode) return savedMode;

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "system";
    }
  } catch {
    // 如果无法访问 localStorage，返回默认值
  }

  return "light";
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: getInitialMode(),
      setMode: (mode) => set({ mode }),
    }),
    {
      name: "theme-storage",
      skipHydration: true,
      partialize: (state) => ({ mode: state.mode }),
    },
  ),
);
