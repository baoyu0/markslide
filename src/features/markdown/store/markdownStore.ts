import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MarkdownState {
  theme: string;
  fontSize: string;
  lineHeight: string;
  setTheme: (theme: string) => void;
  setFontSize: (fontSize: string) => void;
  setLineHeight: (lineHeight: string) => void;
}

export const useMarkdownStore = create<MarkdownState>()(
  persist(
    (set) => ({
      theme: 'github',
      fontSize: '16px',
      lineHeight: '1.6',
      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      setLineHeight: (lineHeight) => set({ lineHeight }),
    }),
    {
      name: 'markdown-storage',
    }
  )
); 