'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PptPreviewState {
  theme: string;
  transition: string;
  setTheme: (theme: string) => void;
  setTransition: (transition: string) => void;
}

export const usePptPreviewStore = create<PptPreviewState>()(
  persist(
    (set) => ({
      theme: 'black',
      transition: 'slide',
      setTheme: (theme) => set({ theme }),
      setTransition: (transition) => set({ transition }),
    }),
    {
      name: 'ppt-preview-storage',
    }
  )
); 