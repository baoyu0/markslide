'use client';

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface HtmlPreviewState {
  theme: 'light' | 'dark'
  layout: 'default' | 'wide' | 'full'
  zoom: number
  setTheme: (theme: 'light' | 'dark') => void
  setLayout: (layout: 'default' | 'wide' | 'full') => void
  setZoom: (zoom: number) => void
}

export const useHtmlPreviewStore = create<HtmlPreviewState>()(
  persist(
    (set) => ({
      theme: 'light',
      layout: 'default',
      zoom: 1,
      setTheme: (theme) => set({ theme }),
      setLayout: (layout) => set({ layout }),
      setZoom: (zoom) => set({ zoom }),
    }),
    {
      name: 'html-preview-storage',
    }
  )
) 