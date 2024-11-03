import type { CSSProperties } from 'react'
import type { CodeTheme } from './code'
import { CODE_THEMES } from './code'

interface ThemeStyles extends CSSProperties {
  backgroundColor: string
  color: string
  linkColor: string
  codeBackground: string
  fontFamily: string
}

export const MARKDOWN_THEMES: Record<string, ThemeStyles> = {
  light: {
    backgroundColor: '#ffffff',
    color: '#24292e',
    linkColor: '#0366d6',
    codeBackground: '#f6f8fa',
    fontFamily: "'Microsoft YaHei', SimSun, sans-serif",
  },
  dark: {
    backgroundColor: '#0d1117',
    color: '#c9d1d9',
    linkColor: '#58a6ff',
    codeBackground: '#161b22',
    fontFamily: "'Microsoft YaHei', SimSun, sans-serif",
  },
}

export { CODE_THEMES }
export type { CodeTheme }
export type MarkdownTheme = keyof typeof MARKDOWN_THEMES