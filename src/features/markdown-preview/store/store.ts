'use client';

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MarkdownTheme, CodeTheme } from '../types'

interface MarkdownPreviewState {
  theme: MarkdownTheme
  codeTheme: CodeTheme
  fontSize: string
  lineHeight: string
  setTheme: (theme: MarkdownTheme) => void
  setCodeTheme: (theme: CodeTheme) => void
  setFontSize: (size: string) => void
  setLineHeight: (height: string) => void
}

export const useMarkdownPreviewStore = create<MarkdownPreviewState>()(
  persist(
    (set) => ({
      theme: 'light',
      codeTheme: 'light',
      fontSize: '16px',
      lineHeight: '1.6',
      setTheme: (theme) => set({ theme }),
      setCodeTheme: (theme) => set({ codeTheme }),
      setFontSize: (size) => set({ fontSize: size }),
      setLineHeight: (height) => set({ lineHeight: height }),
    }),
    {
      name: 'markdown-preview-storage',
    }
  )
) 