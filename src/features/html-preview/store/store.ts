'use client';

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { HtmlTheme } from '../types'

interface HtmlPreviewState {
  theme: HtmlTheme
  fontSize: string
  lineHeight: string
  setTheme: (theme: HtmlTheme) => void
  setFontSize: (size: string) => void
  setLineHeight: (height: string) => void
}

export const useHtmlPreviewStore = create<HtmlPreviewState>()(
  persist(
    (set) => ({
      theme: 'light',
      fontSize: '16px',
      lineHeight: '1.6',
      setTheme: (theme) => set({ theme }),
      setFontSize: (size) => set({ fontSize: size }),
      setLineHeight: (height) => set({ lineHeight: height }),
    }),
    {
      name: 'html-preview-storage',
    }
  )
) 