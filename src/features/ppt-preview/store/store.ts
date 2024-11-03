'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PPTThemeName, Transition } from '../themes';

interface PptPreviewState {
  theme: PPTThemeName;
  transition: Transition;
  fontSize: string;
  setTheme: (theme: PPTThemeName) => void;
  setTransition: (transition: Transition) => void;
  setFontSize: (size: string) => void;
}

export const usePptPreviewStore = create<PptPreviewState>()(
  persist(
    (set) => ({
      theme: 'modern',
      transition: 'slide',
      fontSize: '16px',
      setTheme: (theme) => set({ theme }),
      setTransition: (transition) => set({ transition }),
      setFontSize: (size) => set({ fontSize: size }),
    }),
    {
      name: 'ppt-preview-storage',
    }
  )
); 