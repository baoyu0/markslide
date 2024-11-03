import type { HtmlThemeConfig } from '../types'

export const HTML_THEMES: Record<string, HtmlThemeConfig> = {
  light: {
    name: '浅色主题',
    styles: {
      backgroundColor: '#ffffff',
      color: '#24292e',
      linkColor: '#0366d6',
      fontFamily: "'Microsoft YaHei', 'SimSun', sans-serif",
      fontSize: '16px',
      lineHeight: '1.6',
      headingColor: '#1a202c',
      borderColor: '#e2e8f0',
      codeBackground: '#f6f8fa',
    }
  },
  dark: {
    name: '深色主题',
    styles: {
      backgroundColor: '#1a202c',
      color: '#e2e8f0',
      linkColor: '#63b3ed',
      fontFamily: "'Microsoft YaHei', 'SimSun', sans-serif",
      fontSize: '16px',
      lineHeight: '1.6',
      headingColor: '#90cdf4',
      borderColor: '#2d3748',
      codeBackground: '#2d3748',
    }
  },
  paper: {
    name: '纸张主题',
    styles: {
      backgroundColor: '#f8f9fa',
      color: '#2d3748',
      linkColor: '#3182ce',
      fontFamily: "'Noto Serif SC', 'SimSun', serif",
      fontSize: '16px',
      lineHeight: '1.8',
      headingColor: '#1a365d',
      borderColor: '#e2e8f0',
      codeBackground: '#edf2f7',
    }
  }
} 