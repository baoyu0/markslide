import { ThemeConfig } from '../types'

export const themes: Record<string, ThemeConfig> = {
  default: {
    name: '默认主题',
    styles: {
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#24292e',
      backgroundColor: '#ffffff',
      codeBackground: '#f6f8fa',
      linkColor: '#0366d6',
      blockquoteBorderColor: '#dfe2e5',
      blockquoteColor: '#6a737d',
    }
  },
  dark: {
    name: '暗色主题',
    styles: {
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#c9d1d9',
      backgroundColor: '#0d1117',
      codeBackground: '#161b22',
      linkColor: '#58a6ff',
      blockquoteBorderColor: '#30363d',
      blockquoteColor: '#8b949e',
    }
  },
  // 可以添加更多主题...
}

export type ThemeName = keyof typeof themes